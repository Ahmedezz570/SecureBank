"use client";

import {Navbar} from "./NavBar";

export default function NavbarWrapper() {
  const handleRoleChange = (role: string) => {
    console.log("Role changed to:", role);
  };

  return (
    <Navbar
      currentRole="admin"
      onRoleChange={handleRoleChange}
      userName="Ahmed"
    />
  );
}
