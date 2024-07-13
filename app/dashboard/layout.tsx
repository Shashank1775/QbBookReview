import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Nav from '@/components/dashboard/navbar'

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}