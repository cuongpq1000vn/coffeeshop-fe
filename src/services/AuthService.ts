"use server";

import { LoginOwnerDTO } from "@/types/dtos/auth/request/LoginOwner";
import { TokenDTO } from "@/types/dtos/auth/Token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_USER_API;
const HEADER_DEFAULT_TOKEN = process.env.DEFAULT_TOKEN;
export async function login(data: LoginOwnerDTO): Promise<TokenDTO> {
  const requestId = crypto.randomUUID();
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/owners/${requestId}/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${HEADER_DEFAULT_TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as TokenDTO;
    return result;
  } catch (err) {
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function logout() {
  cookies().delete("sessionToken");
}
