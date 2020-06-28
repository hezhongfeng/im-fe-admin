import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryUsers(params?: TableListParams, sort?: any) {
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

export async function disabledUser(params: any) {
  return request('/api/v1/admin/users/disabled', {
    method: 'PUT',
    data: {
      ...params,
      id: 2345,
    },
  });
}

export async function muteUser(params: any) {
  return request('/api/v1/admin/users/mute', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
