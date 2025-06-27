import { Mail, MapPin, Phone } from "lucide-react";
import industrial from "@/assets/industrial.png";
import { ContactCard, ContactForm, Footer, SplitSection } from "@/components";

export default function Page() {
  return (
    <main>
      <div className="mt-24 w-[85%] mx-auto mb-12">
        <h1 className="md:text-6xl text-3xl leading-relaxed">
          Let’s Power Your Production
        </h1>
        <p className="md:text-base text-sm text-gray-500 w-3/4 mb-8">
          We’re committed to delivering high-performance industrial solutions,
          whether you need advanced machinery, quality raw materials, or
          reliable spare parts. Our team is here to assist with product
          inquiries, custom quotes, technical support, and order
          tracking—anytime you need it.
        </p>

        <SplitSection
          image={industrial}
          title="About Us"
          description="We specialize in industrial machinery, raw materials, and spare parts—providing high-quality, reliable solutions for manufacturers and businesses. Since 2019, we've been committed to delivering performance, precision, and dependable support to keep your operations running at their best."
        />

        <div className="md:mt-8 mt-32">
          <h1 className="md:text-5xl text-2xl text-center md:my-8 my-4">
            Contact Us
          </h1>

          <div className="flex md:flex-row flex-col gap-8">
            <ContactCard
              icon={<MapPin />}
              title="Address"
              content="234 Hai Trieu, Ho Chi Minh City,
      Viet Nam"
            />
            <ContactCard
              icon={<Phone />}
              title="Contact Us"
              content="+84 234 567 890"
            />
            <ContactCard
              icon={<Mail />}
              title="Email"
              content="hello@3legant.com"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Map Placeholder */}
          <div>
            <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5159512822265!2d106.7023218751902!3d10.7717390893768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f414519d1f9%3A0xc0bd40da46e38fe0!2zxJAuIEjhuqNpIFRyaeG7gXUsIELhur9uIE5naMOpLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2sin!4v1751013922992!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
