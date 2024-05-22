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

  const notifications = await prisma.notification.findMany({
    where: { userId: requester.id },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(notifications, { status: 200 });
}
