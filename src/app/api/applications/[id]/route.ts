import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const validStatuses = [
  "WISHLIST",
  "APPLIED",
  "INTERVIEW",
  "OFFERED",
  "REJECTED",
] as const;

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.status !== undefined && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid application status" },
        { status: 400 },
      );
    }

    const application = await prisma.jobApplication.update({
      where: { id },
      data: {
        ...(body.company !== undefined && { company: body.company }),
        ...(body.position !== undefined && { position: body.position }),
        ...(body.location !== undefined && {
          location: body.location || null,
        }),
        ...(body.jobUrl !== undefined && {
          jobUrl: body.jobUrl || null,
        }),
        ...(body.salary !== undefined && {
          salary: body.salary || null,
        }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.notes !== undefined && {
          notes: body.notes || null,
        }),
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Failed to update application:", error);

    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Application deleted" });
  } catch (error) {
    console.error("Failed to delete application:", error);

    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
