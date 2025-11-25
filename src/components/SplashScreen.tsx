import { Heart, Shield } from "lucide-react";
import { Button } from "./ui/button";

interface SplashScreenProps {
  onSelectRole: (role: "patient" | "guardian") => void;
}

export function SplashScreen({ onSelectRole }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-12 h-12 text-primary-foreground" fill="white" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-[28px] font-semibold text-foreground">
            Welcome to Guardian Angel
          </h1>
          <p className="text-[20px] text-muted-foreground">
            Your companion for medication reminders and support
          </p>
        </div>

        {/* Role Selection Buttons */}
        <div className="space-y-4 pt-8">
          <Button
            onClick={() => onSelectRole("patient")}
            className="w-full h-16 text-[20px] rounded-[20px] bg-primary hover:bg-primary/90 shadow-md"
          >
            <Heart className="mr-3 h-6 w-6" />
            I'm a Patient
          </Button>

          <Button
            onClick={() => onSelectRole("guardian")}
            className="w-full h-16 text-[20px] rounded-[20px] bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
          >
            <Shield className="mr-3 h-6 w-6" />
            I'm a Guardian Angel
          </Button>
        </div>

        <p className="text-[16px] text-muted-foreground pt-4">
          Supporting your COPD medication routine with care
        </p>
      </div>
    </div>
  );
}
