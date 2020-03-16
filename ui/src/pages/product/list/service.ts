import request from '@/utils/request';

export async function queryFakeList(params: { count: number }) {
  return request('/api/product/list', {
    params,
  });
}
