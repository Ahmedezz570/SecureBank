"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Building2, Shield, Calendar, Edit } from "lucide-react";
import { toast } from "sonner";

interface ProfileProps {
  role: "customer" | "csr" | "admin";
  userName: string;
}

const Profile = ({ role, userName }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userName + " Smith",
    email: `${(userName ?? "user").toLowerCase()}@securebank.com`,
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    accountNumber: role?.toLowerCase() === "customer"
  ? "ACC-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  : "N/A",

    department: role === "csr" ? "Customer Support" : role === "admin" ? "Administration" : "Personal Banking",
    joinDate: "January 15, 2023",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const getRoleBadge = () => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500 hover:bg-red-600">Administrator</Badge>;
      case "csr":
        return <Badge className="bg-blue-500 hover:bg-blue-600">CSR Agent</Badge>;
      default:
        return <Badge className="bg-green-500 hover:bg-green-600">Customer</Badge>;
    }
  };

const getInitials = () => {
  if (!userName || userName.length === 0) return "??";
  return userName.substring(0, 2).toUpperCase();
};


  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        {getRoleBadge()}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-gradient-primary text-2xl text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{formData.fullName}</CardTitle>
                <CardDescription>{formData.email}</CardDescription>
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              <Edit className="mr-2 h-4 w-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {role === "customer" ? "Account Type" : "Department"}
              </Label>
              <Input
                id="department"
                value={formData.department}
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            {role === "customer" && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Account Number
                </div>
                <div className="mt-1 font-mono text-lg font-semibold">{formData.accountNumber}</div>
              </div>
            )}

            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Member Since
              </div>
              <div className="mt-1 text-lg font-semibold">{formData.joinDate}</div>
            </div>
          </div>

          {role === "csr" && (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">Performance Metrics</h3>
                <div className="grid gap-3 text-sm md:grid-cols-3">
                  <div>
                    <span className="text-muted-foreground">Total Calls:</span>
                    <span className="ml-2 font-bold">342</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg Duration:</span>
                    <span className="ml-2 font-bold">8.5 min</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Satisfaction:</span>
                    <span className="ml-2 font-bold">4.8/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {role === "admin" && (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">Admin Privileges</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Full system access and management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>CSR team oversight and analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Complaint escalation handling</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            View Login History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;