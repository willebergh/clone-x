import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const postData = await request.json();

  console.log(postData);

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

  if (!postData.content) {
    return NextResponse.json({ message: "Missing content" }, { status: 206 });
  }

  await prisma.reply.create({
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
      content: postData.content,
    },
  });

  if (requester.id !== post.userId) {
    await prisma.notification.create({
      data: {
        user: {
          connect: {
            id: post.userId,
          },
        },
        content: `${requester.name} has replied your post!`,
      },
    });
  }

  return NextResponse.json({ message: "Reply sent! " }, { status: 200 });
}
