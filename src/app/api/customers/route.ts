import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Ad Soyad ve Telefon alanları zorunludur' },
        { status: 400 }
      )
    }

    // Müşteri oluştur
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone
      }
    })

    return NextResponse.json(customer)
  } catch (error: any) {
    console.error('Müşteri oluşturma hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Müşteri oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        appointments: true
      }
    })

    return NextResponse.json(customers)
  } catch (error: any) {
    console.error('Müşteri listeleme hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Müşteriler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 