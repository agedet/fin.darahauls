'use client'

import { useCallback, useMemo, useState } from "react";

export const useResetPasswordLogic = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
  }, []);

  const isRequestValid = useMemo(() => email.trim() !== "", [email]);

  const isConfirmValid = useMemo(
    () => password.length >= 6 && password === confirmPassword,
    [password, confirmPassword]
  );

  return {
    email,
    password,
    confirmPassword,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    isRequestValid,
    isConfirmValid,
  };
};
