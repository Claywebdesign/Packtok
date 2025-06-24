import Image from "next/image";
import footerlogo from "@/assets/footer-logo.png"
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t-4 border-orange-500 bg-black text-white md:px-18 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between py-8 border-b border-gray-500">
                <div className="bg-white w-[150px]">
                    <Image
                        src={footerlogo}
                        alt="logo"
                        height={100}
                        width={100}
                        className="mx-auto"
                    />
                </div>
                <div className="flex md:flex-row flex-col items-center md:gap-8 gap-2 text-sm mt-5">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/"}>Marketplace</Link>
                    <Link href={"/"}>Services</Link>
                    <Link href={"/"}>Contact us</Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between py-8">
                <div className="flex flex-col md:flex-row items-center gap-8 py-4 text-xs text-gray-400">
                    <div>
                        Copyright@{new Date().getFullYear()} PackTok. All rights reserved.
                    </div>
                    <Link href={"/"} className="hover:underline text-white">
                        Terms of Service
                    </Link>
                    <Link href={"/"} className="hover:underline text-white">
                        Privacy Policy
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-4 mt-4">
                    <Instagram size={18}/>
                    <Facebook size={18}/>
                    <Twitter size={18}/>
                </div>
            </div>
        </footer>
    )
}