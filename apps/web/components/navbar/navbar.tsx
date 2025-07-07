"use client";
import React from "react";
import logo from "@/assets/navbar-logo.png";
import LogoutButton from "@/components/auth/logout-button";
import { navbarLinks } from "@/constant/index";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { cn } from "@packtok/ui/lib/utils";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const accessToken = useAuthStore((s) => s.accessToken);
  const { data: user } = useCurrentUser();

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

  // Handle search functionality
  const handleSearch = useCallback(
    (searchTerm: string) => {
      if (searchTerm.trim()) {
        // Navigate to marketplace with search term - default to machinery category
        const searchParams = new URLSearchParams();
        searchParams.set("searchTerm", searchTerm.trim());
        router.push(`/marketplace/machinery?${searchParams.toString()}`);
        setSearchInput("");
        setIsSearchOpen(false);
        setToggle(false);
      }
    },
    [router]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchInput("");
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isSearchOpen && !target.closest(".search-container")) {
        setIsSearchOpen(false);
        setSearchInput("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

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
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="relative search-container">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={handleSearchChange}
                      className="pl-10 pr-4 w-64 text-sm"
                      autoFocus
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleSearch}
                    className="ml-2 p-1 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Search
                  className="h-5 w-5 text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={toggleSearch}
                />
              )}
            </div>
            <ShoppingBag className="h-5 w-5 text-gray-700 cursor-pointer hover:text-gray-900" />
            {accessToken && user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/account"
                  className="text-sm font-medium hover:underline"
                >
                  {user.name?.split(" ")[0] || user.email}
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
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

              {/* Mobile Search */}
              <div className="pt-4 pb-4 border-t border-gray-200">
                <form onSubmit={handleSearchSubmit} className="px-3">
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={handleSearchChange}
                      className="pl-10 pr-4 w-full text-sm"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Icons */}
              <div className="flex items-center justify-center space-x-6 pt-2 pb-2">
                <ShoppingBag className="h-6 w-6 text-gray-700 cursor-pointer" />
              </div>

              {/* Mobile Authentication */}
              <div className="pt-4 pb-2 border-t border-gray-200">
                {accessToken && user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <Link
                        href="/account"
                        onClick={handleLinkClick}
                        className="block text-sm font-medium text-gray-900 hover:text-gray-700"
                      >
                        Welcome, {user.name?.split(" ")[0] || user.email}
                      </Link>
                    </div>
                    <div className="px-3">
                      <LogoutButton />
                    </div>
                  </div>
                ) : (
                  <div className="px-3">
                    <Button asChild className="w-full">
                      <Link href="/auth/signin" onClick={handleLinkClick}>
                        Sign In
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
