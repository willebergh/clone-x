import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User could not be found!" },
      { status: 404 }
    );
  }

  return NextResponse.json(user, { status: 200 });
}
