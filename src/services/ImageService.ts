"use server";

import { TokenDTO } from "@/types/dtos/auth/Token";
import { ImageProps } from "@/types/dtos/image/ImageProps";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_IMAGE_API;

export async function uploadImage(
  image: FormData,
  slug: string,
  fileType: string
) {
  const requestId = crypto.randomUUID();
  const token = cookies().get("sessionToken")?.value;
  if (!token) {
    throw NextResponse.json({ response: { status: 401 } });
  }
  const accessToken = JSON.parse(token) as TokenDTO;
  try {
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/merchant/image/${requestId}/upload?storeId=${accessToken.storeId}&imageType=${fileType}&objectCode=${slug}`,
      {
        method: "POST",
        headers: {
          "user-type": `${accessToken.userType}`,
          "store-id": `${accessToken.storeId}`,
          "x-access-token": `${accessToken.token}`,
        },
        body: image,
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }

    const result = (await response.json()) as ImageProps;
    return result;
  } catch (err) {
    console.log(err);
    throw NextResponse.json({ response: { status: 500 } });
  }
}
