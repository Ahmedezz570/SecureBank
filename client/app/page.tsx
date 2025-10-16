import React from 'react'
import WelcomeNav from '@/components/Welcome/WelcomeNav'
import HeroContent from '@/components/Welcome/HeroContent';
import Features from '@/components/Welcome/Features';
const Welcome = () => {
  return (
    <>
    <div className="min-h-screen bg-blue-50 ">
    <WelcomeNav />
    <HeroContent />
    <Features />
    </div>
    </>
  )
}

export default Welcome;