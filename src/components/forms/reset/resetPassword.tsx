"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useResetPasswordLogic } from "./useResetPasswordLogic";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPasswordForm = () => {
  const token = useSearchParams().get("token");
  const {
    email,
    password,
    confirmPassword,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    isRequestValid,
    isConfirmValid,
  } = useResetPasswordLogic();
  const { requestReset, confirmReset, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    if (token) {
      if (!isConfirmValid) return;
      await confirmReset(token, password);
    } else {
      if (!isRequestValid) return;
      await requestReset(email);
    }
  };

  return (
    <form className="space-y-4">
      {!token ? (
        <>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        </>
      ) : (
        <>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />

            <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-2 top-2 cursor-pointer">
              {showConfirm ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </>
      )}

      <div className="mt-8">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading || (!token ? !isRequestValid : !isConfirmValid)}
          className="w-full"
        >
          {token ? "Reset Password" : "Send Reset Link"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
