import http from '@/utils/http';
import { TableListParams } from './data';

export async function queryRoles(params?: TableListParams) {
  const param = Object.assign(
    {
      pageNumber: params ? params.current : 1,
    },
    params,
  );
  delete param.current;
  const data: any = await http.get('/api/v1/admin/roles', param);
  return {
    data: data.rows,
    total: data.count,
    success: true,
  };
}

export async function updateRoles(params: {
  id: number;
  rightIds: Array<string>;
  name: string;
  keyName: string;
  desc: string;
}) {
  return http.put('/api/v1/admin/roles', params);
}

export async function createRoles(params: {
  name: string;
  keyName: string;
  desc: string;
  rightIds: Array<string>;
}) {
  return http.post('/api/v1/admin/roles', params);
}

export async function deleteRoles(params: { ids: Array<number> }) {
  return http.delete('/api/v1/admin/roles', params);
}
