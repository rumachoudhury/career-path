// import { NextResponse } from "next/server";
// import { PrismaClient } from "@/generated/prisma/client";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const application = await prisma.jobApplication.create({
//       data: {
//         company: body.company,
//         position: body.position,
//         location: body.location || null,
//         jobUrl: body.jobUrl || null,
//         salary: body.salary || null,
//         notes: body.notes || null,
//       },
//     });

//     return NextResponse.json(application, { status: 201 });
//   } catch (error) {
//     console.error("Failed to create application:", error);

//     return NextResponse.json(
//       { error: "Failed to create job application" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications:", error);

    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 },
    );
  }
}

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
        status: body.status || "APPLIED",
        interviewDate: body.interviewDate
          ? new Date(`${body.interviewDate}T00:00:00`)
          : null,

        interviewTime: body.interviewTime || null,
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
