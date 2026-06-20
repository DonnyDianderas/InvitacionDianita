import { NextRequest, NextResponse } from 'next/server'
import { saveConfirmacion, initializeDatabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Inicializar la base de datos si no existe
    await initializeDatabase()

    const body = await request.json()
    const { nombres, apellidos, acompanante, ninos_asisten } = body

    // Validación básica
    if (!nombres || !apellidos) {
      return NextResponse.json(
        { error: 'Nombres y apellidos son requeridos' },
        { status: 400 }
      )
    }

    const confirmacion = await saveConfirmacion({
      nombres,
      apellidos,
      acompanante: acompanante || '',
      ninos_asisten: ninos_asisten || 0,
    })

    return NextResponse.json(confirmacion, { status: 201 })
  } catch (error) {
    console.error('Error en POST /api/rsvp/confirm:', error)
    return NextResponse.json(
      { error: 'Error al guardar confirmación' },
      { status: 500 }
    )
  }
}
