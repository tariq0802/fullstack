import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug } = body;

  const res = await prisma?.tag.create({
    data: {
      name,
      slug,
    },
  });

  return NextResponse.json(res);
}
