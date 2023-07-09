import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  articleSlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { articleSlug } = params;
  const res = await prisma.article.delete({
    where: {
      slug: articleSlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { articleSlug } = params;
  const body = await request.json();
  const {
    title,
    slug,
    image,
    description,
    content,
    categoryId,
    featured,
    articletags,
  } = body;
  const update = await prisma.article.update({
    where: {
      slug: articleSlug,
    },
    data: {
      title,
      slug,
      image,
      description,
      content,
      categoryId,
      featured,
      tags: {
        connect: articletags.map((tag: { value: string }) => ({
          id: tag.value,
        })),
      },
    },
  });
  return NextResponse.json(update);
}
