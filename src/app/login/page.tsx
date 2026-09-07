"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Safely parse JSON only if response content exists
      const contentType = res.headers.get("content-type");
      const data = contentType && contentType.includes("application/json")
        ? await res.json()
        : {};

      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push(params.get("next") || "/");
      router.refresh();
    } catch (err) {
      setLoading(false);
      setError("An unexpected network error occurred. Please try again.");
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="font-display text-3xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 border-line px-4 py-3 rounded-none focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 border-line px-4 py-3 rounded-none focus:outline-none focus:border-black"
        />
        {error && <p className="text-red-600 text-burgundy text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white bg-ink text-ivory px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 hover:bg-burgundy transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-600 text-ink/60">
        No account?{" "}
        <Link href="/register" className="underline hover:text-black">
          Register
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-sm mx-auto py-10 text-center text-sm text-gray-500">Loading page...</div>}>
      <LoginForm />
    </Suspense>
  );
}