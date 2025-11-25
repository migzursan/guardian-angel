import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  Settings,
  Phone,
  Mail,
} from "lucide-react";

interface GuardianDashboardProps {
  guardianData: any;
  onNavigate: (screen: string) => void;
}

export function GuardianDashboard({ guardianData, onNavigate }: GuardianDashboardProps) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "missed",
      message: "Mary hasn't logged medication for 2 days",
      time: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      type: "reminder",
      message: "Evening dose reminder sent",
      time: "5 hours ago",
      status: "sent",
    },
    {
      id: 3,
      type: "success",
      message: "Mary logged morning dose on time",
      time: "Yesterday",
      status: "completed",
    },
  ]);

  const patientName = "Mary Johnson";
  const adherenceRate = 88;
  const missedDoses = 3;

  const handleCheckIn = () => {
    // Simulate sending a check-in message
    alert(
      `Check-in message sent to ${patientName}:\n\n"Hi Mary, just checking in! Don't forget to take your medication today. I'm here if you need anything. 💙"`
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-[24px] shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-[24px] font-semibold mb-1">
              Hello, {guardianData.name.split(" ")[0]}!
            </h1>
            <p className="text-primary-foreground/90">Guardian Angel Dashboard</p>
          </div>
          <button onClick={() => onNavigate("settings")}>
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Patient Card */}
        <Card className="bg-white p-5 rounded-[20px] shadow-md mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{patientName}</p>
                <p className="text-muted-foreground">Your Patient</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[24px] font-semibold text-primary">{adherenceRate}%</p>
              <p className="text-muted-foreground">Adherence</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Missed Doses Alert */}
        {missedDoses > 0 && (
          <Card className="p-6 rounded-[20px] shadow-md border-2 border-accent">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Attention Needed</h3>
                <p className="text-muted-foreground mb-4">
                  {patientName} has missed {missedDoses} doses in the past 7 days
                </p>
                <Button
                  onClick={handleCheckIn}
                  className="w-full h-12 rounded-[16px] bg-primary hover:bg-primary/90"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Check-In Message
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Contact */}
        <Card className="p-6 rounded-[20px] shadow-md">
          <h3 className="font-semibold mb-4">Quick Contact</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 rounded-[16px] justify-start"
              onClick={() => alert("Opening phone dialer...")}
            >
              <Phone className="w-5 h-5 mr-3 text-primary" />
              <span className="flex-1 text-left">Call Mary</span>
              <span className="text-muted-foreground">(555) 123-4567</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 rounded-[16px] justify-start"
              onClick={() => alert("Opening email...")}
            >
              <Mail className="w-5 h-5 mr-3 text-primary" />
              <span className="flex-1 text-left">Email Mary</span>
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-[20px] font-semibold">Recent Activity</h2>

          {alerts.map((alert) => (
            <Card key={alert.id} className="p-5 rounded-[20px] shadow-md">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.type === "missed"
                      ? "bg-accent/10"
                      : alert.type === "success"
                      ? "bg-success/10"
                      : "bg-primary/10"
                  }`}
                >
                  {alert.type === "missed" && (
                    <AlertCircle className="w-5 h-5 text-accent" />
                  )}
                  {alert.type === "success" && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                  {alert.type === "reminder" && (
                    <MessageCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{alert.message}</p>
                  <p className="text-muted-foreground">{alert.time}</p>
                </div>
                {alert.status === "active" && (
                  <Badge className="bg-accent text-accent-foreground">Active</Badge>
                )}
                {alert.status === "sent" && (
                  <Badge variant="outline">Sent</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Weekly Adherence */}
        <Card className="p-6 rounded-[20px] shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Weekly Adherence</h3>
              <span className="text-[24px] font-semibold text-primary">{adherenceRate}%</span>
            </div>
            <Progress value={adherenceRate} className="h-3" />
            <p className="text-muted-foreground">
              {adherenceRate >= 90
                ? `${patientName} is doing great this week!`
                : `${patientName} may need extra encouragement this week.`}
            </p>
          </div>
        </Card>

        {/* View All Notifications */}
        <Button
          onClick={() => onNavigate("notifications")}
          variant="outline"
          className="w-full h-14 rounded-[20px]"
        >
          View All Notifications
        </Button>
      </div>
    </div>
  );
}
