'use client'

import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RegistrationForm from '@/components/forms/registration/registrationForm';

function page() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { delay: 0.4, duration: 0.3, ease: "easeIn" },
      }}
    >
      <Card className="w-full max-w-md bg-secondary shadow-xl border rounded-2xl">
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>

          </div>

          <CardTitle className='text-2xl font-bold text-center'>
            Create Account
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your details to create a dara hauls account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegistrationForm  />
        </CardContent>

        <CardFooter>
          <p className="text-sm text-gray-600 text-center w-full">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline font-medium">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </motion.section>
  )
}

export default page