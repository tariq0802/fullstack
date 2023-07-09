import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug, image, description } = body;

  const res = await prisma?.category.create({
    data: {
      name,
      slug,
      image,
      description,
    },
  });

  return NextResponse.json(res);
}
