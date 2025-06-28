"use client";
import Image from "next/image";
import Link from "next/link";
import { navbarLinks } from "@/constant/index";
import { Button } from "@packtok/ui";
import { cn } from "@packtok/ui";
import { Menu, Search, ShoppingBag, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/navbar-logo.png";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 540;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled || toggle ? "shadow-md bg-white" : "bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={handleLinkClick}>
              <Image
                src={logo}
                alt="logo"
                width={120}
                height={50}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navbarLinks.map((link, idx) => (
              <Button variant="link" key={idx} asChild>
                <Link href={link.href} className="text-gray-700 hover:text-gray-900">
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-700 cursor-pointer hover:text-gray-900" />
            <UserCircle className="h-5 w-5 text-gray-700 cursor-pointer hover:text-gray-900" />
            <ShoppingBag className="h-5 w-5 text-gray-700 cursor-pointer hover:text-gray-900" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setToggle(!toggle)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {toggle ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {toggle && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-2 space-y-1">
              {navbarLinks.map((link, idx) => (
                <Button
                  variant="ghost"
                  key={idx}
                  asChild
                  className="w-full justify-start"
                >
                  <Link 
                    href={link.href} 
                    onClick={handleLinkClick}
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}
              
              {/* Mobile Icons */}
              <div className="flex items-center justify-center space-x-6 pt-4 pb-2">
                <Search className="h-6 w-6 text-gray-700 cursor-pointer" />
                <UserCircle className="h-6 w-6 text-gray-700 cursor-pointer" />
                <ShoppingBag className="h-6 w-6 text-gray-700 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}