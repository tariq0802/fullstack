import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    slug,
    image,
    description,
    content,
    categoryId,
    articletags,
    featured,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const article = await prisma?.article.create({
    data: {
      title,
      slug,
      image,
      description,
      content,
      categoryId,
      authorId: session.user.id,
      featured,
      tags: {
        connect: articletags.map((tag: { value: string }) => ({
          id: tag.value,
        })),
      },
    },
  });

  return NextResponse.json(article);
}
