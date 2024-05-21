import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

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
    include: { followed: true, following: true },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User could not be found!" },
      { status: 404 }
    );
  }

  const requester = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  if (!requester) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const follow = await prisma.follow.findFirst({
    where: {
      followedId: user.id,
      followingId: requester.id,
    },
  });

  const formattedUser = {
    ...user,
    isFollowing: Boolean(follow),
  };

  return NextResponse.json(formattedUser, { status: 200 });
}
