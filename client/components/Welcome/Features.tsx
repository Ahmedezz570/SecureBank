import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Users, TrendingUp, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Features = () => {
  return (
                    <>
   <section className='container mx-auto px-4 py-16'>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                              <Card className="bg-blue-900">
                               <CardHeader>
                                        <div className='flex h-12 w-12 items-center justify-center rounded-lg'>
                                                            <Shield className="h-6 w-6 text-white" />
                                                             
                                        </div>
                                        <CardTitle className='text-white'>Bank-Grade Security</CardTitle>
                                        <CardDescription>
                Your money and data protected with military-grade encryption and multi-factor authentication
              </CardDescription>
                               </CardHeader>
                              </Card>
                              <Card className="bg-blue-900">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className='text-white'>24/7 Support</CardTitle>
              <CardDescription>
                Dedicated customer service agents ready to assist you anytime, anywhere with real-time chat
              </CardDescription>
            </CardHeader>
          </Card>
           <Card className="bg-blue-900">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className='text-white'>Instant Transfers</CardTitle>
              <CardDescription>
                Send money instantly to anyone, anywhere with zero fees and real-time transaction tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-blue-900">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className='text-white'>Multi-Role Access</CardTitle>
              <CardDescription>
                Designed for customers, service agents, and administrators with role-based dashboards
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-blue-900">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className='text-white'>Privacy First</CardTitle>
              <CardDescription>
                Your financial data stays private. We never share your information with third parties
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-blue-900">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className='text-white'>Smart Analytics</CardTitle>
              <CardDescription>
                Track spending patterns, manage complaints, and get intelligent insights on your finances
              </CardDescription>
            </CardHeader>
          </Card>
                    </div>
   </section>


 <section className="container mx-auto px-4 py-16 ">
        <Card className="bg-blue-400 ">
          <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="text-3xl font-bold text-primary">
  Ready to Transform Your Banking Experience?
</h2>

            <p className="max-w-2xl text-lg text-black">
              Join thousands of satisfied customers who trust SecureBank for their financial needs
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/Register">Create Free Account</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      </>
  )


}

export default Features