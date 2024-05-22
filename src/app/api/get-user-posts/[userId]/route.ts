import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
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

  const posts = await prisma.post.findMany({
    where: { userId: params.userId },
    include: { user: true, likes: true, replys: true },
    orderBy: {
      created_at: "desc",
    },
  });

  const response = [];
  for await (const post of posts) {
    let postWithLikeStatus = {
      ...post,
      requesterHasLiked: false,
      numberOfReplys: 0,
    };

    for (const like of post.likes) {
      if (like.userId === requester.id) {
        postWithLikeStatus.requesterHasLiked = true;
      }
    }

    response.push(postWithLikeStatus);
  }

  return NextResponse.json(response, { status: 200 });
}
