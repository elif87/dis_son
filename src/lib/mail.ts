import nodemailer from 'nodemailer';

// Mail gönderici yapılandırması
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD?.replace(/\s+/g, ''), // Boşlukları kaldır
  },
  tls: {
    rejectUnauthorized: false // SSL sertifika hatalarını yoksay
  },
  debug: true, // Debug modu aktif
  logger: true // Logger aktif
});

// Bağlantıyı test et
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP bağlantı hatası:', error);
  } else {
    console.log('SMTP sunucusuna bağlantı başarılı:', success);
  }
});

interface SendMailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailProps) {
  // SMTP ayarlarını kontrol et
  console.log('SMTP Ayarları:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER,
    fromName: process.env.SMTP_FROM_NAME,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  });

  try {
    // Mail gönderme işlemi öncesi log
    console.log('Mail gönderiliyor...', {
      to,
      subject,
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    });

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log('Mail gönderildi:', {
      messageId: info.messageId,
      response: info.response,
      envelope: info.envelope,
      accepted: info.accepted,
      rejected: info.rejected
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Mail gönderme hatası detayları:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorCode: error && typeof error === 'object' && 'code' in error ? error.code : undefined,
      errorCommand: error && typeof error === 'object' && 'command' in error ? error.command : undefined,
      errorResponse: error && typeof error === 'object' && 'response' in error ? error.response : undefined
    });
    throw error;
  }
}

// Randevu onay maili şablonu
export function getAppointmentConfirmationEmail(appointmentData: {
  customerName: string;
  doctorName: string;
  doctorTitle: string;
  date: Date;
  notes?: string;
}) {
  const formattedDate = new Date(appointmentData.date).toLocaleString('tr-TR', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #234b8a; margin-bottom: 20px;">Randevu Onayı</h2>
      
      <p>Sayın ${appointmentData.customerName},</p>
      
      <p>Randevunuz başarıyla oluşturulmuştur. Randevu detayları aşağıdaki gibidir:</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doktor:</strong> ${appointmentData.doctorTitle} ${appointmentData.doctorName}</p>
        <p><strong>Tarih:</strong> ${formattedDate}</p>
        ${appointmentData.notes ? `<p><strong>Notlar:</strong> ${appointmentData.notes}</p>` : ''}
      </div>
      
      <p>Randevunuzu iptal etmek veya değiştirmek isterseniz lütfen bizimle iletişime geçin.</p>
      
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Saygılarımızla,<br>
        ${process.env.SMTP_FROM_NAME}
      </p>
    </div>
  `;
}

// Randevu onay maili gönderme fonksiyonu
export async function sendAppointmentConfirmation(
  email: string,
  customerName: string,
  doctorName: string,
  appointmentDate: Date
) {
  try {
    // Mail içeriğini oluştur
    const emailHtml = getAppointmentConfirmationEmail({
      customerName,
      doctorName,
      doctorTitle: 'Dr.',
      date: appointmentDate,
    });

    // Mail gönder
    await sendMail({
      to: email,
      subject: 'Randevu Onayı',
      html: emailHtml,
    });

    console.log('Randevu onay maili gönderildi:', {
      email,
      customerName,
      doctorName,
      appointmentDate,
    });
  } catch (error) {
    console.error('Randevu onay maili gönderme hatası:', error);
    throw error;
  }
}

// Randevu iptal maili şablonu
export function getAppointmentCancellationEmail(appointmentData: {
  customerName: string;
  doctorName: string;
  doctorTitle: string;
  date: Date;
  notes?: string;
}) {
  const formattedDate = new Date(appointmentData.date).toLocaleString('tr-TR', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #234b8a; margin-bottom: 20px;">Randevu İptali</h2>
      
      <p>Sayın ${appointmentData.customerName},</p>
      
      <p>Aşağıdaki randevunuz iptal edilmiştir:</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doktor:</strong> ${appointmentData.doctorTitle} ${appointmentData.doctorName}</p>
        <p><strong>Tarih:</strong> ${formattedDate}</p>
        ${appointmentData.notes ? `<p><strong>İptal Nedeni:</strong> ${appointmentData.notes}</p>` : ''}
      </div>
      
      <p>Yeni bir randevu oluşturmak için web sitemizi ziyaret edebilirsiniz.</p>
      
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Saygılarımızla,<br>
        ${process.env.SMTP_FROM_NAME}
      </p>
    </div>
  `;
}

// Randevu iptal maili gönderme fonksiyonu
export async function sendAppointmentCancellation(
  email: string,
  customerName: string,
  doctorName: string,
  appointmentDate: Date,
  notes?: string
) {
  try {
    // Mail içeriğini oluştur
    const emailHtml = getAppointmentCancellationEmail({
      customerName,
      doctorName,
      doctorTitle: 'Dr.',
      date: appointmentDate,
      notes,
    });

    // Mail gönder
    await sendMail({
      to: email,
      subject: 'Randevu İptali',
      html: emailHtml,
    });

    console.log('Randevu iptal maili gönderildi:', {
      email,
      customerName,
      doctorName,
      appointmentDate,
    });
  } catch (error) {
    console.error('Randevu iptal maili gönderme hatası:', error);
    throw error;
  }
} 