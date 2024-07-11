// components/Navbar/Navbar.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/—Pngtree—fitness logo_4148172.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = ({ setIsloggedin }: { setIsloggedin: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/users/logout");
      if (response.data.success) {
        setIsloggedin(false); // Update authentication state
        router.push("/"); // Redirect to home page after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className='bg-gray-900 h-[60px] flex justify-center items-center px-12 sticky top-0 z-10 font-medium text-lg text-white shadow-md gap-8'>
      <Image
        src={logo}
        alt='Logo'
        className='h-[40px] w-auto'
      />
      <Link
        href='/'
        className='transition-colors duration-300 ease-in-out hover:text-yellow-400'>
        Home
      </Link>
      <Link
        href='/about'
        className='transition-colors duration-300 ease-in-out hover:text-yellow-400'>
        About
      </Link>

      <button
        className='bg-blue-600 text-white font-medium transition-colors duration-300 ease-in-out px-4 py-2 rounded hover:bg-blue-500'
        onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
