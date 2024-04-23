/* eslint-disable import/no-anonymous-default-export */
import { http } from '../api/http';

export default {
  searchCards: async (page: number, pageSize: number) => {
    return http.get(`/cards?page=${page}&pageSize=${pageSize}`);
  },
};
