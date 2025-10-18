import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from '@/components/StatCard';
import { Users, Phone, Clock, AlertCircle, TrendingUp } from "lucide-react";
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
                    
                    
                    </div>
  )
}

export default page