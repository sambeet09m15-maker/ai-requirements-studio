import { SignIn } from "@clerk/nextjs";
import { BrandLogo } from "@/components/BrandLogo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-8">
      <BrandLogo size="lg" theme="dark" align="center" />
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#1E293B] border border-slate-700 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-slate-400",
            socialButtonsBlockButton: "border-slate-600 text-white hover:bg-slate-700",
            formFieldInput: "bg-slate-800 border-slate-600 text-white",
            formFieldLabel: "text-slate-300",
            footerActionLink: "text-teal-400 hover:text-teal-300",
            formButtonPrimary: "bg-teal-600 hover:bg-teal-500",
          },
        }}
      />
    </div>
  );
}
