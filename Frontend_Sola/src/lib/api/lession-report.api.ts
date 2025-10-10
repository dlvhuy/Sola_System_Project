import { apiFetch } from '../helpers/fetcher';

export const lessionReportApi = {
  getById: (id: number) => apiFetch(`/lession-report?id=${id}`),
  create: (data: any) => apiFetch('/lession-report', { method: 'POST', body: data }),
};