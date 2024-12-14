"use server";

import { apiAuth } from "@/services/api";

import { apiError } from "@/utils/api-error";

import { cookies } from "next/headers";

type StateProps = {
  ok: boolean;
  error: string;
  data: null;
};

export const loginAction = async (state: StateProps, formData: FormData) => {
  const cookiesNext = await cookies();
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username || !password) {
    return { data: null, ok: false, error: "Prencha os campos corretamente!" };
  }

  try {
    const response = await apiAuth.post("token", {
      username,
      password,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    const { token } = response?.data;
    cookiesNext.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
};
