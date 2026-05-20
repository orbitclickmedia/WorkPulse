import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WorkPulse — AI-First Enterprise Operational Intelligence',
  description: 'Unified async standups, AI insights, productivity tracking, and team health monitoring for modern enterprise teams.',
  openGraph: {
    title: 'WorkPulse',
    description: 'AI-first operational intelligence for modern teams',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
