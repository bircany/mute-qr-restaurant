import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mute. | Yeni Nesil Ocakbaşı & Meyhane',
  description: 'Ateşin sıcaklığı, lezzetin zarafeti. Mute - modern ocakbaşı deneyimi.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="bg-elegant-dark min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  )
}

