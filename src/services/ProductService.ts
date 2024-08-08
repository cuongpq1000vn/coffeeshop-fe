"use server";

import { TokenDTO } from "@/types/dtos/auth/Token";
import { ProductDTO } from "@/types/dtos/categoryProduct/Product";
import { ProductRequest } from "@/types/dtos/categoryProduct/request/ProductRequest";
import { PageDTO } from "@/types/Page";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_CATEGORY_PRODUCT_API;

export async function getAllProduct(page: number, size: number) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/api/product/${requestId}/all-products?page=${page}&size=${size}`,
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
    const result = (await response.json()) as PageDTO<ProductDTO>;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function createProduct(product: ProductRequest) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  product.storeId = accessToken.storeId;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/product/${requestId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-type": `${accessToken.userType}`,
          "store-id": `${accessToken.storeId}`,
          "x-access-token": `${accessToken.token}`,
        },
        body: JSON.stringify(product),
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as ProductDTO;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function updateProduct(
  productId: string,
  product: ProductRequest
) {
  try {
    const requestId = crypto.randomUUID();
    const token = cookies().get("sessionToken")?.value;
    if (!token) {
      throw NextResponse.json({ response: { status: 401 } });
    }
    const accessToken = JSON.parse(token) as TokenDTO;
    product.storeId = accessToken.storeId;
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/product/${requestId}/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-type": `${accessToken.userType}`,
          "store-id": `${accessToken.storeId}`,
          "x-access-token": `${accessToken.token}`,
        },
        body: JSON.stringify(product),
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as ProductDTO;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function deleteProduct(productId: string) {
  try {
    const requestId = crypto.randomUUID();
    const token = cookies().get("sessionToken")?.value;
    if (!token) {
      throw NextResponse.json({ response: { status: 401 } });
    }
    const accessToken = JSON.parse(token) as TokenDTO;
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/product/${requestId}/${productId}`,
      {
        method: "DELETE",
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
    const result = (await response.json()) as ProductDTO;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}
