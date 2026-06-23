import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Family Toilet Japan",
  description: "Privacy policy for Family Toilet Japan",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/" className="text-sky-600 text-sm hover:underline">← Back to Home</Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-8">Privacy Policy</h1>

        <div className="text-gray-700 space-y-6 text-sm leading-relaxed">
          <p className="text-gray-400 text-xs">Last updated: June 2026</p>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">1. Overview</h2>
            <p>
              Family Toilet Japan is a free web application that helps users find family-friendly
              public toilets in Japan. We are committed to protecting your privacy. This policy
              explains what information we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">2. Information We Collect</h2>
            <h3 className="font-medium text-gray-700 mb-1">Location Data</h3>
            <p>
              When you use the &quot;Find Toilets Near Me&quot; feature, your browser may request your
              device&apos;s GPS location. This data is used solely to show nearby toilets on the map
              and is never transmitted to our servers or stored.
            </p>
            <h3 className="font-medium text-gray-700 mt-3 mb-1">Analytics (Google Analytics 4)</h3>
            <p>
              We use Google Analytics 4 (GA4) to understand how visitors use our site — which
              pages are visited, how long users stay, and which features are most popular. GA4
              collects anonymous, aggregated data. No personally identifiable information is
              collected. You can opt out using the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
            <h3 className="font-medium text-gray-700 mt-3 mb-1">Advertising (Google AdSense)</h3>
            <p>
              We use Google AdSense to display advertisements. Google may collect anonymous usage
              data and set cookies to serve personalized ads. You can opt out via{" "}
              <a href="https://www.google.com/settings/ads" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">
                Google Ad Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">3. Cookies &amp; Local Storage</h2>
            <p>
              We use localStorage to remember your language preference and whether you have
              dismissed the app install banner. No personal information is stored.
              Google AdSense may set third-party cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">4. Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Google Analytics 4</strong> — anonymous usage analytics (
                <a href="https://policies.google.com/privacy" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                )
              </li>
              <li>
                <strong>OpenStreetMap</strong> — map tiles and toilet data (
                <a href="https://www.openstreetmap.org/copyright" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">ODbL license</a>
                )
              </li>
              <li>
                <strong>Google AdSense</strong> — advertising (
                <a href="https://policies.google.com/privacy" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                )
              </li>
              <li><strong>Vercel</strong> — hosting (standard server access logs only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">5. Data Retention</h2>
            <p>
              We do not operate a database of user data. Location data is processed in your
              browser only and is never sent to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">6. Children&apos;s Privacy</h2>
            <p>
              Our service is designed for families and is safe for all ages. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">7. Contact</h2>
            <p>
              If you have any questions about this privacy policy, please contact us via our{" "}
              <a href="https://forms.gle/rs3vP7d6srW1pGHs7" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">
                contact form
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
