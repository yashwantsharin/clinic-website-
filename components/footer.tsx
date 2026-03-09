import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground">SH</span>
              </div>
              <span className="text-xl font-bold text-foreground">Swastik Hospital</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Providing quality healthcare services with compassion and expertise since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Doctor
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-muted-foreground transition-colors hover:text-primary">
                  Appointments
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground transition-colors hover:text-primary">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 text-primary" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-4 text-primary" />
                <span>contact@swastikhospital.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>123 Medical Center Dr, Health City, HC 12345</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
              <li className="pl-6">Sat: 9:00 AM - 1:00 PM</li>
              <li className="pl-6">Sun: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Swastik Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
