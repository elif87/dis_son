import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendAppointmentConfirmation, sendAppointmentCancellation } from '@/lib/mail';
import { AppointmentStatus } from '@prisma/client';

interface UpdateAppointmentBody {
  status: AppointmentStatus;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json() as UpdateAppointmentBody;
    const { status } = body;

    // Status değerini kontrol et
    if (!Object.values(AppointmentStatus).includes(status)) {
      return NextResponse.json(
        { error: 'Geçersiz randevu durumu' },
        { status: 400 }
      );
    }

    // Randevuyu bul ve güncelle
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        customer: true,
        doctor: true,
      },
    });

    // E-posta göndermeyi dene
    try {
      if (appointment.customer.email) {
        if (status === AppointmentStatus.CONFIRMED) {
          await sendAppointmentConfirmation(
            appointment.customer.email,
            appointment.customer.name,
            `${appointment.doctor.title} ${appointment.doctor.name}`,
            appointment.date
          );
        } else if (status === AppointmentStatus.CANCELLED) {
          await sendAppointmentCancellation(
            appointment.customer.email,
            appointment.customer.name,
            `${appointment.doctor.title} ${appointment.doctor.name}`,
            appointment.date,
            appointment.notes || undefined
          );
        }
      }
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError);
      // E-posta hatası randevu güncellemeyi engellemeyecek
    }

    return NextResponse.json(appointment);
  } catch (error: any) {
    console.error('Randevu güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Randevu güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Randevuyu sil
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Randevu silme hatası:', error);
    return NextResponse.json(
      { error: 'Randevu silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 