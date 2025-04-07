import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const doctorId = searchParams.get('doctorId');

    if (!date || !doctorId) {
      return NextResponse.json(
        { error: 'Tarih ve doktor bilgisi gerekli' },
        { status: 400 }
      );
    }

    // Seçilen günün başlangıç ve bitiş zamanlarını hesapla
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // O gün için tüm randevuları getir
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      },
      select: {
        date: true
      }
    });

    // Randevu saatlerini formatla
    const bookedSlots = appointments.map(appointment => {
      const date = new Date(appointment.date);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    });

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error('Dolu randevular alınırken hata:', error);
    return NextResponse.json(
      { error: 'Dolu randevular alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 