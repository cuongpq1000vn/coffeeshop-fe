import { TokenDTO } from "@/types/dtos/auth/Token";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const res = await request.json() as TokenDTO;
  const sessionToken = res.token;
  if (!sessionToken) {
    return Response.json(
      { message: "Error token" },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
      },
    }
  );
}
