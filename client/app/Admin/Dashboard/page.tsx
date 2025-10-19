import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from '@/components/StatCard';
import { Users, Phone, Clock, AlertCircle, TrendingUp  } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import csr from '@/data/csrs.json';
import callsData from '@/data/calls.json';
import { Badge } from '@/components/ui/badge';
const page = () => {
  return (
    <div className='container mx-auto space-y-6 p-6'>
                     <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of team performance and metrics
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={20}
          description="Active accounts"
          icon={Users}
          variant="default"
        />
        <StatCard
          title="Total Calls"
          value={20}
          description="Today"
          icon={Phone}
          variant="success"
          trend={{ value: 8.2, label: "vs yesterday" }}
        />
        <StatCard
          title="Avg Call Time"
          value={"5m 32s"}
          description="Across all CSRs"
          icon={Clock}
          variant="default"
        />
        <StatCard
          title="Escalated"
          value={1}
          description="Complaints"
          icon={AlertCircle}
          variant="warning"
        />
      </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>CSR Team Details</CardTitle>
                         <CardDescription>Complete agent information and call history</CardDescription>
                      </CardHeader>
                      <div>
                        <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CSR Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Calls</TableHead>
                  <TableHead>Recent Calls</TableHead>
                  <TableHead>Complaints</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                     {csr.map((csr) => {
                  const csrCalls = callsData.filter(call => call.csrId === csr.id);
                  return(
                    <TableRow key={csr.id}>
                      <TableCell>
                        <p className="font-medium">{csr.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{csr.email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{csr.totalCalls}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className='space-y-1'>
                          {csrCalls.slice(0, 2).map((call) => (
                            <div key={call.id} className="text-xs">
                              <p className="font-medium">{call.customerName}</p>
                              <p className="text-muted-foreground">{call.subject}</p>
                            </div>
                          ))}
                          {csrCalls.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{csrCalls.length - 2} more
                            </p>
                          )}
                        </div>
                      </TableCell>
                       <TableCell>
                        <div className="flex flex-col gap-1">
                          <span>{csr.complaintsHandled}</span>
                          <span className="text-xs text-destructive">
                            {csr.escalatedComplaints} escalated
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-success" />
                          <span>{csr.satisfactionRating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={csr.status === "Available" ? "default" : "secondary"}>
                          {csr.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                  })}
              </TableBody>
                        </Table>
                      </div>
                    </Card>
                    </div>
  )
}

export default page