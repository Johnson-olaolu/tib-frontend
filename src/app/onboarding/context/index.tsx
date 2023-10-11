"use client";
import { IProfile, IResponse } from "@/services/types";
import userService from "@/services/user.service";
import React, { createContext, useContext, useMemo, useState } from "react";

interface IOnboardingContext {
  setProfileData: ({ firstName, lastName, phoneNumber, bio }: { firstName: string; lastName: string; phoneNumber: string; bio: string }) => void;
  setInterests: (interests: string[]) => void;
  completeOnboarding: (id: string) => Promise<IResponse<IProfile>>;
  onboardingData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bio: string;
    interests: string[];
  };
}

const OnboardingContext = createContext({});

export const OnboardingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bio: "",
    interests: [] as string[],
  });

  const setProfileData = ({ firstName, lastName, phoneNumber, bio }: { firstName: string; lastName: string; phoneNumber: string; bio: string }) => {
    setOnboardingData({ ...onboardingData, firstName, lastName, phoneNumber, bio });
  };

  const setInterests = (interests: string[]) => {
    setOnboardingData({ ...onboardingData, interests });
  };

  const completeOnboarding = async (id: string) => {
    return await userService.updateProfile(id, onboardingData);
  };

  const value = useMemo(
    () => ({
      setProfileData,
      setInterests,
      completeOnboarding,
      onboardingData,
      setOnboardingData,
    }),
    [onboardingData]
  );
  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

const useOnboarding = (): IOnboardingContext => useContext(OnboardingContext) as IOnboardingContext;

export default useOnboarding;
