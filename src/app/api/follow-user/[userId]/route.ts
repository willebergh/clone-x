import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(
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

  if (user.email === session.user?.email) {
    return NextResponse.json(
      {
        message: "You can't follow yourself!",
      },
      { status: 402 }
    );
  }

  const requester = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
  });

  if (!requester) {
    return NextResponse.json(
      { message: "User could not be found" },
      { status: 404 }
    );
  }

  const follow = await prisma.follow.findFirst({
    where: {
      followedId: user.id,
      followingId: requester?.id,
    },
  });

  if (follow) {
    await prisma.follow.delete({
      where: { id: follow.id },
    });

    return NextResponse.json({ message: "Unfollowd user" }, { status: 200 });
  }

  const newFollow = await prisma.follow.create({
    data: {
      followed: {
        connect: {
          id: user.id,
        },
      },
      following: {
        connect: {
          id: requester.id,
        },
      },
    },
  });

  if (requester.id !== user.id) {
    await prisma.notification.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        content: `${requester.name} is now following you!`,
      },
    });
  }

  return NextResponse.json({ message: "Following user" }, { status: 200 });
}
