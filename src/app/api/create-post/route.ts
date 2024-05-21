import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const postData = await request.json();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User could not be found!" },
      { status: 404 }
    );
  }

  if (!postData.content) {
    return NextResponse.json(
      {
        message: "Missing content!",
      },
      { status: 206 }
    );
  }

  await prisma.post.create({
    data: {
      content: postData.content,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return NextResponse.json(
    {
      message: "Post created!",
    },
    { status: 200 }
  );
}
