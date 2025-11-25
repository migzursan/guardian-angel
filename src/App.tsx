import { useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { PatientOnboarding } from "./components/PatientOnboarding";
import { GuardianOnboarding } from "./components/GuardianOnboarding";
import { PatientDashboard } from "./components/PatientDashboard";
import { GuardianDashboard } from "./components/GuardianDashboard";
import { NotificationScreen } from "./components/NotificationScreen";
import { SettingsScreen } from "./components/SettingsScreen";

type Screen =
  | "splash"
  | "patient-onboarding"
  | "guardian-onboarding"
  | "patient-dashboard"
  | "guardian-dashboard"
  | "notifications"
  | "settings";

type UserType = "patient" | "guardian" | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [userType, setUserType] = useState<UserType>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleRoleSelect = (role: "patient" | "guardian") => {
    setUserType(role);
    if (role === "patient") {
      setCurrentScreen("patient-onboarding");
    } else {
      setCurrentScreen("guardian-onboarding");
    }
  };

  const handlePatientOnboardingComplete = (data: any) => {
    setUserData(data);
    setCurrentScreen("patient-dashboard");
  };

  const handleGuardianOnboardingComplete = (data: any) => {
    setUserData(data);
    setCurrentScreen("guardian-dashboard");
  };

  const handleNavigate = (screen: string) => {
    if (screen === "notifications") {
      setCurrentScreen("notifications");
    } else if (screen === "settings") {
      setCurrentScreen("settings");
    }
  };

  const handleBack = () => {
    if (currentScreen === "notifications" || currentScreen === "settings") {
      if (userType === "patient") {
        setCurrentScreen("patient-dashboard");
      } else if (userType === "guardian") {
        setCurrentScreen("guardian-dashboard");
      }
    } else if (currentScreen === "patient-onboarding" || currentScreen === "guardian-onboarding") {
      setCurrentScreen("splash");
      setUserType(null);
    }
  };

  const handleLogout = () => {
    setCurrentScreen("splash");
    setUserType(null);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[430px] mx-auto bg-background min-h-screen shadow-2xl">
        {currentScreen === "splash" && <SplashScreen onSelectRole={handleRoleSelect} />}

        {currentScreen === "patient-onboarding" && (
          <PatientOnboarding onComplete={handlePatientOnboardingComplete} onBack={handleBack} />
        )}

        {currentScreen === "guardian-onboarding" && (
          <GuardianOnboarding onComplete={handleGuardianOnboardingComplete} onBack={handleBack} />
        )}

        {currentScreen === "patient-dashboard" && userData && (
          <PatientDashboard patientData={userData} onNavigate={handleNavigate} />
        )}

        {currentScreen === "guardian-dashboard" && userData && (
          <GuardianDashboard guardianData={userData} onNavigate={handleNavigate} />
        )}

        {currentScreen === "notifications" && userType && (
          <NotificationScreen onBack={handleBack} userType={userType} />
        )}

        {currentScreen === "settings" && userData && userType && (
          <SettingsScreen
            onBack={handleBack}
            userData={userData}
            userType={userType}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}
