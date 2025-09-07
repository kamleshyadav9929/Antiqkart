import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUsPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        <Layout>
          <div className="py-16 md:py-24">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-text">
                Get In Touch
              </h1>
              <p className="mt-4 text-lg text-muted">
                We'd love to hear from you. Whether you have a question,
                feedback, or just want to say hello, our team is ready to assist
                you.
              </p>
            </div>

            {/* Content Grid */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-serif font-semibold text-text mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-slate-800 text-white font-semibold rounded-md hover:bg-slate-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">Email</h3>
                    <p className="text-muted">
                      Reach out to us for any inquiries or support.
                    </p>
                    <a
                      href="mailto:support@antiqkart.com"
                      className="text-accent hover:underline"
                    >
                      support@antiqkart.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">Phone</h3>
                    <p className="text-muted">
                      Our team is available from 9am to 6pm IST.
                    </p>
                    <a
                      href="tel:+911234567890"
                      className="text-accent hover:underline"
                    >
                      +91 12345 67890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">Office</h3>
                    <p className="text-muted">
                      123 Artisan Lane, Jaipur, Rajasthan, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default ContactUsPage;
