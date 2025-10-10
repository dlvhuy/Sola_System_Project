import { apiFetch } from '../helpers/fetcher';

export const studentApi = {
  getAll: () => apiFetch('/students'),
  getById: (id: number) => apiFetch(`/students/detail?id=${id}`),
  create: (data: any) => apiFetch('/students', { method: 'POST', body: data }),
};