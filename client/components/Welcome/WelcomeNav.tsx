import React from 'react'
import { Building2, Shield, Users, TrendingUp, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Welcome = () => {
  return (
    
        <header className='container  mx-auto px-4 py-6'>
              <nav className='flex items-center justify-between'>
                {/* icon and title */}
                <div className='flex items-center gap-2'>
                  {/* Icon and this Div */}
                  <div className='bg-blue-600 h-12 w-12 flex items-center justify-center rounded-xl'>
                    <Link href="/">
                   <Building2 className='text-white h-6 w-7'/>
                   </Link>
                   </div>
                   {/* Title */}
                   <Link href="/">
                   <span className='text-2xl font-bold text-foreground'>SecureBank</span>
                   </Link>
                </div>
                {/* Navigation Links */}
                <div className='flex items-center gap-3'>
                  <Button variant="outline">
                    <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
              <Link href="/Register">Get Started</Link>
            </Button>
                </div>
              </nav>
        </header>
  )
}

export default Welcome