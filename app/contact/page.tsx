import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ThreeDNetworkBackground from "@/components/three-d-network-background"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#d8e8e4] hexagon-pattern">
        <div className="absolute inset-0 z-0 opacity-50">
          <ThreeDNetworkBackground />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-[#408c5c] px-4 py-2 text-sm font-medium text-white mb-4">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1B2238]">Get in Touch</h1>
            <p className="max-w-[700px] text-lg text-gray-600 md:text-xl">
              Have questions or need more information? We're here to help. Reach out to our team for assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#1B2238]">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Feel free to reach out to us through any of the following channels. Our team is ready to assist you with
                any questions or inquiries you may have.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#408c5c]/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#408c5c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1B2238]">Address</h3>
                    <p className="text-gray-600">
                      Lab no 20A, 3rd floor, Aspire bionest,
                      <br />
                      UNIVERSITY OF HYDERABAD, Gachibowli,
                      <br />
                      Hyderabad, Serilingampalle (M),
                      <br />
                      Telangana 500032
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#408c5c]/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#408c5c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1B2238]">Phone</h3>
                    <p className="text-gray-600">+91 8341243888</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#408c5c]/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#408c5c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1B2238]">Email</h3>
                    <p className="text-gray-600">bd@cologybiosciences.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#408c5c]/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-[#408c5c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1B2238]">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold mb-6 text-[#1B2238]">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <Input
                      id="first-name"
                      placeholder="Enter your first name"
                      className="border-gray-300 focus:border-[#408c5c] focus:ring-[#408c5c]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <Input
                      id="last-name"
                      placeholder="Enter your last name"
                      className="border-gray-300 focus:border-[#408c5c] focus:ring-[#408c5c]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="border-gray-300 focus:border-[#408c5c] focus:ring-[#408c5c]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="border-gray-300 focus:border-[#408c5c] focus:ring-[#408c5c]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    rows={5}
                    className="border-gray-300 focus:border-[#408c5c] focus:ring-[#408c5c]"
                  />
                </div>

                <Button className="w-full bg-[#408c5c] hover:bg-[#357a4d] text-white">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#f5f7f7]">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#1B2238]">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2954088332393!2d78.33236491487767!3d17.45652888804282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d4e17%3A0x168c7e2c8f39c9a5!2sUniversity%20of%20Hyderabad!5e0!3m2!1sen!2sin!4v1648123456789!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cology Biosciences Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

