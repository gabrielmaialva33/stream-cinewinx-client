import { APIResponse } from "../axios-response";

export interface IMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export type IListDTO = {
  page?: number;
  perPage?: number;
  search?: string;
  [x: string]: string | number | boolean | undefined;
};

export type IListAPI<T> = APIResponse<T>;
