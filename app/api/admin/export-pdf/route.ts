import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const jsPDFModule = await import('jspdf')
    const jsPDF = jsPDFModule.default
    await import('jspdf-autotable')

    const client = await pool.connect()
    let confirmaciones: any[] = []
    try {
      const result = await client.query('SELECT * FROM confirmaciones ORDER BY created_at DESC')
      confirmaciones = result.rows
    } finally {
      client.release()
    }

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Lista de Asistencia - Cumpleaños Dianita', 14, 15)

    const tableData = confirmaciones.map(c => [
      `${c.nombres} ${c.apellidos}`,
      c.acompanante || '-',
      c.ninos_asisten.toString(),
    ])

    ;(doc as any).autoTable({
      head: [['Nombre y Apellido', 'Acompañante', 'Niños']],
      body: tableData,
      startY: 25,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [201, 163, 217], textColor: 255 },
    })

    const pdfBytes = doc.output('arraybuffer')
    const pdfBuffer = Buffer.from(pdfBytes)

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Listado_Asistencia_Dianita.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generando PDF:', error)
    return NextResponse.json(
      { error: 'Error al generar PDF', details: String(error) },
      { status: 500 }
    )
  }
}
