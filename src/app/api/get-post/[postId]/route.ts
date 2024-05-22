import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 402 });
  }

  const requester = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  if (!requester) {
    return NextResponse.json({ message: "User not found" }, { status: 402 });
  }

  const post = await prisma.post.findFirst({
    where: { id: params.postId },
    include: { user: true, likes: true },
  });

  if (!post) {
    return NextResponse.json(
      {
        message: "Could not find post!",
      },
      { status: 404 }
    );
  }

  const replys = await prisma.reply.findMany({
    where: { postId: post.id },
    include: { user: true },
    orderBy: {
      created_at: "desc",
    },
  });

  const postsWithReplys = {
    ...post,
    replys,
    requesterHasLiked: post.likes.some((like) => like.userId === requester.id),
  };

  console.log(postsWithReplys);

  return NextResponse.json(postsWithReplys, { status: 200 });
}
