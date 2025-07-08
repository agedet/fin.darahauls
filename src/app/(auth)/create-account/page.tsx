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

        {/* <form className="w-full max-w-md">
          <div className="mb-4">
            <Label 
              htmlFor="fullName" 
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <Input 
              type="text" 
              id="fullName" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
            <Input 
              type="email" 
              id="email" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input 
              type="password" 
              id="password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full mt-4 py-2 px-4 bg-primary text-dark font-semibold rounded-md hover:bg-primary/50"
          >Create Account</Button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </p>
          </div>
        </form> */}

      </Card>
    </motion.section>
  )
}

export default page