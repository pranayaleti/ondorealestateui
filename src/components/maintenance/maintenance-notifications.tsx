import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Wrench, AlertTriangle, Calendar, CheckCircle2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  type: "ticket" | "urgent" | "update" | "schedule"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high" | "urgent"
  actionUrl?: string
  actionLabel?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "Urgent Maintenance Request",
    message: "Emergency repair needed at 123 Oak St - leaking pipe",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    priority: "urgent",
    actionUrl: "/maintenance/tickets",
    actionLabel: "View Ticket"
  },
  {
    id: "2",
    type: "ticket",
    title: "New Ticket Assigned",
    message: "You've been assigned a new maintenance ticket",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    priority: "high",
    actionUrl: "/maintenance/tickets",
    actionLabel: "View Ticket"
  },
  {
    id: "3",
    type: "update",
    title: "Ticket Status Updated",
    message: "Ticket #1234 status changed to 'In Progress'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    priority: "low",
    actionUrl: "/maintenance/tickets",
    actionLabel: "View Ticket"
  },
  {
    id: "4",
    type: "schedule",
    title: "Scheduled Maintenance",
    message: "You have a scheduled maintenance appointment tomorrow at 10 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: false,
    priority: "medium",
    actionUrl: "/maintenance/calendar",
    actionLabel: "View Calendar"
  }
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "ticket":
      return <Wrench className="h-5 w-5 text-orange-500" />
    case "urgent":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "update":
      return <Bell className="h-5 w-5 text-blue-500" />
    case "schedule":
      return <Calendar className="h-5 w-5 text-purple-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

const getPriorityColor = (priority: Notification["priority"]) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500 text-white"
    case "high":
      return "bg-orange-500 text-white"
    case "medium":
      return "bg-yellow-500 text-white"
    case "low":
      return "bg-blue-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function MaintenanceNotifications() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "tickets" | "urgent" | "schedule">("all")

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "tickets") return notification.type === "ticket" || notification.type === "update"
    if (activeTab === "urgent") return notification.type === "urgent"
    if (activeTab === "schedule") return notification.type === "schedule"
    return true
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))
    toast({ title: "Notification marked as read" })
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast({ title: "All notifications marked as read" })
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    toast({ title: "Notification deleted" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-orange-400" />
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Maintenance ticket updates and alerts</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">Mark All as Read</Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="relative">
            All {notifications.length > 0 && <Badge variant="secondary" className="ml-2">{notifications.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Unread {unreadCount > 0 && <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-sm text-gray-500">
                  {activeTab === "unread" ? "You're all caught up!" : `No ${activeTab === "all" ? "" : activeTab} notifications.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${
                  !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${!notification.read ? "text-blue-900 dark:text-blue-100" : ""}`}>
                              {notification.title}
                            </h3>
                            <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)} className="h-8 w-8 p-0">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)} className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {notification.actionUrl && notification.actionLabel && (
                        <Button size="sm" variant="outline" onClick={() => { markAsRead(notification.id); window.location.href = notification.actionUrl! }} className="mt-3">
                          {notification.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

