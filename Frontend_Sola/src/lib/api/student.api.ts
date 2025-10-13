import { apiFetch } from '../helpers/fetcher';

export const studentApi = {
  getAll: (search:string,page:number) => apiFetch(`/students?page=${page}&search=${search}`),
  getById: (id: number) => apiFetch(`/students/detail?id=${id}`),
  create: (data: any) => apiFetch('/students', { method: 'POST', body: data }),
};