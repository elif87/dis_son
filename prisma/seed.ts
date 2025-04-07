import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Doktorlar ekle
  const doctor1 = await prisma.doctor.upsert({
    where: { name: 'Dr. Ahmet Yılmaz' },
    update: {},
    create: {
      name: 'Dr. Ahmet Yılmaz',
      title: 'Diş Hekimi',
      specialties: ['Diş Çekimi', 'Dolgu', 'Kanal Tedavisi']
    }
  })

  const doctor2 = await prisma.doctor.upsert({
    where: { name: 'Dr. Ayşe Demir' },
    update: {},
    create: {
      name: 'Dr. Ayşe Demir',
      title: 'Ortodontist',
      specialties: ['Ortodonti', 'Diş Teli', 'Çene Düzeltme']
    }
  })

  // Müşteriler ekle
  const customer1 = await prisma.customer.upsert({
    where: { phone: '05551234567' },
    update: {},
    create: {
      name: 'Mehmet Kaya',
      phone: '05551234567',
      email: 'mehmet@example.com'
    }
  })

  const customer2 = await prisma.customer.upsert({
    where: { phone: '05559876543' },
    update: {},
    create: {
      name: 'Zeynep Şahin',
      phone: '05559876543',
      email: 'zeynep@example.com'
    }
  })

  // Randevular ekle
  await prisma.appointment.createMany({
    data: [
      {
        date: new Date('2024-04-10T10:00:00Z'),
        status: 'CONFIRMED',
        customerId: customer1.id,
        doctorId: doctor1.id,
        notes: 'Diş çekimi randevusu'
      },
      {
        date: new Date('2024-04-15T14:30:00Z'),
        status: 'PENDING',
        customerId: customer2.id,
        doctorId: doctor2.id,
        notes: 'Ortodonti kontrolü'
      },
      {
        date: new Date('2024-04-20T11:00:00Z'),
        status: 'CANCELLED',
        customerId: customer1.id,
        doctorId: doctor1.id,
        notes: 'İptal edilen randevu'
      }
    ]
  })

  console.log('Örnek veriler başarıyla eklendi!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 