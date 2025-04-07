import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';
import { AppointmentStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    // Veritabanı bağlantısını kontrol et
    try {
      await prisma.$connect();
      console.log('Veritabanı bağlantısı başarılı');
    } catch (connError) {
      console.error('Veritabanı bağlantı hatası:', connError);
      return NextResponse.json(
        { error: 'Veritabanına bağlanılamadı. Lütfen daha sonra tekrar deneyin.' },
        { status: 503 }
      );
    }

    console.log('Mükerrer randevu kontrolü başladı');
    
    const body = await request.json();
    const { name, phone, date } = body;
    
    console.log('Gelen veriler:', { name, phone, date });

    if (!name || !phone || !date) {
      console.log('Eksik veri:', { name, phone, date });
      return NextResponse.json(
        { error: 'Ad, telefon ve tarih bilgileri zorunludur' },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(date);
    console.log('Oluşturulan tarih:', appointmentDate);
    
    // Tarih geçerli mi kontrol et
    if (isNaN(appointmentDate.getTime())) {
      console.log('Geçersiz tarih formatı:', date);
      return NextResponse.json(
        { error: 'Geçersiz tarih formatı' },
        { status: 400 }
      );
    }

    // Telefon numarasını standardize et
    const standardizedPhone = phone.replace(/\D/g, '');
    console.log('Standardize edilmiş telefon:', standardizedPhone);

    // Gün başlangıcı ve sonu (UTC'ye göre)
    const dayStart = startOfDay(appointmentDate);
    const dayEnd = endOfDay(appointmentDate);
    console.log('Tarih aralığı:', { 
      dayStart: dayStart.toISOString(), 
      dayEnd: dayEnd.toISOString() 
    });

    try {
      // Önce müşteri kaydını kontrol et
      console.log('Müşteri sorgusu başlıyor...');
      const existingCustomer = await prisma.customer.findFirst({
        where: {
          OR: [
            { name: { equals: name, mode: 'insensitive' } },
            { phone: standardizedPhone }
          ]
        }
      });
      console.log('Bulunan müşteri:', existingCustomer);

      if (existingCustomer) {
        // Müşterinin aynı gün içinde randevusu var mı kontrol et
        console.log('Randevu sorgusu başlıyor...');
        const existingAppointment = await prisma.appointment.findFirst({
          where: {
            customerId: existingCustomer.id,
            date: {
              gte: dayStart,
              lte: dayEnd
            },
            OR: [
              { status: AppointmentStatus.PENDING },
              { status: AppointmentStatus.CONFIRMED }
            ]
          }
        });
        console.log('Bulunan randevu:', existingAppointment);

        if (existingAppointment) {
          const existingDate = new Date(existingAppointment.date);
          console.log('Mükerrer randevu bulundu:', existingDate);
          return NextResponse.json({ 
            hasDuplicate: true,
            existingAppointment: {
              date: existingDate.toLocaleString('tr-TR', {
                dateStyle: 'full',
                timeStyle: 'short'
              })
            }
          });
        }
      }

      console.log('Mükerrer randevu bulunamadı');
      return NextResponse.json({ hasDuplicate: false });
    } catch (dbError) {
      console.error('Veritabanı işlem hatası:', dbError);
      return NextResponse.json(
        { error: 'Veritabanı işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error('Mükerrer randevu kontrolü hatası:', error);
    return NextResponse.json(
      { 
        error: 'Mükerrer randevu kontrolü sırasında bir hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
} 