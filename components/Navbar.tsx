"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin } from 'lucide-react'

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#reviews', label: 'Reviews' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const targetElement = document.querySelector(href)
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
        setActiveSection(href.substring(1))
        setIsOpen(false)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-50% 0px -50% 0px' }
        )

        const sections = navLinks.map(link => document.querySelector(link.href)).filter(el => el)
        const appointmentSection = document.querySelector('#appointment');
        if (appointmentSection) {
            sections.push(appointmentSection);
        }

        sections.forEach((element) => {
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            sections.forEach((element) => {
                if (element) {
                    observer.unobserve(element)
                }
            })
        }
    }, [])

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="#home" className="text-2xl font-bold" onClick={(e) => handleLinkClick(e, "#home")}>
                        <span style={{ color: '#1a7fd4' }}>Swastik</span>
                        <span className="text-gray-900">Hospital</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-x-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`font-medium transition-colors ${
                                    activeSection === link.href.substring(1)
                                        ? 'text-blue-600 font-bold'
                                        : 'text-muted-foreground hover:text-blue-600'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="https://www.google.com/search?sca_esv=ad51375bc05ed99f&rlz=1C1JJTC_enIN1179IN1179&sxsrf=ANbL-n5FAhCcdY-I5ec3k_FHu5ryyXBJ9Q:1773067445801&kgmid=/g/11x8jk445n&q=Swastik+poly+clinic&shndl=30&source=sh/x/loc/uni/m1/1&kgs=346007dceaef2664&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600"
                        >
                            <MapPin className="size-4" />
                            <span>View on Google Maps</span>
                        </a>
                        <a
                            href="#appointment"
                            onClick={(e) => handleLinkClick(e, '#appointment')}
                            style={{ backgroundColor: '#1a7fd4' }}
                            className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                        >
                            Book Appointment
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden">
                    <nav className="flex flex-col items-start gap-4 p-4">
                         <a
                            href="#appointment"
                            onClick={(e) => handleLinkClick(e, '#appointment')}
                            style={{ backgroundColor: '#1a7fd4' }}
                            className="block w-full rounded-md px-3 py-2 text-base font-medium text-white"
                        >
                            Book Appointment
                        </a>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`block w-full rounded-md px-3 py-2 text-base font-medium ${
                                    activeSection === link.href.substring(1)
                                        ? 'bg-blue-50 text-blue-700 font-bold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}
