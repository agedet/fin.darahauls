'use client'

import ResetPasswordForm from '@/components/forms/reset/resetPassword'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      </Card>
    </motion.section>
  )
}

export default page