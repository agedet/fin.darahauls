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
    
            {/* <form className="w-full max-w-sm">
                <div className="mb-4">
                    <Label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">Verification Code</Label>
                    <Input 
                        type="text" 
                        id="verification-code" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
                    />
                </div>
        
                <Button 
                    type="submit" 
                    className="w-full mt-4 py-2 px-4 bg-primary text-dark font-semibold rounded-md hover:bg-primary/50"
                >
                    Verify
                </Button>
            </form> */}
        </Card>
    </motion.section>
  )
}

export default page