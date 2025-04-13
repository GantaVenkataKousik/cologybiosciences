import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#408c5c] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Cology Biosciences Private Limited</h3>
            <p className="mb-4 text-sm text-gray-200">
              Research and product development in Telangana, specializing in pre-clinical research and advanced
              laboratory services. Founded by K.M.Sridevi. Rated 5.04 on Google Reviews.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-200 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-200 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-200 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-200 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-200 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-200 hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services?tab=diagnostics" className="text-gray-200 hover:text-white">
                  Diagnostic Tests
                </Link>
              </li>
              <li>
                <Link href="/services?tab=pharmacology" className="text-gray-200 hover:text-white">
                  Hepatic Models
                </Link>
              </li>
              <li>
                <Link href="/services?tab=pharmacology" className="text-gray-200 hover:text-white">
                  Wound Models
                </Link>
              </li>
              <li>
                <Link href="/services?tab=pharmacology" className="text-gray-200 hover:text-white">
                  Obesity Models
                </Link>
              </li>
              <li>
                <Link href="/services?tab=pharmacology" className="text-gray-200 hover:text-white">
                  Vitiligo Model
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-gray-200 mt-1" />
                <span>
                  Lab no 20A, 3rd floor, Aspire bionest,
                  <br />
                  UNIVERSITY OF HYDERABAD, Gachibowli,
                  <br />
                  Hyderabad, Serilingampalle (M),
                  <br />
                  Telangana 500032
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-gray-200" />
                <span>+91 8341243888</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-gray-200" />
                <span>bd@cologybiosciences.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5 shrink-0 text-gray-200" />
                <span>Opens 9:30 AM Monday</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Cology Biosciences Private Limited. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

