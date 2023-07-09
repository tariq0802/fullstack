import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { userId } = params;
  const res = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return NextResponse.json(res);
}

export async function PUT(request: Request, { params }: { params: Iparams }) {
  const { userId } = params;
  const body = await request.json();
  const { name, email, role } = body;
  const update = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      role,
    },
  });
  return NextResponse.json(update);
}
