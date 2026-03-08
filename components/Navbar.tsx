'use client'
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";


const navItems=[
    {label: "Library", href: "/"},
    {label: "Add New", href: "/books/new"}
]

type NavbarProps = {
    authEnabled?: boolean;
}

const Navbar = ({ authEnabled = true }: NavbarProps) => {
    const pathName=usePathname();
    const { user } = useUser();

    return (
        <header className="w-full fixed z-50 bg-white border-b border-[#F5E6D3] shadow-sm">
            <div className="wrapper navbar-height px-2 flex justify-between items-center">
              <Link href='/' className="flex gap0.5 items-center">
                  <Image src="/assets/logo.png" alt="Bookinator" width={42} height={26}/>
                  <span className="logo-text">Bookinator</span>
              </Link>
              <nav className="w-fit flex gap-7.5 items-center ">
                  {navItems.map(({ label, href }) => {
                      const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                      return (
                          <Link href={href} key={label} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity=60')}>
                              {label}
                          </Link>
                      )
                  })}
                  {authEnabled && (
                      <div className="flex gap-7.5 items-center">
                          <SignedOut>
                              <SignInButton mode="modal" />
                          </SignedOut>
                          <SignedIn>
                              <div className="nav-user-link">
                                  <UserButton />
                                  {user?.firstName && (
                                      <Link href="/subscriptions" className="nav-user-name">
                                          {user.firstName}
                                      </Link>
                                  )}
                              </div>
                          </SignedIn>
                      </div>
                  )}
              </nav>
          </div>
        </header>
    )
}
export default Navbar
