import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        customer: true,
        doctor: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Randevular getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Randevular getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 