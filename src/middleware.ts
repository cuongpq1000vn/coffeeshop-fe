import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TokenDTO } from "./types/dtos/auth/Token";
import { TokenRequest } from "./types/dtos/auth/request/TokenRequest";
const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const CONTEXT_PATH = process.env.CONTEXT_PATH_COFFEE_SHOP_AUTH_API;
export type Account = {
  account: string;
};

export async function verifyToken(token: string): Promise<string> {
  try {
    const requestId = crypto.randomUUID();
    const tokenResponse = JSON.parse(token) as TokenDTO;
    const tokenRequest: TokenRequest = {
      storeId: tokenResponse.storeId,
      token: tokenResponse.token,
      userType: tokenResponse.userType,
    };
    const response = await fetch(
      `${COFFEE_SHOP_URL}/${CONTEXT_PATH}/internal/auth/${requestId}/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tokenRequest),
      }
    );
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw NextResponse.json({ response: { status: response.status } });
    }
    const result = (await response.json()) as Account;
    return result.account;
  } catch (err) {
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export async function middleware(request: NextRequest) {
  try {
    const session = request.cookies.get("sessionToken")?.value;
    // token empty -> redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const isTokenValid = await verifyToken(session);

    // already has token
    if (!isTokenValid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    throw NextResponse.json({ response: { status: 500 } });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
