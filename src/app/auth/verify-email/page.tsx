"use client";
import PinInput from "@/components/extras/PinInput";
import FormSubmit from "@/components/form/FormSubmit";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const { openToast } = useToast();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const onClickResend = () => {
    authService
      .createVerifyEmailOtp()
      .then((data) => {
        openToast({
          title: "Otp Sent",
          text: data.message,
          type: "success",
        });
      })
      .catch((error) => {
        openToast({
          text: error?.response?.data?.message,
          type: "failure",
        });
      })
      .finally(() => {
        setSeconds(60);
      });
  };

  const onClickSendOtp = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    authService
      .verifyEmail({ token: otp })
      .then((data) => {
        openToast({
          title: "Email Confirmed",
          text: data.message,
          type: "success",
        });
      })
      .catch((error) => {
        openToast({
          text: error?.response?.data?.message,
          type: "failure",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className=" max-h-[712px] overflow-scroll">
      <div className="space-y-3">
        <h2 className="text-2xl text-tib-purple font-bold">Enter OTP</h2>
        <p className=" pr-10">we’ve sent an OTP to emailneeded@gmail.com</p>
      </div>
      <form onSubmit={onClickSendOtp} className="mt-9 ">
        <div className="space-y-5 mb-7">
          <PinInput pin={otp} setPin={(pin) => setOtp(pin.trim().toUpperCase())} pinLength={4} width="100%" gap="16px" />
          <p className="text-center text-xs">
            {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
          </p>
        </div>
        <FormSubmit loading={isLoading} disabled={otp.length !== 4} text="Send Otp" />
      </form>
      <p className=" text-center mt-7 text-sm">
        Didn’t get an OTP?{" "}
        <button onClick={() => onClickResend()} disabled={remainingSeconds > 0} className="text-tib-purple disabled:text-tib-light-purple">
          Resend
        </button>
      </p>
    </div>
  );
};

export default VerifyEmail;
