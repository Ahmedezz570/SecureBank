import React from 'react'
import WelcomeNav from '@/components/Welcome/WelcomeNav'
import HeroContent from '@/components/Welcome/HeroContent';
const Welcome = () => {
  return (
    <>
    <div className="min-h-screen bg-blue-50 ">
    <WelcomeNav />
    <HeroContent />
    </div>
    </>
  )
}

export default Welcome;