import { NextRequest, NextResponse } from 'next/server'
import { updatePuntualidad } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { puntualidad } = body

    if (!puntualidad) {
      return NextResponse.json(
        { error: 'Puntualidad es requerida' },
        { status: 400 }
      )
    }

    const updated = await updatePuntualidad(id, puntualidad)

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('Error en PUT /api/rsvp/punctuality:', error)
    return NextResponse.json(
      { error: 'Error al actualizar puntualidad' },
      { status: 500 }
    )
  }
}
