import { Button } from "./ui/button";
import { Heart, Shield, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  type: "no-data" | "error" | "no-guardian" | "no-patient";
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const renderContent = () => {
    switch (type) {
      case "no-data":
        return {
          icon: <Heart className="w-16 h-16 text-primary" />,
          title: "No Data Yet",
          message: "Start your medication routine to see your progress here",
          actionText: "Add Medication",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-16 h-16 text-destructive" />,
          title: "Something Went Wrong",
          message: "We couldn't load your information. Please try again.",
          actionText: "Retry",
        };
      case "no-guardian":
        return {
          icon: <Shield className="w-16 h-16 text-primary" />,
          title: "No Guardian Angel Yet",
          message:
            "Add a Guardian Angel to have someone support you on your medication journey",
          actionText: "Add Guardian Angel",
        };
      case "no-patient":
        return {
          icon: <Heart className="w-16 h-16 text-primary" />,
          title: "No Patient Connected",
          message: "Ask your patient for their connection code to get started",
          actionText: "Connect Patient",
        };
      default:
        return {
          icon: <Heart className="w-16 h-16 text-primary" />,
          title: "Nothing Here",
          message: "There's nothing to show right now",
          actionText: "Go Back",
        };
    }
  };

  const content = renderContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        {content.icon}
      </div>
      <h2 className="text-[24px] font-semibold mb-3">{content.title}</h2>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">{content.message}</p>
      {onAction && (
        <Button onClick={onAction} className="h-14 px-8 rounded-[20px] shadow-md">
          {content.actionText}
        </Button>
      )}
    </div>
  );
}
