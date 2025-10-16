
export type UserRole = "customer" | "csr" | "admin";


export const getNavLinks = (currentRole: UserRole) => {
  switch (currentRole) {
    case "customer":
      return [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/transfer", label: "Transfer" },
        { to: "/complaints", label: "Support" },
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
