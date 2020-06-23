import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams) {
  console.log(params);
  const param = Object.assign(
    {
      pageNumber: params ? params.current : 1,
    },
    params,
  );
  delete param.current;
  const res = await request('/api/v1/admin/roles', {
    params: param,
  });
  return {
    data: res.data.rows,
    total: res.data.count,
    success: true,
  };
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
