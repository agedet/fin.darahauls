import React from 'react'

function HeroScreen() {
  return (
    <div className="hero__image min-h-screen flex justify-center items-center">
        <div className="hero h-full b-gradient-to-br from-gree-600 to-yello-600 flex flex-col items-center justify-center">
            <div className='container mx-auto max-w-[95%] lg:max-w-[90%] text-center text-white'>
                <h1 className="text-5xl font-bold">Welcome to darahauls</h1>

                <p className="mt-4 text-xl">Book your ride instantly. Fast, safe, and affordable.</p>

                <div className="mt-6 space-x-4">
                    <a href="/rider/book" className="bg-white font-semibold text-dark px-[22px] py-[13px] rounded-[4px] text-[14px]">
                        Book a Ride
                    </a>

                    <a href="/login" className="bg-white text-primary px-[22px] py-[13px] rounded-[4px] text-[14px]">
                        Login
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroScreen