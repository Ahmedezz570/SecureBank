import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import customersData from "@/data/customers.json";

const Dashboard = () => {
  // Using first customer as example
  const customer = customersData[0];

  const totalIncome = customer.transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = Math.abs(
    customer.transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {customer.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Here`s an overview of your account
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Current Balance"
          value={`$${customer.balance.toLocaleString()}`}
          description={`Account: ${customer.accountNumber}`}
          icon={Wallet}
          variant="default"
        />
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          description="This month"
          icon={TrendingUp}
          variant="success"
          trend={{ value: 12.5, label: "vs last month" }}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpense.toLocaleString()}`}
          description="This month"
          icon={TrendingUp}
          variant="warning"
          trend={{ value: -3.2, label: "vs last month" }}
        />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest account activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customer.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      transaction.type === "credit"
                        ? "bg-success/10"
                        : "bg-muted"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownRight className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "credit"
                        ? "text-success"
                        : "text-foreground"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : ""}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;