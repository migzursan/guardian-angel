import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Bell, AlertCircle, CheckCircle2, MessageCircle, Clock } from "lucide-react";

interface NotificationScreenProps {
  onBack: () => void;
  userType: "patient" | "guardian";
}

export function NotificationScreen({ onBack, userType }: NotificationScreenProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: "Time for your medication",
      message: "Don't forget to take your 9:00 PM dose of Albuterol Inhaler",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Great job!",
      message: "You've maintained a 7-day streak. Keep up the excellent work!",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      type: "alert",
      title: "Missed dose reminder",
      message: "You haven't logged your morning medication yet",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "message",
      title: "Guardian Angel check-in",
      message: "Your Guardian Angel sent you a message of support",
      time: "3 days ago",
      read: true,
    },
    {
      id: 5,
      type: "reminder",
      title: "Morning medication",
      message: "Time to take your 9:00 AM dose",
      time: "4 days ago",
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-[24px] shadow-md">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[24px] font-semibold flex-1">Notifications</h1>
          <Bell className="w-6 h-6" />
        </div>
        {unreadCount > 0 && (
          <p className="text-primary-foreground/90">
            You have {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
          </p>
        )}
      </div>

      <div className="p-6 space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-5 rounded-[20px] shadow-md cursor-pointer transition-all ${
              !notification.read ? "border-2 border-primary/30 bg-primary/5" : ""
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === "alert"
                    ? "bg-accent/10"
                    : notification.type === "success"
                    ? "bg-success/10"
                    : notification.type === "message"
                    ? "bg-secondary"
                    : "bg-primary/10"
                }`}
              >
                {notification.type === "alert" && (
                  <AlertCircle className="w-6 h-6 text-accent" />
                )}
                {notification.type === "success" && (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
                {notification.type === "message" && (
                  <MessageCircle className="w-6 h-6 text-primary" />
                )}
                {notification.type === "reminder" && (
                  <Clock className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{notification.title}</h3>
                  {!notification.read && (
                    <Badge className="ml-2 bg-primary">New</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-2 leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-[20px] font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">
              We'll notify you about medication reminders and updates
            </p>
          </div>
        )}

        {notifications.length > 0 && (
          <Button
            onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
            variant="outline"
            className="w-full h-14 rounded-[20px] mt-4"
          >
            Mark All as Read
          </Button>
        )}
      </div>
    </div>
  );
}
