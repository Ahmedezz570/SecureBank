"use client";
import { useState } from "react";
import { ArrowRight, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import customersData from "@/data/customers.json";

const Transfer = () => {
  const customer = customersData[0];
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transferAmount = parseFloat(amount);
    
    if (!recipient || !amount || transferAmount <= 0) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    if (transferAmount > customer.balance) {
      toast.error("Insufficient balance");
      return;
    }

    // Simulate successful transfer
    toast.success("Transfer completed successfully!", {
      description: `$${transferAmount.toFixed(2)} sent to ${recipient}`,
    });

    // Reset form
    setAmount("");
    setRecipient("");
    setDescription("");
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transfer Funds</h1>
        <p className="text-muted-foreground">
          Send money securely to another account
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>New Transfer</CardTitle>
            <CardDescription>
              Enter recipient details and amount
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Account</Label>
                <Input
                  id="recipient"
                  placeholder="Enter account number or email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Available balance: ${customer.balance.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="What's this transfer for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <span>Transfer Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Your Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                  <CreditCard className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {customer.accountType}
                  </p>
                  <p className="font-mono text-sm font-medium">
                    {customer.accountNumber}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${customer.balance.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/50 bg-secondary/10 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Transfer Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily limit:</span>
                <span className="font-medium">$10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per transfer:</span>
                <span className="font-medium">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining today:</span>
                <span className="font-medium text-success">$10,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transfer;