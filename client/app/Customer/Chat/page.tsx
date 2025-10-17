"use client";
import { useState } from "react";
import { MessageSquare, Plus, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatWindow } from "@/components/ChatWindow";
import { toast } from "sonner";
import chatsData from "@/data/chats.json";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Message {
  id: string;
  sender: "customer" | "csr";
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  customerId: string;
  customerName: string;
  csrId: string;
  csrName: string;
  status: string;
  startTime: string;
  lastMessage: string;
  messages: Message[];
}

const Chat = ({ userRole }: { userRole: string }) => {
   userRole = "customer"; 
  const isCustomer = userRole === "customer";
  
  // Filter chats based on role
  const userChats = isCustomer
    ? chatsData.filter((chat) => chat.customerId === "CUST001")
    : chatsData.filter((chat) => chat.status === "active");

  const [selectedChat, setSelectedChat] = useState<Chat | null>(
    userChats.length > 0 ? (userChats[0] as Chat) : null
  );

  const [chatMessages, setChatMessages] = useState<{ [key: string]: Message[] }>(
    Object.fromEntries(userChats.map((chat) => [chat.id, chat.messages as Message[]]))
  );

  const handleSendMessage = (message: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: `MSG${Date.now()}`,
      sender: isCustomer ? "customer" : "csr",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    toast.success("Message sent");
  };

  const handleStartNewChat = () => {
    toast.success("Starting new chat session", {
      description: "A CSR will be with you shortly",
    });
  };

  return (
    <div className="container mx-auto space-y-4 p-4 md:space-y-6 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {isCustomer ? "Support Chat" : "Active Chats"}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {isCustomer
              ? "Get help from our customer service team"
              : "Manage customer conversations"}
          </p>
        </div>
        {isCustomer && (
          <Button onClick={handleStartNewChat} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        )}
      </div>

      {/* Mobile View - Show chat list or selected chat */}
      <div className="lg:hidden">
        {selectedChat ? (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedChat(null)}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to conversations
            </Button>
            <ChatWindow
              chatId={selectedChat.id}
              customerName={selectedChat.customerName}
              csrName={selectedChat.csrName}
              messages={chatMessages[selectedChat.id] || []}
              userRole={isCustomer ? "customer" : "csr"}
              onSendMessage={handleSendMessage}
            />
          </div>
        ) : (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>
                {isCustomer ? "Your chat history" : "Active customer chats"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userChats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MessageSquare className="mb-2 h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      No conversations yet
                    </p>
                  </div>
                ) : (
                  userChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat as Chat)}
                      className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {isCustomer ? chat.csrName : chat.customerName}
                        </p>
                        <Badge
                          variant={
                            chat.status === "active" ? "default" : "secondary"
                          }
                        >
                          {chat.status}
                        </Badge>
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {chat.messages[chat.messages.length - 1]?.content ||
                          "No messages yet"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(chat.lastMessage).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop View - Side by side layout */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-3">
        <Card className="shadow-md lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>
              {isCustomer ? "Your chat history" : "Active customer chats"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {userChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No conversations yet
                  </p>
                </div>
              ) : (
                userChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat as Chat)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                      selectedChat?.id === chat.id
                        ? "border-primary bg-muted"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {isCustomer ? chat.csrName : chat.customerName}
                      </p>
                      <Badge
                        variant={
                          chat.status === "active" ? "default" : "secondary"
                        }
                      >
                        {chat.status}
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {chat.messages[chat.messages.length - 1]?.content ||
                        "No messages yet"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(chat.lastMessage).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {selectedChat ? (
            <ChatWindow
              chatId={selectedChat.id}
              customerName={selectedChat.customerName}
              csrName={selectedChat.csrName}
              messages={chatMessages[selectedChat.id] || []}
              userRole={isCustomer ? "customer" : "csr"}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <Card className="shadow-md">
              <CardContent className="flex h-[500px] items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a conversation to start chatting
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;