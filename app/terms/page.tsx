import SEO from "../../components/SEO"

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for Telegram Forum"
        keywords="terms, conditions, legal, telegram forum"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <p>Last updated: [Date]</p>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Telegram Forum website, you agree to comply with and be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our service.
          </p>
          <h2>2. Description of Service</h2>
          <p>
            Telegram Forum provides a platform for users to share and discover Telegram channels and groups. We do not
            own or control the content shared by users.
          </p>
          <h2>3. User Responsibilities</h2>
          <p>
            You are responsible for your use of the service and any content you post. Content that is illegal,
            offensive, or violates any third party's rights is prohibited.
          </p>
          <h2>4. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are owned by Telegram Forum and are
            protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the service immediately, without prior notice or
            liability, under our sole discretion, for any reason whatsoever and without limitation.
          </p>
          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Telegram Forum, nor its directors, employees, partners, agents, suppliers, or affiliates,
            be liable for any indirect, incidental, special, consequential or punitive damages.
          </p>
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. It is your responsibility to check the
            Terms periodically for changes.
          </p>
          <h2>8. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at [contact email].</p>
        </div>
      </div>
    </>
  )
}

