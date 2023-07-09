import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  categoryId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { categoryId } = params;
  const res = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return NextResponse.json(res);
}

export async function PUT(request: Request, { params }: { params: Iparams }) {
  const { categoryId } = params;
  const body = await request.json();
  const { name, slug, image, description } = body;
  const update = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
      slug,
      image,
      description,
    },
  });
  return NextResponse.json(update);
}
