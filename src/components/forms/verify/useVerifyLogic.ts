'use client'

import { useCallback, useMemo, useState } from "react";

export const useVerifyFormLogic = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = useCallback((value: string) => {
    setOtp(value);
  }, []);

  const isValid = useMemo(() => otp.trim().length === 6, [otp]);

  return {
    otp,
    handleOtpChange,
    isValid,
  };
};
