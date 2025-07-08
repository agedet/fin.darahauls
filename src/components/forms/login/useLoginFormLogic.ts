'use client'

import { useCallback, useMemo, useState } from "react";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const isValid = useMemo(() => {
    return email.trim() !== "" && password.length >= 6;
  }, [email, password]);

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    isValid,
  };
};
