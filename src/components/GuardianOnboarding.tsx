import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Shield, Link2 } from "lucide-react";

interface GuardianOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function GuardianOnboarding({ onComplete, onBack }: GuardianOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    patientCode: "",
    consent: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 3) {
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
              {[1, 2, 3].map((s) => (
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

        {/* Step 1: Guardian Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-[24px] font-semibold mb-2">About You</h2>
              <p className="text-muted-foreground">Tell us who you are</p>
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

        {/* Step 2: Connect to Patient */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-[24px] font-semibold mb-2">Connect to Patient</h2>
              <p className="text-muted-foreground">Enter the code from your patient</p>
            </div>

            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="patientCode">Patient Connection Code</Label>
                  <Input
                    id="patientCode"
                    value={formData.patientCode}
                    onChange={(e) => updateField("patientCode", e.target.value.toUpperCase())}
                    className="h-14 rounded-[16px] text-center text-[24px] tracking-wider"
                    placeholder="ABCD-1234"
                    maxLength={9}
                  />
                </div>

                <div className="bg-secondary/30 p-4 rounded-[16px]">
                  <p className="text-muted-foreground leading-relaxed">
                    Ask your patient for their connection code. You can find it in their app
                    settings under "Guardian Angel".
                  </p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              disabled={!formData.patientCode || formData.patientCode.length < 8}
              className="w-full h-14 rounded-[20px] shadow-md"
            >
              Connect
            </Button>
          </div>
        )}

        {/* Step 3: Consent */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-semibold mb-2">Privacy & Consent</h2>
              <p className="text-muted-foreground">Please review and agree</p>
            </div>

            <Card className="p-6 rounded-[20px] shadow-md">
              <div className="space-y-4">
                <h3 className="text-[20px] font-semibold">Your Role as Guardian Angel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As a Guardian Angel, you'll receive notifications when your patient misses
                  medication doses. This helps you provide timely support and encouragement.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You'll see their medication schedule and adherence status, but no other health
                  information.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Your patient has given permission for you to receive these notifications.
                </p>
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => updateField("consent", checked)}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-foreground leading-relaxed cursor-pointer">
                    I understand my role and agree to support my patient with care and
                    encouragement
                  </label>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              disabled={!formData.consent}
              className="w-full h-14 rounded-[20px] shadow-md"
            >
              Start Supporting
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
