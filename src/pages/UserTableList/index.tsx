import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import { TableListItem } from './data';
import { queryUsers } from './service';
import { queryRoles } from '../RoleTableList/service';
import style from './style.less';
import OperationModal from './components/OperationModal';

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
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      width: 180,
      hideInForm: true,
      hideInSearch: true,
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
        return (
          <a
            onClick={() => {
              editRole(record);
            }}
          >
            配置角色
          </a>
        );
      },
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
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
        request={(params, sort) => queryUsers(params, sort)}
        columns={columns}
        rowSelection={false}
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
