import { AxiosError } from "axios";

interface IError {
  data: null;
  ok: boolean;
  error: string;
}

export const apiError = (error: unknown): IError => {
  if (error instanceof AxiosError) {
    return {
      data: null,
      ok: false,
      error: error.response?.data.message || "Failed to authenticate",
    };
  }
  return {
    data: null,
    ok: false,
    error: "Failed to authenticate",
  };
};
