"use server";

import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { NextResponse } from "next/server";
const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_CATEGORY_PRODUCT_API;

export async function getAllCategory(sessionToken: string) {
  const requestId = crypto.randomUUID();
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/api/category/${requestId}/getAll`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-type": "OWNER",
          "store-id": "f4ba27b7-a1e5-4ddf-aef9-a43c38b1975d",
          "x-access-token": `${sessionToken}`,
        },
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as CategoryDTO[];
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function createCategory() {
  const requestId = crypto.randomUUID();
  try {
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
