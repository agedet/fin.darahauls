"use client";


import { useAuth } from "@/context/AuthContext";
import { useVerifyFormLogic } from "./useVerifyLogic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyForm = () => {
  const { 
    otp, 
    handleOtpChange, 
    isValid 
  } = useVerifyFormLogic();
  const { verifyEmail, loading } = useAuth();

  const handleSubmit = async () => {
    if (!isValid) return;
    
    await verifyEmail(otp);
  };

  return (
    <form className="space-y-4">
      <Input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        maxLength={6}
        onChange={(e) => handleOtpChange(e.target.value)}
      />

      <div className="mt-8">
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={!isValid || loading}
          className="w-full"
        >
          {loading ? "Verifying in...." : "Verify"}
        </Button>
      </div>
    </form>
  );
};

export default VerifyForm;
