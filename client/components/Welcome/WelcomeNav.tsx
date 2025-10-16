"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import { Building2, Shield, Users, TrendingUp, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Welcome = () => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    
        <div className={`container mx-auto px-4 py-6`}>
              <nav className={`flex items-center justify-between `}>
                {/* icon and title */}
                <div className='flex items-center gap-2'>
                  {/* Icon and this Div */}
                  <div className='bg-blue-600 h-10 w-10 flex items-center justify-center rounded-xl'>
                    <Link href="/">
                   <Building2 className='text-white h-6 w-7'/>
                   </Link>
                   </div>
                   {/* Title */}
                   <Link href="/">
                   <span className='text-xl font-bold text-foreground'>SecureBank</span>
                   </Link>
                </div>
                {/* Navigation Links */}
                <div className='flex items-center gap-3'>
                  <Button variant="outline">
                    <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
              <Link href="/Register">Started</Link>
            </Button>
                </div>
              </nav>
        </div>
  )
}

export default Welcome