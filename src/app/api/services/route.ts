import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, duration, price } = body

    // Hizmet oluştur
    const service = await prisma.service.create({
      data: {
        name,
        description,
        duration,
        price
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json(
      { error: 'Hizmet oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const services = await prisma.service.findMany()

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json(
      { error: 'Hizmetler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 