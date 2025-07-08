 "use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { useRegistrationLogic } from "./useRegistrationLogic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const RegistrationForm = () => {
  const {
    step,
    form1,
    form2,
    form3,
    handleForm1Change,
    handleForm2Change,
    handleForm3Change,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    nextStep,
    prevStep,
    formData,
    error,
    // countries,
    // states,
  } = useRegistrationLogic();
  const { registerUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStep3Valid) return;
    
    await registerUser(formData);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="text-sm text-red-500 text-center font-medium">{error}</p>
      )}

      {step === 1 && (
        <>
          <Input 
            placeholder="First Name" 
            value={form1.firstName} 
            onChange={(e) => handleForm1Change("firstName", e.target.value)} 
          />

          <Input 
            placeholder="Last Name" 
            value={form1.lastName} 
            onChange={(e) => handleForm1Change("lastName", e.target.value)} 
          />

          <Input 
            type="email" 
            placeholder="Email" 
            value={form1.email} 
            onChange={(e) => handleForm1Change("email", e.target.value)} 
          />

          <Input 
            placeholder="Phone Number" 
            value={form1.phoneNumber} 
            onChange={(e) => handleForm1Change("phoneNumber", e.target.value)} 
          />


          <div className="pt-4">
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={!isStep1Valid}
              className="w-full"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form2.password}
              onChange={(e) => handleForm2Change("password", e.target.value)}
            />

            <span 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-2.5 cursor-pointer text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={form2.confirmPassword}
              onChange={(e) => handleForm2Change("confirmPassword", e.target.value)}
            />

            <span 
              onClick={() => setShowConfirm(!showConfirm)} 
              className="absolute right-3 top-2.5 cursor-pointer text-muted-foreground"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="flex justify-between pt-4 gap-4">
            <Button 
              type="button" 
              onClick={prevStep}
              className="w-full bg-muted text-muted-foreground"
            >
              Previous
            </Button>

            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={!isStep2Valid}
              className="w-full"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <Select
            value={form3.gender}
            onValueChange={(value) => handleForm3Change("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>

          {/* <Input 
            type="date" 
            value={form3.dob} 
            onChange={(e) => handleForm3Change("dob", e.target.value)} 
            className="w-full"
            placeholder="Date of Birth"
          /> */}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between font-normal"
              >
                {form3.dob ? (
                  new Date(form3.dob).toLocaleDateString()
                ) : (
                  <span>Date of Birth</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form3.dob ? new Date(form3.dob) : undefined}
                onSelect={(date) => {
                  if (date) {
                    handleForm3Change("dob", date.toISOString().split("T")[0]);
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>

          <Input
            placeholder="Enter Country"
            value={form3.country}
            onChange={(e) => handleForm3Change("country", e.target.value)}
          />
          {/* <Select 
            value={form3.country} 
            onValueChange={(value) => handleForm3Change("country", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>

            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          <Input
            placeholder="Enter State"
            value={form3.state}
            onChange={(e) => handleForm3Change("state", e.target.value)}
          />
          {/* <Select
            value={form3.state}
            onValueChange={(value) => handleForm3Change("state", value)}
            disabled={!states.length}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          <div className="mt-8 flex justify-between">
            <Button 
              type="button" 
              onClick={prevStep}
              className="bg-neutral-500"
            >
              Previous 
            </Button>

            <Button 
              type="submit" 
              disabled={!isStep3Valid || loading}
            >
              {loading ? "Creating Account...." : "Create Account"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default RegistrationForm;
