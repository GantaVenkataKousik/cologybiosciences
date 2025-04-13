"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the navigation links to remove diagnostics
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    {
      href: "/services",
      label: "Services",
      subLinks: [
        { href: "/services?tab=pharmacokinetics", label: "Pharmacokinetics" },
        { href: "/services?tab=pharmacology", label: "Pharmacology" },
        { href: "/services?tab=toxicology", label: "Toxicology" },
      ],
    },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact Us" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#408c5c]/90 backdrop-blur-md py-2" : "bg-[#408c5c]/70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 text-white">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XaRMrGQD4dhP13BFbrX1uvUN45oXSp.png"
              alt="Cology Biosciences Logo"
              width={40}
              height={40}
              className="h-10 w-auto rounded-md" // Added rounded-md for soft corners
            />
            {/* Only show company name on desktop */}
            <div className="hidden md:flex flex-col whitespace-nowrap">
              <span className="text-2xl font-bold">
                <span className="text-white">Cology Biosciences</span> <span className="text-[#4a90e2]"></span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 font-medium">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-white font-bold border-b-2 border-white pb-1"
                      : "text-white hover:text-[#4a90e2]"
                  }`}
                >
                  {link.label}
                </Link>

                {link.subLinks && (
                  <div className="absolute left-0 mt-2 w-48 bg-[#1D2A4A] rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A3A5A] hover:text-white transition-colors duration-200"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1D2A4A] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.href} className="border-b border-[#2A3A5A] pb-3">
                    <Link
                      href={link.href}
                      className={`transition-colors duration-300 block py-2 ${
                        isActive(link.href)
                          ? "text-white font-medium border-l-2 border-[#4a90e2] pl-3"
                          : "text-gray-300 hover:text-white pl-3"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>

                    {link.subLinks && (
                      <div className="pl-6 mt-2 space-y-2 bg-[#2A3A5A]/30 rounded-md py-2">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="text-gray-400 hover:text-white transition-colors duration-300 block py-1.5 px-3 text-sm rounded-md hover:bg-[#2A3A5A]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

