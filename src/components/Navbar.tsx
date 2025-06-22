"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";


function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-800 hover:text-black">
          Secret
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="hidden md:inline text-sm text-muted-foreground">
                Welcome,&nbsp;
                <strong className="text-gray-900">
                  {user?.username?.toUpperCase() || user?.email}
                </strong>
              </span>
              <Button variant="outline" onClick={() => signOut({callbackUrl: "/" })}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
