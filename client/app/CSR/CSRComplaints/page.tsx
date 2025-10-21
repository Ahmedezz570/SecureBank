"use client";
import { AlertTriangle, Video, Copy, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useState } from "react";
import complaintsData from "@/data/complaints.json";

const CSRComplaints = () => {
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [currentMeetingLink, setCurrentMeetingLink] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComplaints = complaintsData.filter((complaint) =>
    complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEscalate = (complaintId: string) => {
    toast.success("Complaint escalated to admin", {
      description: `Complaint ${complaintId} has been escalated`,
    });
  };

  const handleScheduleMeeting = (customerName: string, complaintId: string) => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    const meetLink = `https://meet.google.com/${meetingId}`;
    setCurrentMeetingLink(meetLink);
    setCurrentCustomer(customerName);
    setMeetingDialogOpen(true);
    
    toast.success("Meeting link generated", {
      description: `Meeting scheduled for ${customerName}`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentMeetingLink);
    toast.success("Link copied to clipboard", {
      description: "You can now share it with the customer",
    });
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

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Complaints</h1>
        <p className="text-muted-foreground">
          Manage and resolve customer support tickets
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Complaints</CardTitle>
              <CardDescription>View and manage customer complaints</CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No complaints found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.id}</TableCell>
                      <TableCell>{complaint.customerName}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="space-y-1">
                          <p className="font-medium">{complaint.subject}</p>
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {complaint.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityVariant(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(complaint.status)}>
                          {complaint.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleScheduleMeeting(complaint.customerName, complaint.id)}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Meet
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEscalate(complaint.id)}
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Escalate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={meetingDialogOpen} onOpenChange={setMeetingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Google Meet Link Generated</DialogTitle>
            <DialogDescription>
              Meeting scheduled for {currentCustomer}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={currentMeetingLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link with the customer via email or chat.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CSRComplaints;