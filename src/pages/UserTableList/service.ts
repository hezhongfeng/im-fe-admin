import http from '@/utils/http';
import { TableListParams } from './data';

export async function queryUsers(params?: TableListParams, sort?: any) {
  const param = Object.assign(params, {
    pageNumber: params ? params.current : 1,
    sorter: sort,
  });
  delete param.current;
  const data: any = await http.get('/api/v1/admin/users', param);
  return {
    data: data.rows,
    total: data.count,
    success: true,
  };
}

export async function disabledUser(params: any) {
  return http.put('/api/v1/admin/users/disabled', params);
}

export async function muteUser(params: any) {
  return http.put('/api/v1/admin/users/mute', params);
}
