"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Send, Paperclip, Phone, Video, MoreVertical, Building, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NewMessageDialog } from "@/components/owner/new-message-dialog"
import { useToast } from "@/hooks/use-toast"

// Mock conversations data
const CONVERSATIONS = [
  {
    id: "conv1",
    recipient: {
      id: "user1",
      name: "John Smith",
      avatar: "/placeholder.svg?key=9xqre",
      role: "tenant",
      property: "123 Main Street, Unit 1",
    },
    lastMessage: {
      content: "Yes, I'll be available for the maintenance visit tomorrow between 2-4pm.",
      timestamp: "2023-05-15T14:30:00",
      sender: "user1",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv2",
    recipient: {
      id: "user2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?key=1g942",
      role: "tenant",
      property: "123 Main Street, Unit 2",
    },
    lastMessage: {
      content: "I've submitted the rent payment for this month. Please confirm when received.",
      timestamp: "2023-05-14T09:15:00",
      sender: "user2",
      read: false,
    },
    unreadCount: 2,
  },
  {
    id: "conv3",
    recipient: {
      id: "user3",
      name: "Michael Brown",
      avatar: "/placeholder.svg?key=3m7yt",
      role: "tenant",
      property: "456 Oak Avenue",
    },
    lastMessage: {
      content: "When will the new refrigerator be delivered?",
      timestamp: "2023-05-13T16:45:00",
      sender: "user3",
      read: false,
    },
    unreadCount: 1,
  },
  {
    id: "conv4",
    recipient: {
      id: "user4",
      name: "Quick Fix Plumbing",
      avatar: "/placeholder.svg?key=7p9qs",
      role: "vendor",
      property: "Multiple Properties",
    },
    lastMessage: {
      content: "We've scheduled the plumbing inspection for next Tuesday at 10am.",
      timestamp: "2023-05-12T11:20:00",
      sender: "user4",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv5",
    recipient: {
      id: "user5",
      name: "Elite Electric",
      avatar: "/placeholder.svg?key=2k8lp",
      role: "vendor",
      property: "123 Main Street",
    },
    lastMessage: {
      content: "The electrical work has been completed. Here's the invoice for your records.",
      timestamp: "2023-05-10T15:30:00",
      sender: "user5",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv6",
    recipient: {
      id: "user6",
      name: "Emily Wilson",
      avatar: "/placeholder.svg?key=5r3tv",
      role: "tenant",
      property: "456 Oak Avenue, Unit 2",
    },
    lastMessage: {
      content: "I'm interested in renewing my lease. Can we discuss the terms?",
      timestamp: "2023-05-08T10:15:00",
      sender: "user6",
      read: true,
    },
    unreadCount: 0,
  },
]

// Mock messages for a conversation
const MESSAGES = {
  conv1: [
    {
      id: "msg1",
      content:
        "Hello John, I wanted to let you know that we've scheduled a maintenance visit for your unit tomorrow between 2-4pm. Will you be available?",
      timestamp: "2023-05-15T14:15:00",
      sender: "owner",
      read: true,
    },
    {
      id: "msg2",
      content: "Yes, I'll be available for the maintenance visit tomorrow between 2-4pm.",
      timestamp: "2023-05-15T14:30:00",
      sender: "user1",
      read: true,
    },
  ],
  conv2: [
    {
      id: "msg3",
      content: "Hi Sarah, just a reminder that rent is due on the 1st of the month.",
      timestamp: "2023-05-01T09:00:00",
      sender: "owner",
      read: true,
    },
    {
      id: "msg4",
      content: "Thanks for the reminder! I'll make the payment today.",
      timestamp: "2023-05-01T10:30:00",
      sender: "user2",
      read: true,
    },
    {
      id: "msg5",
      content: "I've submitted the rent payment for this month. Please confirm when received.",
      timestamp: "2023-05-14T09:15:00",
      sender: "user2",
      read: false,
    },
    {
      id: "msg6",
      content: "I'll check with the bank and confirm once it's received. Thank you!",
      timestamp: "2023-05-14T10:20:00",
      sender: "owner",
      read: true,
    },
  ],
  conv3: [
    {
      id: "msg7",
      content: "Hello, I noticed the refrigerator isn't cooling properly. Can we get it fixed or replaced?",
      timestamp: "2023-05-12T11:30:00",
      sender: "user3",
      read: true,
    },
    {
      id: "msg8",
      content: "I'll send someone to take a look at it tomorrow. If it can't be repaired, we'll order a new one.",
      timestamp: "2023-05-12T13:45:00",
      sender: "owner",
      read: true,
    },
    {
      id: "msg9",
      content: "The technician came by and said it needs to be replaced. Have you ordered a new one?",
      timestamp: "2023-05-13T15:20:00",
      sender: "user3",
      read: true,
    },
    {
      id: "msg10",
      content: "When will the new refrigerator be delivered?",
      timestamp: "2023-05-13T16:45:00",
      sender: "user3",
      read: false,
    },
  ],
}

export function MessagesView() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [messages, setMessages] = useState(MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Filter conversations based on search term and active tab
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "tenants") return matchesSearch && conversation.recipient.role === "tenant"
    if (activeTab === "vendors") return matchesSearch && conversation.recipient.role === "vendor"
    if (activeTab === "unread") return matchesSearch && conversation.unreadCount > 0

    return matchesSearch
  })

  // Scroll to bottom of messages when a conversation is selected or new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation, messages])

  // Mark messages as read when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, this would call an API to mark messages as read
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation
            ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, read: true } }
            : conv,
        ),
      )
    }
  }, [selectedConversation])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    // In a real app, this would call an API to send the message
    const newMsg = {
      id: `msg${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: "owner",
      read: true,
    }

    // Add message to conversation
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedConversation]: [...(prevMessages[selectedConversation as keyof typeof prevMessages] || []), newMsg],
    }))

    // Update last message in conversation list
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                content: newMessage,
                timestamp: new Date().toISOString(),
                sender: "owner",
                read: true,
              },
            }
          : conv,
      ),
    )

    setNewMessage("")
  }

  const handleCreateConversation = (data: any) => {
    // In a real app, this would call an API to create a new conversation
    const newConversation = {
      id: `conv${conversations.length + 1}`,
      recipient: {
        id: `user${conversations.length + 1}`,
        name: data.recipient,
        avatar: "/placeholder.svg?key=new-user",
        role: data.recipientType,
        property: data.property,
      },
      lastMessage: {
        content: data.message,
        timestamp: new Date().toISOString(),
        sender: "owner",
        read: true,
      },
      unreadCount: 0,
    }

    setConversations([newConversation, ...conversations])

    // Add initial message to conversation
    setMessages((prevMessages) => ({
      ...prevMessages,
      [newConversation.id]: [
        {
          id: `msg${Date.now()}`,
          content: data.message,
          timestamp: new Date().toISOString(),
          sender: "owner",
          read: true,
        },
      ],
    }))

    // Select the new conversation
    setSelectedConversation(newConversation.id)

    toast({
      title: "Message sent",
      description: `Your message has been sent to ${data.recipient}.`,
    })
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "long" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Conversations</CardTitle>
              <NewMessageDialog onCreateConversation={handleCreateConversation} />
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-2 mx-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No conversations found</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {searchTerm
                      ? "Try adjusting your search"
                      : activeTab === "unread"
                        ? "You have no unread messages"
                        : "Start a new conversation"}
                  </p>
                  <NewMessageDialog onCreateConversation={handleCreateConversation} />
                </div>
              ) : (
                <div>
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer ${
                        selectedConversation === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversation.recipient.avatar || "/placeholder.svg"}
                          alt={conversation.recipient.name}
                        />
                        <AvatarFallback>{conversation.recipient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">{conversation.recipient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatTimestamp(conversation.lastMessage.timestamp)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.sender === "owner" ? "You: " : ""}
                            {conversation.lastMessage.content}
                          </div>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        {selectedConversation ? (
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        conversations.find((c) => c.id === selectedConversation)?.recipient.avatar || "/placeholder.svg"
                      }
                      alt={conversations.find((c) => c.id === selectedConversation)?.recipient.name || "User"}
                    />
                    <AvatarFallback>
                      {(conversations.find((c) => c.id === selectedConversation)?.recipient.name || "U").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {conversations.find((c) => c.id === selectedConversation)?.recipient.name}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs font-normal rounded-sm h-5 px-1 mr-2 capitalize">
                        {conversations.find((c) => c.id === selectedConversation)?.recipient.role}
                      </Badge>
                      <Building className="h-3 w-3 mr-1" />
                      {conversations.find((c) => c.id === selectedConversation)?.recipient.property}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Video Call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuItem>View Contact Info</DropdownMenuItem>
                      <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Conversation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-350px)] p-4">
                <div className="space-y-4">
                  {messages[selectedConversation as keyof typeof messages]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "owner" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "owner"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs mt-1 opacity-70 flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" title="Attach File">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  placeholder="Type your message..."
                  className="flex-1 min-h-[40px] resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" disabled={!newMessage.trim()} onClick={handleSendMessage} title="Send Message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center h-full py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-6" />
            <h2 className="text-xl font-medium mb-2">No Conversation Selected</h2>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Select a conversation from the list or start a new one to begin messaging.
            </p>
            <NewMessageDialog onCreateConversation={handleCreateConversation} />
          </Card>
        )}
      </div>
    </div>
  )
}
