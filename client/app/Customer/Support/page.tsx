"use client";
import { useState } from "react";
import { MessageSquare, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import complaintsData from "@/data/complaints.json";
import customersData from "@/data/customers.json";

const Complaints = () => {
  const customer = customersData[0];
  const myComplaints = complaintsData.filter((c) => c.customerId === customer.id);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Complaint submitted successfully!", {
      description: "Our team will review it shortly",
    });

    setSubject("");
    setDescription("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "escalated":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "resolved":
        return "default";
      case "in_progress":
        return "secondary";
      case "escalated":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Support</h1>
        <p className="text-muted-foreground">
          Submit a complaint or track existing ones
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Submit New Complaint</CardTitle>
            <CardDescription>
              Tell us about your issue and we`ll help resolve it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your complaint"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Submit Complaint
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Your Complaints</CardTitle>
            <CardDescription>Track your support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myComplaints.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No complaints yet
                </p>
              ) : (
                myComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="space-y-2 rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{complaint.subject}</p>
                      {getStatusIcon(complaint.status)}
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {complaint.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(complaint.status)}>
                        {complaint.status.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Complaints;
