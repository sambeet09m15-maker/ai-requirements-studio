"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { readHistory } from "@/lib/historyStorage";
import { readWorkspaces } from "@/lib/workspaceStorage";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/brand";

const proFeatures = ["Unlimited generations", "All 10 document types", "Export Word/PDF", "Gap Coverage Checker"];

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  const [documentsSaved, setDocumentsSaved] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    function refresh() {
      setDocumentsSaved(readHistory().length);
      setWorkspaceCount(readWorkspaces().length);
    }

    refresh();
    window.addEventListener("ba-history-changed", refresh);
    window.addEventListener("ba-workspaces-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ba-history-changed", refresh);
      window.removeEventListener("ba-workspaces-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  async function handleDeleteAccount() {
    if (!user) return;
    const confirmed = window.confirm("This permanently deletes your account and data. Continue?");
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError("");
    try {
      await user.delete();
      router.push("/");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Could not delete your account. Please try again.");
      setDeleting(false);
    }
  }

  if (!isLoaded || !isSignedIn || !user) {
    return <div className="min-h-screen bg-[#0F172A]" />;
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex size-9 items-center justify-center rounded-md border border-slate-700 bg-[#1E293B] text-slate-300 transition hover:text-white"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-2xl font-semibold text-white">My Profile</h1>
        </div>

        <div className="space-y-5">
          {/* Account card */}
          <section className="rounded-lg border border-slate-700 bg-[#1E293B] p-5 shadow-2xl">
            <div className="flex items-center gap-4">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt={user.fullName || "User avatar"} className="size-12 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="size-12 shrink-0 rounded-full bg-slate-700" />
              )}
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-white">{user.fullName || "Unnamed user"}</p>
                <p className="truncate text-sm text-slate-400">{user.primaryEmailAddress?.emailAddress}</p>
                {memberSince ? <p className="mt-1 text-xs text-slate-500">Member since {memberSince}</p> : null}
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">Free</span>
            </div>
          </section>

          {/* Usage card */}
          <section className="rounded-lg border border-slate-700 bg-[#1E293B] p-5 shadow-2xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Usage</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-700 bg-slate-800/60 p-4">
                <p className="text-xs text-slate-400">Documents Saved</p>
                <p className="mt-1 text-xl font-semibold text-white">{documentsSaved}</p>
              </div>
              <div className="rounded-md border border-slate-700 bg-slate-800/60 p-4">
                <p className="text-xs text-slate-400">Workspaces</p>
                <p className="mt-1 text-xl font-semibold text-white">{workspaceCount}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">AI runs are limited to 10 per day, shown near the generate button on the dashboard.</p>
          </section>

          {/* Upgrade card */}
          <section className="rounded-lg border border-slate-700 bg-[#1E293B] p-5 shadow-2xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Free vs Pro</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-700 bg-slate-800/60 p-4">
                <p className="text-sm font-semibold text-slate-300">Free during beta</p>
                <p className="mt-2 text-sm text-slate-500">Your current plan</p>
              </div>
              <div className="rounded-md border border-teal-600/40 bg-teal-500/5 p-4">
                <p className="text-sm font-semibold text-teal-400">Pro (coming soon)</p>
                <ul className="mt-2 space-y-1.5">
                  {proFeatures.map((feature) => (
                    <li key={feature} className="text-sm text-slate-300">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Notify me — ${APP_NAME} Pro`}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-teal-600 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              Notify me when Pro launches
            </a>
          </section>

          {/* Actions card */}
          <section className="rounded-lg border border-slate-700 bg-[#1E293B] p-5 shadow-2xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Actions</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openUserProfile()}
                className="flex-1 rounded-md border border-slate-600 bg-slate-800 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex-1 rounded-md bg-teal-600 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
              >
                Sign Out
              </button>
            </div>
          </section>

          {/* Danger zone */}
          <section className="rounded-lg border border-red-900/50 bg-[#1E293B] p-5 shadow-2xl">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-red-400">Danger Zone</h2>
            {user.deleteSelfEnabled ? (
              <>
                <p className="mb-3 text-sm text-slate-400">
                  Permanently deletes your account and all associated data. This cannot be undone.
                </p>
                {deleteError ? <p className="mb-3 text-sm text-red-400">{deleteError}</p> : null}
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="w-full rounded-md border border-red-800 bg-red-950/40 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-950/70 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting…" : "Delete Account"}
                </button>
              </>
            ) : (
              <p className="text-sm text-slate-400">
                Self-service account deletion isn&apos;t enabled yet. Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}?subject=Delete my account - ${APP_NAME}`} className="text-teal-400 underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will delete your account.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
