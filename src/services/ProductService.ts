"use server";

import { NextResponse } from "next/server";

const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_AUTH_API;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_CATEGORY_PRODUCT_API;

export async function getAllProduct() {
    const requestId = crypto.randomUUID();
  try{

  }
  catch(err){
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function createProduct() {
    const requestId = crypto.randomUUID();
  try{

  }
  catch(err){
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function updateProduct() {
    const requestId = crypto.randomUUID();
  try{

  }
  catch(err){
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}
