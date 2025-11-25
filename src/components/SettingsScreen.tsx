import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Lock,
  LogOut,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

interface SettingsScreenProps {
  onBack: () => void;
  userData: any;
  userType: "patient" | "guardian";
  onLogout: () => void;
}

export function SettingsScreen({ onBack, userData, userType, onLogout }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [codeCopied, setCodeCopied] = useState(false);

  const connectionCode = "MARY-2024";

  const copyCode = () => {
    navigator.clipboard.writeText(connectionCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-[24px] shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[24px] font-semibold">Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <div className="space-y-3">
          <h2 className="text-[18px] font-semibold text-muted-foreground">PROFILE</h2>
          <Card className="p-6 rounded-[20px] shadow-md">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                {userType === "patient" ? (
                  <User className="w-8 h-8 text-primary" />
                ) : (
                  <Shield className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold text-[20px]">{userData.name}</p>
                <p className="text-muted-foreground">
                  {userType === "patient" ? "Patient" : "Guardian Angel"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={userData.email}
                  disabled
                  className="h-12 rounded-[16px] bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={userData.phone}
                  disabled
                  className="h-12 rounded-[16px] bg-muted"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Connection Code (Patient Only) */}
        {userType === "patient" && (
          <div className="space-y-3">
            <h2 className="text-[18px] font-semibold text-muted-foreground">
              GUARDIAN ANGEL
            </h2>
            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Your Connection Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={connectionCode}
                      disabled
                      className="h-14 rounded-[16px] text-[20px] text-center tracking-wider font-semibold"
                    />
                    <Button
                      onClick={copyCode}
                      className="h-14 w-14 rounded-[16px] flex-shrink-0"
                      variant={codeCopied ? "default" : "outline"}
                    >
                      {codeCopied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Share this code with your Guardian Angel to connect
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold">Guardian Angel Connected</p>
                    <p className="text-muted-foreground">
                      {userData.guardianName || "No guardian connected"}
                    </p>
                  </div>
                  {userData.guardianName && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Notifications */}
        <div className="space-y-3">
          <h2 className="text-[18px] font-semibold text-muted-foreground">
            NOTIFICATIONS
          </h2>
          <Card className="p-6 rounded-[20px] shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Push Notifications</p>
                  <p className="text-muted-foreground">Get app notifications</p>
                </div>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Email Alerts</p>
                <p className="text-muted-foreground">Receive email reminders</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">SMS Alerts</p>
                <p className="text-muted-foreground">Receive text messages</p>
              </div>
              <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
            </div>
          </Card>
        </div>

        {/* Privacy & Security */}
        <div className="space-y-3">
          <h2 className="text-[18px] font-semibold text-muted-foreground">
            PRIVACY & SECURITY
          </h2>
          <Card className="p-6 rounded-[20px] shadow-md space-y-4">
            <button className="w-full flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-primary" />
                <p className="font-semibold">Privacy Policy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <Separator />

            <button className="w-full flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-primary" />
                <p className="font-semibold">Terms of Service</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <Separator />

            <button className="w-full flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <p className="font-semibold">Data & Consent</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* Logout */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-14 rounded-[20px] text-destructive border-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-muted-foreground pt-4">
          Guardian Angel v1.0.0
        </p>
      </div>
    </div>
  );
}
