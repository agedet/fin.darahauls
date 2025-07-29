'use client'

import { useCallback, useMemo, useState } from "react";

export interface FormStep1 {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface FormStep2 {
  password: string;
  confirmPassword: string;
}

export interface FormStep3 {
  gender: string;
  dob: Date;
  state: string;
  country: string;
}

export const useRegistrationLogic = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  // const [countries, setCountries] = useState<string[]>([]);
  // const [states, setStates] = useState<string[]>([]);

  const [form1, setForm1] = useState<FormStep1>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [form2, setForm2] = useState<FormStep2>({
    password: "",
    confirmPassword: "",
  });

  const [form3, setForm3] = useState<FormStep3>({
    gender: "",
    dob: new Date(),
    state: "",
    country: "",
  });

  const handleForm1Change = useCallback((field: keyof FormStep1, value: string) => {
    setForm1((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleForm2Change = useCallback((field: keyof FormStep2, value: string) => {
    setForm2((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleForm3Change = useCallback((field: keyof FormStep3, value: string | Date) => {
    setForm3((prev) => ({ ...prev, [field]: value }));
  }, []);

  const isStep1Valid = useMemo(() => {
    return (
      form1.firstName.trim() !== "" &&
      form1.lastName.trim() !== "" &&
      form1.email.trim() !== "" &&
      form1.phoneNumber.trim() !== ""
    );
  }, [form1]);

  const isStep2Valid = useMemo(() => {
    return (
      form2.password.length >= 6 &&
      form2.password === form2.confirmPassword
    );
  }, [form2]);

  const isStep3Valid = useMemo(() => {
    return (
      form3.gender.trim() !== "" &&
      form3.dob instanceof Date &&
      form3.state.trim() !== "" &&
      form3.country.trim() !== ""
    );
  }, [form3]);

  const validateForm = useCallback(() => {
    if (step === 1) {
      if (!form1.firstName || !form1.lastName || !form1.email || !form1.phoneNumber) {
        setError("All fields are required.");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form1.email)) {
        setError("Please enter a valid email address.");
        return false;
      }
    }

    if (step === 2) {
      if (!form2.password || !form2.confirmPassword) {
        setError("All fields are required.");
        return false;
      }

      if (form2.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return false;
      }

      if (form2.password !== form2.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }

    if (step === 3) {
      if (
        !form3.gender ||
        !form3.dob ||
        !form3.state ||
        !form3.country
      ) {
        setError("All fields in Step 3 are required.");
        return false;
      }
    }

    setError("");
    return true;
  }, [step, form1, form2, form3]);

  const nextStep = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  }, [validateForm]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const resetForm = useCallback(() => {
    setStep(1);
    setForm1({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    setForm2({ password: "", confirmPassword: "" });
    setForm3({ gender: "", dob: new Date(), state: "", country: "" });
    setError("");
  }, []);

  const formData = useMemo(() => {
    return {
      ...form1,
      ...form2,
      ...form3,
    };
  }, [form1, form2, form3]);

  // Fetch countries and states
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
  //       const data = await res.json();
  //       const sortedCountries = data
  //         .map((c: any) => c.name.common)
  //         .sort((a: string, b: string) => a.localeCompare(b));

  //       setCountries(sortedCountries);
  //     } catch (err) {
  //       console.error('Failed to fetch countries:', err);
  //     }
  //   };

  //   fetchCountries();
  // }, []);

  // useEffect(() => {
  //   const fetchStates = async (country: string) => {
  //     if (form3.country === 'Nigeria') {
  //       setStates(['Lagos', 'Abuja', 'Kano', 'Rivers', 'Lagos', 'Abuja', 'Oyo', 'Rivers', 'Kaduna', 'Enugu', 'Delta', 'Akwa Ibom', 'Cross River']);
  //     } else if (country === 'USA') {
  //       setStates(['California', 'New York', 'Texas', 'Florida']);
  //     } else {
  //       setStates([]);
  //     }
  //   };

  //   fetchStates(form3.country);
  // }, [form3.country]);

  return {
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
    resetForm,
    formData,
    error,
    // countries,
    // states,
  };
};
