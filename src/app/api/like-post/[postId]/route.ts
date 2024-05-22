import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) {
    return NextResponse.json(
      { message: "Could not find post!" },
      { status: 404 }
    );
  }

  const requester = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  if (!requester) {
    return NextResponse.json({ message: "User not found!" }, { status: 404 });
  }

  const like = await prisma.like.findFirst({
    where: { postId: params.postId, userId: requester.id },
  });

  if (like) {
    await prisma.like.delete({
      where: { id: like.id },
    });
    return NextResponse.json({ message: "Unliked post." }, { status: 200 });
  }

  await prisma.like.create({
    data: {
      post: {
        connect: {
          id: post.id,
        },
      },
      user: {
        connect: {
          id: requester.id,
        },
      },
    },
  });

  return NextResponse.json({ message: "Liked post." }, { status: 200 });
}
