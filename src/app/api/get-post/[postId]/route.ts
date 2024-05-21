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

  const post = await prisma.post.findFirst({
    where: { id: params.postId },
    include: { user: true },
  });

  if (!post) {
    return NextResponse.json(
      {
        message: "Could not find post!",
      },
      { status: 404 }
    );
  }

  console.log(post);

  return NextResponse.json(post, { status: 200 });
}
