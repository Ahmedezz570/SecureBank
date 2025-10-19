
export interface Account {
  id: string;
  accountNumber: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
  userId: string; 
  transactions?: Transaction[]; 
}



// 👤 User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
  accountNumber?: number;
  type: "customer" | "csr" | "admin";
  supportTickets?: SupportTicket[];
}


export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
  fromAccountId?: string; 
  toAccountId?: string;   
  accountId?: string;     
  description?: string;
}


export interface SupportTicket {
  id: string;
  userId: string; 
  csrId?: string; 
  subject: string; 
  message: string; 
  response?: string; 
  status: "open" | "in_progress" | "resolved" | "closed"; 
  createdAt: string;
  updatedAt: string;
}
