"use client";
import { Building2, UserCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import  {usePathname}  from "next/navigation";

// import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  currentRole: "customer" | "csr" | "admin";
  onRoleChange: (role: "customer" | "csr" | "admin") => void;
  userName?: string;
}

export const Navbar = ({ currentRole, onRoleChange, userName }: NavbarProps) => {
  const pathname  = usePathname();

  const getNavLinks = () => {
    switch (currentRole) {
      case "customer":
        return [
          { to: "/Customer/Dashboard", label: "Dashboard" },
          { to: "/Customer/Transfer", label: "Transfer" },
          { to: "/Customer/Support", label: "Support" },
          { to: "/Customer/Chat", label: "Chat" },
        ];
      case "csr":
        return [
          { to: "/csr", label: "Console" },
          { to: "/csr/history", label: "History" },
        ];
      case "admin":
        return [
          { to: "/admin", label: "Dashboard" },
          { to: "/admin/csrs", label: "CSR Team" },
          { to: "/admin/reports", label: "Reports" },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link key={link.to} href={link.to}>
          <Button
            variant={pathname === link.to ? "secondary" : "ghost"}
            className="w-full justify-start md:w-auto"
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            {/* <Link href="/" className="flex items-center gap-2"> */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className=" font-bold text-foreground sm:inline-block">
                SecureBank
              </span>
            {/* </Link> */}

            <div className="hidden md:flex md:gap-2">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            
            {/* <Select value={currentRole} onValueChange={onRoleChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="csr">CSR Agent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hidden md:flex">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentRole === "customer" ? "Personal Account" : currentRole === "csr" ? "CSR Agent" : "Administrator"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Account Security</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6 flex flex-col gap-4">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
