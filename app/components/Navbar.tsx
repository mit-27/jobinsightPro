"use client"

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import {MagnifyingGlassIcon} from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button"


export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between  max-w-5xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        Job <span className="text-primary">Insight </span><span className="text-blue-500">Pro</span>
      </Link>

      
      <div className="w-full max-w-xl left-0 relative flex items-left ml-10">
        {/* <Button variant="outline" className=""></Button> */}
        <Link href="/Dashboard" className={buttonVariants({ variant: "outline", className:"text-primary mx-3" })}><MagnifyingGlassIcon className="mr-1 size-4"/>Job Search</Link>
        <Button variant="outline" className="text-primary">About</Button>
      </div>
      
      


      <ModeToggle />
    </nav>
  );
}