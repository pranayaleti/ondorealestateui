"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, MessageSquare, Search, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UnderMaintenance } from "@/components/ui/under-maintenance"

// Mock data for messages
const messages = [
  {
    id: 1,
    sender: "Property Manager",
    avatar: "/professional-woman-smiling.png",
    subject: "Upcoming Maintenance Visit",
    preview: "We will be conducting routine maintenance checks next week...",
    date: "2023-06-10T14:30:00",
    read: true,
    conversation: [
      {
        id: 1,
        sender: "Property Manager",
        avatar: "/professional-woman-smiling.png",
        content:
          "We will be conducting routine maintenance checks next week on Tuesday between 10 AM and 2 PM. Please let us know if this time works for you or if you need to reschedule.",
        timestamp: "2023-06-10T14:30:00",
        isOwn: false,
      },
    ],
  },
  {
    id: 2,
    sender: "System Notification",
    avatar: "",
    subject: "Rent Payment Confirmation",
    preview: "Your rent payment for June 2023 has been received...",
    date: "2023-06-01T09:15:00",
    read: true,
    conversation: [
      {
        id: 1,
        sender: "System Notification",
        avatar: "",
        content: "Your rent payment for June 2023 has been received and processed. Thank you for your prompt payment.",
        timestamp: "2023-06-01T09:15:00",
        isOwn: false,
      },
    ],
  },
  {
    id: 3,
    sender: "Property Manager",
    avatar: "/professional-woman-smiling.png",
    subject: "Community Event Invitation",
    preview: "You are invited to our summer community barbecue...",
    date: "2023-05-25T11:45:00",
    read: false,
    conversation: [
      {
        id: 1,
        sender: "Property Manager",
        avatar: "/professional-woman-smiling.png",
        content:
          "You are invited to our summer community barbecue on Saturday, June 15th from 4 PM to 8 PM in the central courtyard. Food and drinks will be provided. We hope to see you there!",
        timestamp: "2023-05-25T11:45:00",
        isOwn: false,
      },
    ],
  },
  {
    id: 4,
    sender: "Maintenance Team",
    avatar: "/professional-man-suit.png",
    subject: "Maintenance Request Update",
    preview: "Your maintenance request #1234 has been completed...",
    date: "2023-05-20T16:20:00",
    read: true,
    conversation: [
      {
        id: 1,
        sender: "Maintenance Team",
        avatar: "/professional-man-suit.png",
        content:
          "Your maintenance request #1234 regarding the leaking faucet has been completed. Please let us know if you have any further issues.",
        timestamp: "2023-05-20T16:20:00",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        avatar: "",
        content: "Thank you for the quick response. The faucet is working perfectly now.",
        timestamp: "2023-05-20T17:05:00",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Maintenance Team",
        avatar: "/professional-man-suit.png",
        content: "You're welcome! We're glad we could help. Don't hesitate to reach out if you need anything else.",
        timestamp: "2023-05-20T17:30:00",
        isOwn: false,
      },
    ],
  },
]

export default function TenantMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [messageContent, setMessageContent] = useState("")
  const [composeDialogOpen, setComposeDialogOpen] = useState(false)
  const [newMessageSubject, setNewMessageSubject] = useState("")
  const [newMessageContent, setNewMessageContent] = useState("")
  const [newMessageRecipient, setNewMessageRecipient] = useState("")

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays < 7) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      return days[date.getDay()]
    } else {
      return date.toLocaleDateString()
    }
  }

  const handleSendMessage = () => {
    if (!messageContent.trim()) return

    // In a real app, you would send this to your API
    console.log("Sending message:", messageContent)

    // For demo purposes, we'll just add it to the conversation locally
    if (selectedMessage) {
      const updatedMessages = messages.map((msg) => {
        if (msg.id === selectedMessage.id) {
          return {
            ...msg,
            conversation: [
              ...msg.conversation,
              {
                id: msg.conversation.length + 1,
                sender: "You",
                avatar: "",
                content: messageContent,
                timestamp: new Date().toISOString(),
                isOwn: true,
              },
            ],
          }
        }
        return msg
      })

      // Update the selected message with the new conversation
      const updatedSelectedMessage = updatedMessages.find((msg) => msg.id === selectedMessage.id)
      setSelectedMessage(updatedSelectedMessage)

      // Clear the message input
      setMessageContent("")
    }
  }

  const handleComposeMessage = () => {
    if (!newMessageSubject.trim() || !newMessageContent.trim() || !newMessageRecipient) return

    // In a real app, you would send this to your API
    console.log("Composing message:", {
      recipient: newMessageRecipient,
      subject: newMessageSubject,
      content: newMessageContent,
    })

    // Close the dialog and reset form
    setComposeDialogOpen(false)
    setNewMessageSubject("")
    setNewMessageContent("")
    setNewMessageRecipient("")
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/tenant">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Messages</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={composeDialogOpen} onOpenChange={setComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
                <DialogDescription>
                  Compose a new message to send to your property manager or maintenance team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <Select value={newMessageRecipient} onValueChange={setNewMessageRecipient}>
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property-manager">Property Manager</SelectItem>
                      <SelectItem value="maintenance">Maintenance Team</SelectItem>
                      <SelectItem value="billing">Billing Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter message subject"
                    value={newMessageSubject}
                    onChange={(e) => setNewMessageSubject(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here"
                    rows={5}
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                  />
                </div>
                <div className="bg-amber-50 p-3 rounded-md flex items-start gap-2 border border-amber-200">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Feature in Development</p>
                    <p className="text-xs text-amber-700">
                      Messaging functionality is currently being developed. This form is for demonstration purposes
                      only.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setComposeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleComposeMessage}>Send Message</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Inbox</CardTitle>
              <CardDescription>
                {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-2">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id ? "bg-muted" : "hover:bg-muted/50"
                        } ${!message.read ? "border-primary" : ""}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {message.avatar ? (
                              <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                            ) : (
                              <AvatarFallback>
                                {message.sender
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className={`font-medium truncate ${!message.read ? "font-semibold" : ""}`}>
                                {message.sender}
                              </p>
                              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                {formatDate(message.date)}
                              </span>
                            </div>
                            <p className="text-sm font-medium truncate">{message.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.preview}</p>
                          </div>
                        </div>
                        {!message.read && (
                          <div className="flex justify-end mt-1">
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No messages found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? `No messages matching "${searchQuery}"` : "Your inbox is empty."}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="unread" className="space-y-2">
                  {filteredMessages.filter((m) => !m.read).length > 0 ? (
                    filteredMessages
                      .filter((m) => !m.read)
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors border-primary ${
                            selectedMessage?.id === message.id ? "bg-muted" : "hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              {message.avatar ? (
                                <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                              ) : (
                                <AvatarFallback>
                                  {message.sender
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className="font-semibold truncate">{message.sender}</p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {formatDate(message.date)}
                                </span>
                              </div>
                              <p className="text-sm font-medium truncate">{message.subject}</p>
                              <p className="text-xs text-muted-foreground truncate">{message.preview}</p>
                            </div>
                          </div>
                          <div className="flex justify-end mt-1">
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No unread messages</h3>
                      <p className="text-muted-foreground">You've read all your messages.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription>Conversation with {selectedMessage.sender}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)}>
                    Back to Inbox
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMessage.conversation.map((msg: any) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {!msg.isOwn && (
                          <Avatar className="h-6 w-6">
                            {msg.avatar ? (
                              <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.sender} />
                            ) : (
                              <AvatarFallback>
                                {msg.sender
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        )}
                        <span className="text-xs font-medium">{msg.isOwn ? "You" : msg.sender}</span>
                        <span className="text-xs opacity-70">{new Date(msg.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t mt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your reply..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!messageContent.trim()}>
                      Send
                    </Button>
                  </div>
                  <div className="mt-2 bg-amber-50 p-2 rounded-md flex items-start gap-2 border border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      Messaging functionality is in development. Your messages won't be saved permanently.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <UnderMaintenance
              title="Select a Message"
              description="Select a message from your inbox to view the conversation."
              showHomeButton={false}
              showBackButton={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
