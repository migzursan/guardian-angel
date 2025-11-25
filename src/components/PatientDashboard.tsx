import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import {
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  History,
  Settings,
  Flame,
} from "lucide-react";

interface PatientDashboardProps {
  patientData: any;
  onNavigate: (screen: string) => void;
}

export function PatientDashboard({ patientData, onNavigate }: PatientDashboardProps) {
  const [doses, setDoses] = useState([
    { id: 1, time: "9:00 AM", taken: true, medication: "Albuterol Inhaler" },
    { id: 2, time: "9:00 PM", taken: false, medication: "Albuterol Inhaler" },
  ]);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [streak, setStreak] = useState(7);

  const handleDoseAction = (id: number, action: "taken" | "missed") => {
    setDoses(
      doses.map((dose) => (dose.id === id ? { ...dose, taken: action === "taken" } : dose))
    );
  };

  const adherenceRate = 92;
  const nextDoseTime = "9:00 PM";
  const timeUntilNext = "2 hours 15 minutes";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-[24px] shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-[24px] font-semibold mb-1">
              Hello, {patientData.name.split(" ")[0]}!
            </h1>
            <p className="text-primary-foreground/90">How are you feeling today?</p>
          </div>
          <button onClick={() => onNavigate("settings")}>
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-[16px] p-4 mt-4">
          <Flame className="w-8 h-8 text-accent" />
          <div>
            <p className="text-[24px] font-semibold">{streak} Days</p>
            <p className="text-sm text-primary-foreground/90">Great streak!</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Next Dose Timer */}
        <Card className="p-6 rounded-[20px] shadow-md border-2 border-primary/20">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Next Dose</h3>
              <p className="text-[24px] font-semibold text-primary">{nextDoseTime}</p>
              <p className="text-muted-foreground">in {timeUntilNext}</p>
            </div>
          </div>
        </Card>

        {/* Today's Doses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-semibold">Today's Doses</h2>
            <Badge variant="outline" className="text-[16px] px-3 py-1">
              {doses.filter((d) => d.taken).length} of {doses.length}
            </Badge>
          </div>

          {doses.map((dose) => (
            <Card key={dose.id} className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">{dose.medication}</p>
                      <p className="text-muted-foreground">{dose.time}</p>
                    </div>
                  </div>
                  {dose.taken ? (
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Taken
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-accent text-accent">
                      Pending
                    </Badge>
                  )}
                </div>

                {!dose.taken && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleDoseAction(dose.id, "taken")}
                      className="flex-1 h-12 rounded-[16px] bg-success hover:bg-success/90"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Mark as Taken
                    </Button>
                    <Button
                      onClick={() => handleDoseAction(dose.id, "missed")}
                      variant="outline"
                      className="flex-1 h-12 rounded-[16px] border-destructive text-destructive"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Missed
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Adherence Rate */}
        <Card className="p-6 rounded-[20px] shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Adherence Rate</h3>
              <span className="text-[24px] font-semibold text-primary">{adherenceRate}%</span>
            </div>
            <Progress value={adherenceRate} className="h-3" />
            <p className="text-muted-foreground">
              You're doing great! Keep up the excellent work with your medication routine.
            </p>
          </div>
        </Card>

        {/* Reminders Toggle */}
        <Card className="p-6 rounded-[20px] shadow-md">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold">Reminders</p>
              <p className="text-muted-foreground">
                Get notified for each dose
              </p>
            </div>
            <Switch checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
          </div>
        </Card>

        {/* View History Button */}
        <Button
          onClick={() => onNavigate("notifications")}
          variant="outline"
          className="w-full h-14 rounded-[20px]"
        >
          <History className="w-5 h-5 mr-2" />
          View History
        </Button>
      </div>
    </div>
  );
}
