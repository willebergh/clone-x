import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const searchData = await request.json();

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

  if (!searchData.query) {
    return NextResponse.json(
      {
        message: "Missing query!",
      },
      { status: 206 }
    );
  }

  const foundUsers = await prisma.user.findMany({
    where: {
      name: {
        contains: searchData.query,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(foundUsers, { status: 200 });
}
