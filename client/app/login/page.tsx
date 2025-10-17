"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";


const Login = () => {
     const router = useRouter(); 
  const submit = () => {
    console.log("Submitted");
    router.push('/Customer/Dashboard');

  }
  return (
   <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center ">
          
          <Link href="/" className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
            <Building2 className="h-7 w-7 text-white" />
          </Link>
          
          <div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your SecureBank account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            {/* <div className="space-y-2">
              <Label htmlFor="role">Login as</Label>
              <Select  >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="csr">CSR Agent</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

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

            <Button type="submit" className="w-full cursor-pointer" onClick={submit}>
              Sign In
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don`t have an account?{" "}
              <Link href="/Register" className="font-medium text-primary hover:underline">
                Create account
              </Link>
            </p>

           
          </form>
        </CardContent>
      </Card>
    </div>
     
  )
}

export default Login