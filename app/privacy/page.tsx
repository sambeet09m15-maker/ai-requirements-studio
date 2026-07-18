import { APP_NAME } from "@/lib/brand";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${APP_NAME} - how we collect, use and protect your data.`,
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px", fontFamily: "system-ui, sans-serif", color: "#1e293b", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Privacy Policy</h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>Last updated: July 19, 2026</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>1. What {APP_NAME} is.</h2>
      <p>{APP_NAME} is a free learning and training tool for business analysts and students. It helps you practice writing requirements and get AI-generated feedback.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>2. What you should not enter.</h2>
      <p>{APP_NAME} is for practice only. Do not enter confidential company information, client data, personal details of others, or any sensitive information. Use sample or made-up requirements. Any data you choose to submit is at your own risk.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>3. What information we collect.</h2>
      <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
        <li><strong>Account information</strong> — name and email at sign-up, handled by Clerk, our authentication provider.</li>
        <li><strong>Text you submit</strong> — practice requirements are sent to OpenAI&apos;s API to generate feedback. We do not sell this text or use it for advertising.</li>
        <li><strong>Usage counts</strong> — daily AI run counts, only to apply fair-use limits.</li>
        <li><strong>Visit statistics</strong> — anonymous overall visitor numbers via Vercel Analytics. This does not identify you personally.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>4. How your information is used.</h2>
      <p>Only to run the service: signing you in, generating feedback, applying daily limits, and understanding overall usage.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>5. Who we share data with.</h2>
      <p>Only the services that make the app work: Clerk (login), OpenAI (AI generation), Vercel (hosting and analytics). We do not sell your data.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", marginTop: "32px" }}>6. Your account, your control.</h2>
      <p>You can delete your account yourself anytime from your profile page. Deleting your account removes your data from the service.</p>
    </div>
  );
}
