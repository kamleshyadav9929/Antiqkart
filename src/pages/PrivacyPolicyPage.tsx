import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

const PrivacyPolicyPage = () => {
  const lastUpdated = "September 28, 2025";

  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        <Layout>
          <div className="max-w-4xl mx-auto py-16 md:py-24 text-slate-700">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Last Updated: {lastUpdated}
              </p>
            </div>

            <div className="prose prose-lg max-w-none prose-h2:font-serif prose-h2:text-slate-800 prose-a:text-amber-600">
              <h2>1. Introduction</h2>
              <p>
                Welcome to AntiqKart. We are committed to protecting your
                privacy and handling your personal information with care. This
                Privacy Policy outlines how we collect, use, disclose, and
                safeguard your information when you visit our website. By using
                our site, you agree to the collection and use of information in
                accordance with this policy.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The
                information we may collect on the Site includes:
              </p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> Personally identifiable
                  information, such as your name and email address, that you
                  voluntarily give to us when you register with the Site (e.g.,
                  using Clerk for authentication) or when you choose to
                  participate in various activities related to the Site.
                </li>
                <li>
                  <strong>Derivative Data:</strong> Information our servers
                  automatically collect when you access the Site, such as your
                  IP address, your browser type, your operating system, your
                  access times, and the pages you have viewed directly before
                  and after accessing the Site.
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you
                with a smooth, efficient, and customized experience.
                Specifically, we may use information collected about you via the
                Site to:
              </p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Increase the efficiency and operation of the Site.</li>
                <li>
                  Monitor and analyze usage and trends to improve your
                  experience with the Site.
                </li>
              </ul>

              <h2>4. Affiliate Disclosure</h2>
              <p>
                AntiqKart is a participant in the Amazon Services LLC Associates
                Program, an affiliate advertising program designed to provide a
                means for sites to earn advertising fees by advertising and
                linking to Amazon.com and affiliated sites. When you click on a
                product link and make a purchase on Amazon, we may receive a
                small commission at no extra cost to you. This relationship does
                not influence our curation process, and our primary goal is to
                connect you with authentic Indian handicrafts.
              </p>

              <h2>5. Use of Third-Party Services</h2>
              <p>
                We use third-party services for specific functionalities on our
                website. Please be aware of their respective privacy policies:
              </p>
              <ul>
                <li>
                  <strong>Clerk:</strong> We use Clerk for user authentication
                  (Sign-In and Sign-Up). Clerk handles your authentication data,
                  and your interaction with it is governed by Clerk's Privacy
                  Policy.
                </li>
                <li>
                  <strong>Supabase:</strong> Our backend and database are
                  powered by Supabase. Data you provide or that is generated
                  through your use of the site is stored on Supabase servers,
                  governed by their Privacy Policy.
                </li>
              </ul>

              <h2>6. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide
                to us, please be aware that despite our efforts, no security
                measures are perfect or impenetrable, and no method of data
                transmission can be guaranteed against any interception or other
                type of misuse.
              </p>

              <h2>7. Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13.
              </p>

              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. You are advised to review this Privacy Policy
                periodically for any changes.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us via the information provided on our{" "}
                <a href="/contact">Contact Us page</a>.
              </p>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default PrivacyPolicyPage;
