import React from 'react'
import WelcomeNav from '@/components/Welcome/WelcomeNav'
export default function RootLayout({ children }) {
  return (
    <>
    <WelcomeNav />
    {children}
    </>
  )
}

