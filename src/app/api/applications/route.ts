import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const application = await prisma.jobApplication.create({
      data: {
        company: body.company,
        position: body.position,
        location: body.location || null,
        jobUrl: body.jobUrl || null,
        salary: body.salary || null,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Failed to create application:", error);

    return NextResponse.json(
      { error: "Failed to create job application" },
      { status: 500 },
    );
  }
}
