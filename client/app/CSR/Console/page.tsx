"use client"
import { StatCard } from '@/components/StatCard'
import React from 'react'
import { Phone, MessageSquare, Clock, User, AlertTriangle } from "lucide-react";
import { Card , CardTitle , CardDescription , CardHeader, CardContent} from '@/components/ui/card';
import { toast } from "sonner";
import callsData from "@/data/calls.json";
import complaintsData from "@/data/complaints.json";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
const Console = () => {
                    const activeCalls = callsData.filter((call)=>call.status === "active")
                     const recentCalls = callsData.filter((call) => call.status === "completed").slice(0, 5);
                     const openComplaints = complaintsData.filter(
    (c) => c.status === "open" || c.status === "in_progress"
  );
                      const handleEscalate = (complaintId: string) => {
    toast.success("Complaint escalated to admin", {
      description: `Complaint ${complaintId} has been escalated`,
    });
  };
  return (
      <div className='container mx-auto space-y-6 p-6'>
         <div>
                    <h1 className="text-3xl font-bold">CSR Console</h1>
                    <p>Manage customer calls and support tickets</p>
         </div>
         <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                    <StatCard  title="Calls Today"
          value={12}
          description="Total handled"
          icon={MessageSquare}
          variant="success"/>
          <StatCard
          title="Calls Today"
          value={120}
          description="Total handled"
          icon={MessageSquare}
          variant="success"
        />
        <StatCard
          title="Avg Duration"
          value={`5m 15s`}
          description="Per call"
          icon={Clock}
          variant="default"
        />
        <StatCard
          title="Open Tickets"
          value={30}
          description="Pending resolution"
          icon={AlertTriangle}
          variant="warning"
        />
         </div>

<div className='grid gap-6 lg:grid-cols-2'>
      <Card>
           <CardHeader>
            <CardTitle>Active Calls & Chats</CardTitle>
            <CardDescription>Currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
                    <div className='space-y-4'>
                        {activeCalls.length === 0 ? (
                         <p>No active calls or chats at the moment.</p>
                        ): (
                                          activeCalls.map((call) =>(
                                                      <div  key={call.id} className='flex items-center justify-between rounded-lg border p-4'>
                                                            <div className="flex items-center gap-4">
                                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        {call.type === "phone" ? (
                          <Phone className="h-6 w-6 text-primary" />
                        ) : (
                          <MessageSquare className="h-6 w-6 text-primary" />
                        )}
                      </div>
                       <div>
                        <p className="font-medium">{call.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {call.subject}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {call.type}
                        </Badge>
                      </div>
                                                            </div>
                                                            <Button size="sm">View</Button>
                                                      </div>      
                                          ))
                        ) }
                    </div>
          </CardContent>
       </Card >
                      <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Call History</CardTitle>
            <CardDescription>Completed calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{call.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {call.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {Math.floor(call.duration / 60)}m {call.duration % 60}s
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(call.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
</div>
<Card className="shadow-md">
        <CardHeader>
          <CardTitle>Pending Complaints</CardTitle>
          <CardDescription>Support tickets requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{complaint.subject}</p>
                    <Badge
                      variant={
                        complaint.priority === "high"
                          ? "destructive"
                          : complaint.priority === "medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {complaint.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {complaint.customerName} • {complaint.id}
                  </p>
                  <p className="text-sm">{complaint.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEscalate(complaint.id)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Escalate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
  )
}

export default Console