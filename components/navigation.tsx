'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MapPin } from 'lucide-react'

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)))
      const scrollPosition = window.scrollY + 150 // Offset for better accuracy

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      {/* Top Info Bar */}
      <div className="bg-primary py-2 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone className="size-4" />
              <span>+91 9973622731</span>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <MapPin className="size-4" />
              <span>Mirjanhat, Naya Bazar, Bhagalpur</span>
            </div>
          </div>
          <a 
            href="#appointments"
            onClick={(e) => handleLinkClick(e, '#appointments')}
            className="hidden rounded-md bg-background px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-background/90 sm:block"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Swastik<span className="text-foreground">Hospital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-medium transition-colors ${activeSection === link.href.substring(1) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t pb-4 md:hidden">
            <div className="mt-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${activeSection === link.href.substring(1) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'}`}>
                  {link.label}
                </a>
              ))}
              <a
                href="#appointments"
                onClick={(e) => handleLinkClick(e, '#appointments')}
                className="mt-2 w-full rounded-md bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
