import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePath = ["/content/product", "/content/category"];
const authPath = ["/login"];

export function middleware(request: NextRequest) {
  // const pathName = request.nextUrl.pathname;
  // const session = request.cookies.get("sessionToken")?.value;
  // // token expire -> redirect to login
  // if (privatePath.some((path) => pathName.startsWith(path)) && !session) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // // already has token
  // if (authPath.some((path) => pathName.startsWith(path)) && session) {
  //   return NextResponse.redirect(new URL("/content/category", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/content/product", "/content/category", "/login"],
};
