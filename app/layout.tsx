import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cumpleaños Dianita - 5 Años',
  description: 'Invitación interactiva al cumpleaños de Dianita con temática de La Sirenita',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
