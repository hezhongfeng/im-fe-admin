import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams, sort?: any) {
  const param = Object.assign(params, {
    pageNumber: params ? params.current : 1,
    sorter: sort,
  });
  delete param.current;
  const res = await request('/api/v1/admin/users', {
    params: param,
  });
  return {
    data: res.data.rows,
    total: res.data.count,
    success: true,
  };
}

export async function disabledGroup(params: any) {
  return request('/api/v1/admin/users/disabled', {
    method: 'PUT',
    data: {
      ...params,
      id: 2345,
    },
  });
}

export async function muteGroup(params: any) {
  return request('/api/v1/admin/users/mute', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
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
