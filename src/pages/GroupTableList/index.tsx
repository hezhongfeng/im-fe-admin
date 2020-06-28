import { Divider, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import { TableListItem } from './data';
import { queryGroups, disabledGroup, muteGroup } from './service';

/**
 *
 * 禁言群组
 * @param currentItem
 */
const editAndDelete = (key: string, status: boolean, record: any, actionRef: any) => {
  const title = key === 'disabled' ? '封禁状态' : '禁言状态';
  let content = key === 'disabled' ? '封禁' : '禁言';
  content = (status ? '' : '解除') + content;

  Modal.confirm({
    title,
    content: `确定${content}该群组吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const hide = message.loading('正在处理');
      try {
        if (key === 'disabled') {
          await disabledGroup({
            disabled: status,
            id: record.id,
          });
        } else {
          await muteGroup({
            mute: status,
            id: record.id,
          });
        }
        hide();
        message.success('成功，即将刷新');
        if (actionRef.current) {
          actionRef.current.reloadAndRest();
        }
        return true;
      } catch (error) {
        hide();
        message.error('失败，请重试');
        return false;
      }
    },
  });
};

const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '群组名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'introduction',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'disabled',
      hideInForm: true,
      filters: [],
      valueEnum: {
        false: { text: '未封禁', status: 'Success' },
        true: { text: '已封禁', status: 'Error' },
      },
    },
    {
      title: '禁言状态',
      dataIndex: 'mute',
      hideInForm: true,
      filters: [],
      valueEnum: {
        false: { text: '未禁言', status: 'Success', filter: undefined },
        true: { text: '已禁言', status: 'Error' },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const DisA: React.FC<{}> = () => {
          return record.disabled ? (
            <a
              onClick={() => {
                editAndDelete('disabled', false, record, actionRef);
              }}
            >
              解除封禁
            </a>
          ) : (
            <a
              onClick={() => {
                editAndDelete('disabled', true, record, actionRef);
              }}
            >
              封禁
            </a>
          );
        };

        const MuseA: React.FC<{}> = () => {
          return record.mute ? (
            <a
              onClick={() => {
                editAndDelete('mute', false, record, actionRef);
              }}
            >
              解除禁言
            </a>
          ) : (
            <a
              onClick={() => {
                editAndDelete('mute', true, record, actionRef);
              }}
            >
              禁言
            </a>
          );
        };

        return (
          <>
            <DisA />
            <Divider type="vertical" />
            <MuseA />
          </>
        );
      },
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="群组表格"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={(params, sort) => queryGroups(params, sort)}
        columns={columns}
        rowSelection={false}
        search={false}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
