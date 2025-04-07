import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAppointmentConfirmation } from '@/lib/mail'
import { AppointmentStatus } from '@prisma/client'

interface CreateAppointmentBody {
  date: string;
  customerId: string;
  doctorId: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateAppointmentBody
    const { date, customerId, doctorId, notes } = body

    // Gerekli alanları kontrol et
    if (!date || !customerId || !doctorId) {
      return NextResponse.json(
        { error: 'Tarih, müşteri ve doktor bilgileri zorunludur' },
        { status: 400 }
      )
    }

    // Tarih formatını kontrol et
    const appointmentDate = new Date(date)
    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json(
        { error: 'Geçersiz tarih formatı' },
        { status: 400 }
      )
    }

    // Müşteri ve doktorun varlığını kontrol et
    try {
      const [customer, doctor] = await Promise.all([
        prisma.customer.findUnique({ where: { id: customerId } }),
        prisma.doctor.findUnique({ where: { id: doctorId } })
      ])

      if (!customer) {
        return NextResponse.json(
          { error: 'Müşteri bulunamadı' },
          { status: 404 }
        )
      }

      if (!doctor) {
        return NextResponse.json(
          { error: 'Doktor bulunamadı' },
          { status: 404 }
        )
      }

      // Randevu çakışması kontrolü
      const appointmentStartTime = new Date(appointmentDate);
      const appointmentEndTime = new Date(appointmentDate);
      appointmentEndTime.setMinutes(appointmentEndTime.getMinutes() + 20);

      // Seçilen gün için tüm randevuları al
      const dayStart = new Date(appointmentStartTime);
      dayStart.setHours(9, 0, 0, 0); // Gün başlangıcı 09:00
      const dayEnd = new Date(appointmentStartTime);
      dayEnd.setHours(18, 0, 0, 0); // Gün sonu 18:00

      console.log('İstenen randevu:', {
        start: appointmentStartTime.toISOString(),
        end: appointmentEndTime.toISOString()
      });

      const existingAppointments = await prisma.appointment.findMany({
        where: {
          doctorId,
          date: {
            gte: dayStart,
            lt: dayEnd
          },
          NOT: {
            status: 'CANCELLED'
          }
        },
        orderBy: {
          date: 'asc'
        }
      });

      console.log('Mevcut randevular:', existingAppointments.map(apt => ({
        date: apt.date,
        status: apt.status
      })));

      // Çakışma kontrolü
      const hasConflict = existingAppointments.some(existing => {
        const existingStart = new Date(existing.date);
        const existingEnd = new Date(existing.date);
        existingEnd.setMinutes(existingEnd.getMinutes() + 20);
        
        const isConflict = (
          (appointmentStartTime >= existingStart && appointmentStartTime < existingEnd) ||
          (appointmentEndTime > existingStart && appointmentEndTime <= existingEnd)
        );

        console.log('Çakışma kontrolü:', {
          existing: {
            start: existingStart.toISOString(),
            end: existingEnd.toISOString()
          },
          isConflict
        });

        return isConflict;
      });

      if (hasConflict) {
        // Müsait saatleri bul
        const availableSlots = [];
        let currentTime = new Date(dayStart);
        
        while (currentTime < dayEnd) {
          const slotStart = new Date(currentTime);
          const slotEnd = new Date(currentTime);
          slotEnd.setMinutes(slotEnd.getMinutes() + 20);

          // Bu slot için çakışma var mı kontrol et
          const isSlotAvailable = !existingAppointments.some(existing => {
            const existingStart = new Date(existing.date);
            const existingEnd = new Date(existing.date);
            existingEnd.setMinutes(existingEnd.getMinutes() + 20);
            
            return (
              (slotStart >= existingStart && slotStart < existingEnd) ||
              (slotEnd > existingStart && slotEnd <= existingEnd)
            );
          });

          if (isSlotAvailable) {
            availableSlots.push(new Date(slotStart));
          }

          currentTime.setMinutes(currentTime.getMinutes() + 20);
        }

        console.log('Müsait saatler:', availableSlots.map(slot => slot.toISOString()));

        // Seçilen saate en yakın 3 müsait saati bul
        const suggestedSlots = availableSlots
          .sort((a, b) => {
            const aDiff = Math.abs(a.getTime() - appointmentStartTime.getTime());
            const bDiff = Math.abs(b.getTime() - appointmentStartTime.getTime());
            return aDiff - bDiff;
          })
          .slice(0, 3)
          .map(slot => slot.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));

        console.log('Önerilen saatler:', suggestedSlots);

        return NextResponse.json(
          { 
            error: 'Seçilen tarih ve saatte doktor müsait değil.',
            suggestedSlots: suggestedSlots.length > 0 
              ? `Önerilen müsait saatler: ${suggestedSlots.join(', ')}`
              : 'Maalesef bugün için müsait saat kalmamıştır.'
          },
          { status: 409 }
        );
      }

      // Randevuyu oluştur
      const appointment = await prisma.appointment.create({
        data: {
          date: appointmentDate,
          customerId,
          doctorId,
          notes,
          status: AppointmentStatus.PENDING
        },
        include: {
          customer: true,
          doctor: true
        }
      })

      // E-posta göndermeyi dene
      try {
        if (appointment.customer.email) {
          await sendAppointmentConfirmation(
            appointment.customer.email,
            appointment.customer.name,
            `${appointment.doctor.title} ${appointment.doctor.name}`,
            appointment.date
          )
        }
      } catch (emailError) {
        console.error('E-posta gönderme hatası:', emailError)
        // E-posta hatası randevu oluşturmayı engellemeyecek
      }

      return NextResponse.json(appointment)
    } catch (dbError: any) {
      console.error('Veritabanı işlem hatası:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı işlemi sırasında bir hata oluştu' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Randevu oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Randevu oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const email = searchParams.get("email");

    if (!phone && !email) {
      return NextResponse.json(
        { message: "Telefon numarası veya e-posta adresi gerekli" },
        { status: 400 }
      );
    }

    let whereClause = {};
    if (phone) {
      // Telefon numarasını normalize et (başındaki 0'ı kaldır)
      const normalizedPhone = phone.startsWith('0') ? phone.substring(1) : phone;
      whereClause = {
        customer: {
          OR: [
            { phone: phone }, // Orijinal numara
            { phone: normalizedPhone }, // 0'sız versiyon
            { phone: `0${normalizedPhone}` }, // 0'lı versiyon
          ],
        },
      };
    } else if (email) {
      whereClause = {
        customer: {
          email: email,
        },
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        customer: true,
        doctor: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (appointments.length === 0) {
      return NextResponse.json(
        { message: "Randevu bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Randevu sorgulama hatası:", error);
    return NextResponse.json(
      { message: "Randevu sorgulanırken bir hata oluştu" },
      { status: 500 }
    );
  }
} 