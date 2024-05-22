import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
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

  await prisma.notification.updateMany({
    where: { userId: requester.id, read: false },
    data: { read: true },
  });

  return NextResponse.json(
    { message: "Read all notifications." },
    { status: 200 }
  );
}
