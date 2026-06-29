import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { nombres, apellidos, acompanante, ninos_asisten, puntualidad } = body

    const client = await pool.connect()
    try {
      const result = await client.query(
        'UPDATE confirmaciones SET nombres = $1, apellidos = $2, acompanante = $3, ninos_asisten = $4, puntualidad = $5 WHERE id = $6 RETURNING *',
        [nombres, apellidos, acompanante || '', ninos_asisten || 0, puntualidad || null, id]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Confirmación no encontrada' },
          { status: 404 }
        )
      }

      return NextResponse.json(result.rows[0], { status: 200 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error en PUT /api/admin/confirmaciones:', error)
    return NextResponse.json(
      { error: 'Error al actualizar confirmación' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    const client = await pool.connect()
    try {
      const result = await client.query(
        'DELETE FROM confirmaciones WHERE id = $1 RETURNING id',
        [id]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Confirmación no encontrada' },
          { status: 404 }
        )
      }

      return NextResponse.json({ success: true, id }, { status: 200 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error en DELETE /api/admin/confirmaciones:', error)
    return NextResponse.json(
      { error: 'Error al eliminar confirmación' },
      { status: 500 }
    )
  }
}
