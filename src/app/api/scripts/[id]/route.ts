import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const script = await prisma.script.update({
      where: { id: params.id },
      data: { isActive: data.isActive }
    });
    return NextResponse.json(script);
  } catch (error) {
    console.error('Script güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Script güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.script.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Script silinirken hata:', error);
    return NextResponse.json(
      { error: 'Script silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 