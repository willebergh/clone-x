import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const requester = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
    include: { following: true },
  });

  if (!requester) {
    return NextResponse.json({ message: "User not found" }, { status: 402 });
  }

  const posts = await prisma.post.findMany({
    include: { user: true, likes: true },
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
        console.log(like.userId, requester.id);
      }
    }

    postWithLikeStatus.numberOfReplys = (
      await prisma.reply.findMany({
        where: { postId: post.id },
      })
    ).length;

    for (const follow of requester.following) {
      if (follow.followedId === post.userId) {
        response.push(postWithLikeStatus);
      }
    }

    if (post.userId === requester.id) {
      response.push(postWithLikeStatus);
    }
  }

  console.log(response);

  return NextResponse.json(response, { status: 200 });
}
