"use client"
import React from 'react'
import Link from 'next/link'
import { useSession,signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
function Navbar() {

    const {data:session} = useSession();

    const user:User = session?.user as User;
  return (
    <nav className='"p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
            <a href="#">Secret</a>
            {
                session ? <>
                <span className='mr-4'>Welcome, {user?.username?.toUpperCase() || user?.email} </span> 
                <Button className="w-fill md:w-auto" onClick={() => signOut()}>Logout</Button>
                </> : <Link href='/sign-in'><Button className="w-fill md:w-auto">Login</Button></Link>
            }
        </div>
    </nav>
  )
}

export default Navbar