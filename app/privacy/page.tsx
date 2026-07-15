export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for BA Copilot - how we collect, use and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px", fontFamily: "system-ui, sans-serif", color: "#1e293b", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Privacy Policy</h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>Last updated: July 2025</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>1. Who We Are</h2>
      <p>BA Copilot (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an AI-powered Business Analysis productivity tool available at bacopilot.ai. We are operated by an individual developer based in India.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>2. What Data We Collect</h2>
      <p>We collect the following information when you use BA Copilot:</p>
      <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
        <li><strong>Account information</strong> — your name and email address when you sign up via Google or email through Clerk.</li>
        <li><strong>Usage data</strong> — the requirements you paste into the tool for AI processing, document generation count, and workspace data stored in your browser.</li>
        <li><strong>Technical data</strong> — page views, browser type, and device type collected via Vercel Analytics.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>3. How We Use Your Data</h2>
      <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
        <li>To provide and improve the BA Copilot service</li>
        <li>To generate AI-powered BA documentation from your requirements</li>
        <li>To manage your account and subscription</li>
        <li>To send important service updates (no marketing emails without consent)</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>4. Data Storage and Security</h2>
      <p>Your account data is stored securely by Clerk (clerk.com). Your requirement inputs are processed by OpenAI&apos;s API and are not stored permanently by us. Workspace and history data is stored locally in your browser. We do not store payment card details — all payments are processed by Razorpay.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>5. Third Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
        <li><strong>Clerk</strong> — authentication and user management</li>
        <li><strong>OpenAI</strong> — AI document generation</li>
        <li><strong>Vercel</strong> — hosting and analytics</li>
        <li><strong>Razorpay</strong> — payment processing (when applicable)</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>6. Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal data at any time. To request data deletion, email us at sambeet09m15@gmail.com and we will action it within 7 working days.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>7. Cookies</h2>
      <p>We use essential cookies for authentication only. We do not use advertising or tracking cookies.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>8. Contact</h2>
      <p>For any privacy-related queries contact us at: <a href="mailto:sambeet09m15@gmail.com" style={{ color: "#0d9488" }}>sambeet09m15@gmail.com</a></p>
    </div>
  );
}
