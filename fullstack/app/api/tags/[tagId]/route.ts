import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  tagId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { tagId } = params;
  const res = await prisma.tag.delete({
    where: {
      id: tagId,
    },
  });
  return NextResponse.json(res);
}

export async function PUT(request: Request, { params }: { params: Iparams }) {
  const { tagId } = params;
  const body = await request.json();
  const { name, slug } = body;
  const update = await prisma.tag.update({
    where: {
      id: tagId,
    },
    data: {
      name,
      slug,
    },
  });
  return NextResponse.json(update);
}
