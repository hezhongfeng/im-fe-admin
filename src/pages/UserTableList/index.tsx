import { Divider, message, Modal, Badge } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import { TableListItem } from './data';
import { queryUsers, disabledUser, muteUser } from './service';
import { queryRoles } from '../RoleTableList/service';
import style from './style.less';
import OperationModal from './components/OperationModal';

/**
 *
 * 禁言用户
 * @param currentItem
 */
const editAndDelete = (key: string, status: boolean, record: any, actionRef: any) => {
  const title = key === 'disabled' ? '封禁状态' : '禁言状态';
  let content = key === 'disabled' ? '封禁' : '禁言';
  content = (status ? '' : '解除') + content;

  Modal.confirm({
    title,
    content: `确定${content}该用户吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const hide = message.loading('正在处理');
      try {
        if (key === 'disabled') {
          await disabledUser({
            disabled: status,
            id: record.id,
          });
        } else {
          await muteUser({
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
  const [roles, setRoles] = useState<Array<any>>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<TableListItem> | undefined>(undefined);

  const editRole = async (record: TableListItem) => {
    const { data } = await queryRoles({
      current: 1,
      pageSize: 99,
    });
    setRoles(data);
    setCurrent(record);
    setVisible(true);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      rules: [
        {
          required: true,
          message: '用户名为必填项',
        },
      ],
    },
    {
      title: '昵称',
      renderText: (_, record) => {
        return record.userInfo.nickname;
      },
    },
    {
      title: '头像',
      render(_, record) {
        return (
          <div className={style.avator}>
            <img src={record.userInfo.photo} alt="" />
          </div>
        );
      },
    },
    {
      title: '来源',
      dataIndex: 'provider',
      hideInForm: true,
      filters: [],
      valueEnum: {
        local: { text: '注册' },
        github: { text: 'github' },
      },
    },
    {
      title: '状态',
      dataIndex: 'disabled',
      hideInForm: true,
      filters: [],
      render(_, record) {
        if (record.userStatus.disabled) {
          return (
            <span>
              <Badge status="error" />
              已封禁
            </span>
          );
        }
        return (
          <span>
            <Badge status="success" />
            未封禁
          </span>
        );
      },
    },
    {
      title: '禁言状态',
      dataIndex: 'mute',
      hideInForm: true,
      filters: [],
      render(_, record) {
        if (record.userStatus.mute) {
          return (
            <span>
              <Badge status="error" />
              已禁言
            </span>
          );
        }
        return (
          <span>
            <Badge status="success" />
            未禁言
          </span>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      width: 180,
      hideInForm: true,
    },
    {
      title: '角色',
      render(_, record) {
        const roleNames = record.roles.map((role: { name: string; id: string }) => (
          <div key={role.id}>{role.name}</div>
        ));
        return roleNames;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const DisA: React.FC<{}> = () => {
          return record.userStatus.disabled ? (
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
          return record.userStatus.mute ? (
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
            <Divider type="vertical" />
            <a
              onClick={() => {
                editRole(record);
              }}
            >
              配置角色
            </a>
          </>
        );
      },
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用户列表"
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
        request={(params, sort) => queryUsers(params, sort)}
        columns={columns}
        rowSelection={false}
        search={false}
      />
      <OperationModal
        onDone={() => {
          setVisible(false);
          if (actionRef.current) {
            actionRef.current.reloadAndRest();
          }
        }}
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        roles={roles}
        current={current}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
