import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Clock, Heart, User, UserPlus } from "lucide-react";

interface PatientOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function PatientOnboarding({ onComplete, onBack }: PatientOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timezone: "EST",
    medicationName: "",
    frequency: "2",
    time1: "09:00",
    time2: "21:00",
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    consent: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full ${
                    s <= step ? "bg-primary" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Patient Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-[24px] font-semibold mb-2">About You</h2>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>

            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(v) => updateField("timezone", v)}>
                    <SelectTrigger className="h-14 rounded-[16px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="CST">Central Time (CST)</SelectItem>
                      <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              disabled={!formData.name || !formData.email}
              className="w-full h-14 rounded-[20px] shadow-md"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Medication Setup */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-[24px] font-semibold mb-2">Your Medication</h2>
              <p className="text-muted-foreground">Set up your daily routine</p>
            </div>

            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="medication">Medication Name</Label>
                  <Input
                    id="medication"
                    value={formData.medicationName}
                    onChange={(e) => updateField("medicationName", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="e.g., Albuterol Inhaler"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Doses Per Day</Label>
                  <Select value={formData.frequency} onValueChange={(v) => updateField("frequency", v)}>
                    <SelectTrigger className="h-14 rounded-[16px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Once daily</SelectItem>
                      <SelectItem value="2">Twice daily</SelectItem>
                      <SelectItem value="3">Three times daily</SelectItem>
                      <SelectItem value="4">Four times daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Reminder Times</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <Input
                        type="time"
                        value={formData.time1}
                        onChange={(e) => updateField("time1", e.target.value)}
                        className="h-14 rounded-[16px] flex-1"
                      />
                    </div>
                    {parseInt(formData.frequency) >= 2 && (
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <Input
                          type="time"
                          value={formData.time2}
                          onChange={(e) => updateField("time2", e.target.value)}
                          className="h-14 rounded-[16px] flex-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              disabled={!formData.medicationName}
              className="w-full h-14 rounded-[20px] shadow-md"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Guardian Angel Invite */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-[24px] font-semibold mb-2">Add Your Guardian Angel</h2>
              <p className="text-muted-foreground">Optional - Someone to help support you</p>
            </div>

            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    value={formData.guardianName}
                    onChange={(e) => updateField("guardianName", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="Family member or caregiver"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianEmail">Guardian Email</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => updateField("guardianEmail", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="guardian@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => updateField("guardianPhone", e.target.value)}
                    className="h-14 rounded-[16px]"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button onClick={handleNext} className="w-full h-14 rounded-[20px] shadow-md">
                Continue
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                className="w-full h-14 rounded-[20px]"
              >
                Skip for Now
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Consent */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-semibold mb-2">Almost Done!</h2>
              <p className="text-muted-foreground">Just one more thing</p>
            </div>

            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-4">
                <h3 className="text-[20px] font-semibold">Privacy & Consent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Guardian Angel helps you remember your medication. We'll send you reminders and,
                  if you choose, notify your Guardian Angel if doses are missed.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Your health information is private and secure. We never share your data without
                  your permission.
                </p>
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => updateField("consent", checked)}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-foreground leading-relaxed cursor-pointer">
                    I understand and agree to use Guardian Angel for medication reminders
                  </label>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              disabled={!formData.consent}
              className="w-full h-14 rounded-[20px] shadow-md"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
