import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { Mail, Phone, Send } from "lucide-react";

const ContactUsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center">
        <Layout>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* --- Header --- */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-text">
                  Get In Touch
                </h1>
                <p className="mt-3 text-base text-muted">
                  Have a question or feedback? Fill out the form below to get in
                  touch with us.
                </p>
              </div>

              {/* --- Main Content Grid --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-center">
                {/* --- Left Column: Contact Info --- */}
                <div className="space-y-6">
                  <InfoCard
                    icon={<Mail size={22} />}
                    title="Email Us"
                    content="9929raoyadav6@gmail.com"
                    link="mailto:9929raoyadav6@gmail.com"
                  />
                  <InfoCard
                    icon={<Phone size={22} />}
                    title="Call Us"
                    content="+91 6377964293"
                    link="tel:+916377964293"
                  />
                </div>

                {/* --- Right Column: Contact Form --- */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition text-sm"
                        placeholder="Your message..."
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-x-2 py-2.5 px-4 bg-slate-950 text-white font-semibold rounded-md hover:bg-slate-800 transition-colors text-sm"
                      >
                        Send Message <Send size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
};

// --- Helper Component for Info Cards ---
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content, link }) => {
  const contentElement = link ? (
    <a
      href={link}
      className="text-accent hover:underline break-words text-base"
    >
      {content}
    </a>
  ) : (
    <p className="text-muted break-words text-base">{content}</p>
  );

  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full text-accent">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        {contentElement}
      </div>
    </div>
  );
};

export default ContactUsPage;
