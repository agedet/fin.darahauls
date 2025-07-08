'use client'

import ResetPasswordForm from '@/components/forms/reset/resetPassword'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import React from 'react'

function page() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: 'easeIn' },
      }}
    >
      <Card className="w-full max-w-md bg-secondary shadow-lg">
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>
        
          </div>
        
          <CardTitle className='text-2xl font-bold text-center'>
            Reset Password
          </CardTitle>

          <CardDescription className='text-center'>
            Enter your email and password to reset
          </CardDescription>
        
          {/* {error &&
            <p className='text-red-500 text-center mb-4'>
              {error}
            </p>
          } */}
        </CardHeader>

        <CardContent>
          <ResetPasswordForm />
        </CardContent>

        {/* <form className="w-full max-w-sm">
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>

            <Input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-primary text-dark font-semibold rounded-md hover:bg-primary/50"
          >
            Reset Password
          </Button>
        </form> */}
      </Card>
    </motion.section>
  )
}

export default page