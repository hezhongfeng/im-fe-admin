import http from '@/utils/http';
import { TableListParams } from './data';

export async function queryGroups(params?: TableListParams, sort?: any) {
  const param = Object.assign(params, {
    pageNumber: params ? params.current : 1,
    sorter: sort,
  });
  delete param.current;
  const data: any = await http.get('/api/v1/admin/groups', param);
  return {
    data: data.rows,
    total: data.count,
    success: true,
  };
}

export async function disabledGroup(params: any) {
  return http.put('/api/v1/admin/groups/disabled', params);
}

export async function muteGroup(params: any) {
  return http.put('/api/v1/admin/groups/mute', params);
}
