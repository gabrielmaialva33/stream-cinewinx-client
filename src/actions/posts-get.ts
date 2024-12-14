"use server";

import { IListAPI, IListDTO } from "@/interfaces/dtos/list.dto";
import { api } from "@/services/api";

export type IPost = {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
};

export const listPostsAPI = async ({
  page = 1,
  perPage = 10,
}: IListDTO): IListAPI<IPost[]> =>
  api.get("photo", {
    headers: {
      "Cache-Control": "no-cache",
    },
    params: {
      _page: page,
      _total: perPage,
      _user: 0,
    },
  });
