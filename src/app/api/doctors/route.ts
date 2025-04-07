import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return new NextResponse(JSON.stringify(doctors), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch (error) {
    console.error("Doktorlar yüklenirken hata:", error);
    return new NextResponse(
      JSON.stringify({ error: "Doktorlar yüklenirken bir hata oluştu" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, specialties } = body;

    const doctor = await prisma.doctor.create({
      data: {
        name,
        title,
        specialties,
      },
    });

    return new NextResponse(JSON.stringify(doctor), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch (error) {
    console.error("Doktor eklenirken hata:", error);
    return new NextResponse(
      JSON.stringify({ error: "Doktor eklenirken bir hata oluştu" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      }
    );
  }
} 