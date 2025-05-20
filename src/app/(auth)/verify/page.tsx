'use client'

import React from 'react'
import { motion } from "framer-motion";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function page() {
  return (
    <motion.section
        initial={{ opacity: 0}}
        animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.3, ease: 'easeIn'},
        }}
    >
        <Card className="flex flex-col items-center justify-center w-full py-[40px] px-[40px] bg-secondary">
            <h1 className="text-4xl font-bold mb-8">Verify Account</h1>
    
            <form className="w-full max-w-sm">
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
            </form>
        </Card>
    </motion.section>
  )
}

export default page