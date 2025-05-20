'use client'

import Link from 'next/link'
// import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


const Navbar = () => {
    // const pathname = usePathname()
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const closeMobileClicked = () => setIsNavOpen(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


  return (
    <div className={isScrolled ? 'isScrolled' : 'notScrolled'}>
        <div className="container py-[30px] mx-auto max-w-[95%] lg:max-w-[90%]">
            <div className='flex justify-between items-center'>
                <div className='flex-[1]'>
                    <Link href="/" legacyBehavior>
                        <a className='logo'>
                            dara hauls
                        </a>
                    </Link>
                </div>

                <nav className='flex-[2]'>
                    <div className='DESKTOP-MENU hidden lg:flex lg:justify-between lg:items-center'>
                        <ul className='flex justify-start items-center tracking-[0.75px] font-medium gap-[40px]'>
                            <li>
                                <Link href='/' legacyBehavior>
                                    <a>
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li  className='sm:mx-3'>
                                <Link href='#about' legacyBehavior>
                                    <a>
                                        About
                                    </a>
                                </Link>
                            </li>
                            <li >
                                <Link href='#services' legacyBehavior>
                                    <a target='_blank'>
                                        Services
                                    </a>
                                </Link>
                            </li>
                            {/* <li >
                                <Link href='/blog' legacyBehavior>
                                    <a target='_blank'>
                                        Blog
                                    </a>
                                </Link>
                            </li> */}
                        </ul>
                       
                        <ul className='flex justify-center items-center tracking-[0.75px] font-medium gap-10'>
                            <li className='capitalize'>
                                <Link href='/login' legacyBehavior>
                                <a         
                                        className='nav-cta-nude font-inter rounded-[4px] border px-[22px] py-[13px] font-medium text-[14px] text-white'
                                    >
                                        Login
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href='/create-account' legacyBehavior>
                                    <a         
                                        className='nav-cta font-inter rounded-[4px] bg-prinary px-[22px] py-[13px] font-medium text-[14px] text-white'
                                    >
                                        Create an Account
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* MOBILE MENU */}
                    <div className='MOBILE-NAV-MENU flex justify-end items-center lg:hidden'>
                        {/* HAMBURGER MENU */}
                        <div 
                            className='HAMBURGER-ICON flex flex-col gap-1.5 cursor-pointer'
                            onClick={() => setIsNavOpen((prev) => !prev)}
                        >
                            <span className='block h-0.5 w-8 bg-white'></span>
                            <span className='block h-0.5 w-8 bg-white'></span>
                            <span className='block h-0.5 w-8 bg-white'></span>
                        </div>

                        {/* NAV MENU */}
                        <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
                            <div className='CROSS-ICON absolute top-0 right-0 px-8 py-8'
                                onClick={() => setIsNavOpen(false)}
                            >
                                <svg
                                    className='h-8 w-8 text-[#ffffff] animate-pulse'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <line x1='18' y1='6' x2='6' y2='18' />
                                    <line x1='6' y1='6' x2='18' y2='18' />
                                </svg>
                            </div>

                            {/* links */}
                            <div className='MENU-LINK-MOBILE-OPEN h-[400px] grid gap-8'>
                                <ul className='MENU-LINK-MOBILE-OPEN grid gap-2'>
                                    <li  
                                        onClick={closeMobileClicked}
                                    >
                                        <Link href='/' legacyBehavior>
                                            <a>
                                                Home
                                            </a>
                                        </Link>
                                    </li>
                                    <li 
                                        onClick={closeMobileClicked}
                                    >
                                        <Link href='/about' legacyBehavior>
                                            <a target='_blank'>
                                                About
                                            </a>
                                        </Link>
                                    </li>
                                    <li 
                                        onClick={closeMobileClicked}
                                    >
                                        <Link href='#services' legacyBehavior>
                                            <a target='_blank'>
                                                Services
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    {/* <li 
                                        onClick={closeMobileClicked}
                                    >
                                        <Link href='/blog' legacyBehavior>
                                            <a target='_blank'>
                                                Blog
                                            </a>
                                        </Link>
                                    </li> */}
                                </ul>

                                <ul className='grid gap-2'>
                                    <li 
                                        className='w-full'
                                        onClick={closeMobileClicked}
                                    >
                                        <Link href='/login' legacyBehavior>
                                            <a         
                                                className='nav-cta-nude w-full font-inter rounded-[4px] border border-shade px-[22px] py-[13px] font-medium text-[14px] text-white'
                                            >
                                                Login
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li
                                        onClick={closeMobileClicked}
                                    >
                                        <Link href='/create-account' legacyBehavior>
                                            <a 
                                                target='_blank'
                                                className='nav-cta font-inter rounded-[4px] bg-primary px-[22px] py-[13px] font-medium text-[14px] text-white'
                                            >
                                                Create an Account
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Navbar