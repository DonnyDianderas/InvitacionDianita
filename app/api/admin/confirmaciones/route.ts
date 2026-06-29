import { NextRequest, NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/db'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM confirmaciones ORDER BY created_at DESC')
      return NextResponse.json(result.rows, { status: 200 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error en GET /api/admin/confirmaciones:', error)
    return NextResponse.json(
      { error: 'Error al obtener confirmaciones' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombres, apellidos, acompanante, ninos_asisten } = body

    if (!nombres || !apellidos) {
      return NextResponse.json(
        { error: 'Nombres y apellidos son requeridos' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        'INSERT INTO confirmaciones (nombres, apellidos, acompanante, ninos_asisten) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombres, apellidos, acompanante || '', ninos_asisten || 0]
      )
      return NextResponse.json(result.rows[0], { status: 201 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error en POST /api/admin/confirmaciones:', error)
    return NextResponse.json(
      { error: 'Error al crear confirmación' },
      { status: 500 }
    )
  }
}
