import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryGroups(params?: TableListParams, sort?: any) {
  const param = Object.assign(params, {
    pageNumber: params ? params.current : 1,
    sorter: sort,
  });
  delete param.current;
  const res = await request('/api/v1/admin/groups', {
    params: param,
  });
  return {
    data: res.data.rows,
    total: res.data.count,
    success: true,
  };
}

export async function disabledGroup(params: any) {
  return request('/api/v1/admin/groups/disabled', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function muteGroup(params: any) {
  return request('/api/v1/admin/groups/mute', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
