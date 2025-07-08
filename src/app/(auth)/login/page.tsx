'use client'

import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/forms/login/loginForm';

function page() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { delay: 0.4, duration: 0.3, ease: "easeIn" },
      }}
    >
      <Card className="w-full max-w-md bg-secondary shadow-lg">
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>
        
          </div>
        
          <CardTitle className='text-2xl font-bold text-center'>
            Login
          </CardTitle>

          <CardDescription className='text-center'>
            Enter your email and password to sign in
          </CardDescription>
        
          {/* {error &&
            <p className='text-red-500 text-center mb-4'>
              {error}
            </p>
          } */}
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/create-account" className=" text-primary hover:underline">Create one</a>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <a href="/reset-password" className="text-red-500 hover:underline">Forgot Password?</a>
            </p>
          </div>
        </CardFooter>

        {/* <form className="w-full max-w-sm">
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

          <Button type="submit" className="w-full mt-4 py-2 px-4 bg-primary text-dark font-semibold rounded-md hover:bg-primary/50">
            Login
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/create-account" className=" text-primary hover:underline">Create one</a>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <a href="/reset-password" className="text-red-500 hover:underline">Forgot Password?</a>
            </p>
          </div>
        </form> */}
      </Card>
    </motion.section>
  )
}

export default page