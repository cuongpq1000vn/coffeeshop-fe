"use server";

import { TokenDTO } from "@/types/dtos/auth/Token";
import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { CategoryRequest } from "@/types/dtos/categoryProduct/request/CategoryRequest";
import { PageDTO } from "@/types/Page";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_CATEGORY_PRODUCT_API;

export async function getAllCategory(page: number, size: number) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/api/category/${requestId}/getAll?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-type": `${accessToken.userType}`,
          "store-id": `${accessToken.storeId}`,
          "x-access-token": `${accessToken.token}`,
        },
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as PageDTO<CategoryDTO>;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function createCategory(category: CategoryRequest) {
  try {
    const requestId = crypto.randomUUID();
    const token = cookies().get("sessionToken")?.value;
    if (!token) {
      throw NextResponse.json({ response: { status: 401 } });
    }
    const accessToken = JSON.parse(token) as TokenDTO;
    category.storeId = accessToken.storeId;
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/category/${requestId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-type": `${accessToken.userType}`,
          "store-id": `${accessToken.storeId}`,
          "x-access-token": `${accessToken.token}`,
        },
        body: JSON.stringify(category),
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as CategoryDTO;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function updateCategory() {
  const requestId = crypto.randomUUID();
  try {
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}
