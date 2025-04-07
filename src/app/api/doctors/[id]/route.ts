import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Önce doktorun randevularını kontrol et
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: id,
      },
    });

    if (appointments.length > 0) {
      return new NextResponse(
        JSON.stringify({ error: "Bu doktora ait randevular olduğu için silinemez" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Doktoru sil
    await prisma.doctor.delete({
      where: {
        id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Doktor başarıyla silindi" }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Doktor silinirken hata:", error);
    return new NextResponse(
      JSON.stringify({ error: "Doktor silinirken bir hata oluştu" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 