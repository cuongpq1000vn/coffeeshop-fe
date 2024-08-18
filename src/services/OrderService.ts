"use server";
import { TokenDTO } from "@/types/dtos/auth/Token";
import { OrderDto } from "@/types/dtos/order/OrderDto";
import { PageDTO } from "@/types/Page";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { format } from 'date-fns';

const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_ORDER_API;
export async function getOrderByStatus(
  status: string,
  page: number,
  size: number,
  startDate: Date,
  endDate: Date
) {
  const formatStartDate: string = format(startDate, 'yyyy-MM-dd');
  const formatEndDate: string = format(endDate, 'yyyy-MM-dd');
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/orders/${requestId}/1cce71fd-35d3-40e0-a9de-85040c9d995f/get-all?&status=${status}&page=${page}&size=${size}&sort=code%2CDESC&startDate=2024-07-28&endDate=2024-07-30`,
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
    const result = (await response.json()) as PageDTO<OrderDto>;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function handleProcessOrder(orderId: string) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/orders/${requestId}/${orderId}/process`,
      {
        method: "PUT",
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
    const result = (await response.json()) as OrderDto;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function handleCancelOrder(orderId: string) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/orders/${requestId}/${orderId}/cancel`,
      {
        method: "PUT",
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
    const result = (await response.json()) as OrderDto;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function handleCompleteOrder(orderId: string) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/orders/${requestId}/${orderId}/complete`,
      {
        method: "PUT",
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
    const result = (await response.json()) as OrderDto;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}
