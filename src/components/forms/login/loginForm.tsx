"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "./useLoginFormLogic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
    const { 
      email, 
      password, 
      handleEmailChange, 
      handlePasswordChange, 
      isValid 
    } = useLoginForm();
    const { loginUser, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
      if (!isValid) return;
      
      await loginUser(email, password);
    };

  return (
    <form className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 cursor-pointer"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>

      <div className="mt-8">
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={!isValid || loading}
          className="w-full"
        >
          {loading ? "Logging in...." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
