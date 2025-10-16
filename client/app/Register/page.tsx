import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Register = () => {
  return (
  <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </Link>
          <div>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join SecureBank and start managing your finances
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                
                required
              />
            </div>

            

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              
                required
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>

            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register