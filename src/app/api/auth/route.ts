import { TokenDTO } from "@/types/dtos/auth/Token";
export async function POST(request: Request) {
  const res = await request.json() as TokenDTO;
  const sessionToken = JSON.stringify(res);
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
