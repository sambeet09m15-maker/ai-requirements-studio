import { APP_NAME } from "@/lib/brand";

export const metadata = {
  title: "Refund & Cancellation Policy",
  description: `Refund and cancellation policy for ${APP_NAME} Pro subscriptions.`,
};

export default function RefundPolicy() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px", fontFamily: "system-ui, sans-serif", color: "#1e293b", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Refund and Cancellation Policy</h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>Last updated: July 2025</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>1. Free Plan</h2>
      <p>The Free plan is available at no cost and does not require payment details. No refund applies to the Free plan.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>2. Pro Plan Subscription</h2>
      <p>The Pro plan is billed monthly at ₹599 per month or annually at ₹4,999 per year. Subscriptions auto-renew unless cancelled before the renewal date.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>3. Cancellation</h2>
      <p>You may cancel your Pro subscription at any time by emailing sambeet09m15@gmail.com or through your account settings. Cancellation takes effect at the end of the current billing period. You will continue to have Pro access until the period ends.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>4. Refund Policy</h2>
      <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
        <li><strong>Within 7 days of first payment</strong> — full refund available if you are not satisfied. Email sambeet09m15@gmail.com within 7 days of your first Pro payment.</li>
        <li><strong>After 7 days</strong> — no refunds are issued for the current billing period. You may cancel to prevent future charges.</li>
        <li><strong>Annual plan</strong> — refunds for annual plans are considered on a case-by-case basis within 7 days of payment.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>5. How to Request a Refund</h2>
      <p>Email <a href="mailto:sambeet09m15@gmail.com" style={{ color: "#0d9488" }}>sambeet09m15@gmail.com</a> with subject line &quot;Refund Request&quot; and include your registered email address. We will process eligible refunds within 5-7 working days.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>6. Payment Processing</h2>
      <p>All payments are processed by Razorpay. Refunds will be returned to the original payment method. Processing time depends on your bank or card provider.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>7. Contact</h2>
      <p>For any payment or refund queries: <a href="mailto:sambeet09m15@gmail.com" style={{ color: "#0d9488" }}>sambeet09m15@gmail.com</a></p>
    </div>
  );
}
