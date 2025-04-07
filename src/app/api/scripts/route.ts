import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const scripts = await prisma.script.findMany();
    return NextResponse.json(scripts);
  } catch (error) {
    console.error('Scripts yüklenirken hata:', error);
    return NextResponse.json(
      { error: 'Scripts yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const script = await prisma.script.create({
      data: {
        type: data.type,
        scriptId: data.scriptId,
        isActive: data.isActive,
        customScript: data.customScript
      }
    });
    return NextResponse.json(script);
  } catch (error) {
    console.error('Script eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Script eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 