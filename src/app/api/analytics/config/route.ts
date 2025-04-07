import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const config = await prisma.analyticsConfig.findFirst();
    
    if (!config) {
      return NextResponse.json({
        googleAnalyticsId: '',
        googleTagManagerId: '',
        metaPixelId: ''
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Analytics config get error:', error);
    return NextResponse.json(
      { error: 'Yapılandırma yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { googleAnalyticsId, googleTagManagerId, metaPixelId } = body;

    const config = await prisma.analyticsConfig.upsert({
      where: { id: 1 },
      update: {
        googleAnalyticsId,
        googleTagManagerId,
        metaPixelId,
      },
      create: {
        id: 1,
        googleAnalyticsId,
        googleTagManagerId,
        metaPixelId,
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error('Analytics config save error:', error);
    return NextResponse.json(
      { error: 'Yapılandırma kaydedilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 