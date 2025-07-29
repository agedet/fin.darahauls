'use client'

import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerifyForm from '@/components/forms/verify/verifyForm';

function page() {
  return (
    <motion.section
        initial={{ opacity: 0}}
        animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.3, ease: 'easeIn'},
        }}
    >
        <Card className="w-full max-w-md bg-secondary shadow-lg">
            <CardHeader className='space-y-1'>
                <div className='flex justify-center mb-4'>
                
                </div>
                
                <CardTitle className='text-2xl font-bold text-center'>
                    Verify Account
                </CardTitle>

                <CardDescription className='text-center'>
                    Enter your token to verify
                </CardDescription>
                
                {/* {error &&
                    <p className='text-red-500 text-center mb-4'>
                    {error}
                    </p>
                } */}
            </CardHeader>

            <CardContent>
                <VerifyForm />
            </CardContent>
        </Card>
    </motion.section>
  )
}

export default page