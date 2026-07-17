"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.reload();
      } else {
        setError(data.error || "Giriş başarısız");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Sunucuya bağlanırken bir hata oluştu");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "var(--soft)",
        fontFamily: "var(--font-geist-sans), sans-serif",
      }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl border transition-all duration-300 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: "var(--white)",
          borderColor: "var(--line)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {/* Top Decorative Border */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: "var(--red)" }}
        />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4 relative" style={{ height: "68px", width: "54px" }}>
            <Image
              src="/images/brand-icon-small.png"
              alt="Tarihi Van Kahvaltı Evi"
              fill
              sizes="54px"
              priority
              className="object-contain"
            />
          </div>
          <h1
            className="text-2xl font-serif tracking-wide"
            style={{ color: "var(--heritage-ink)" }}
          >
            <span style={{ color: "var(--red)", fontWeight: "bold" }}>Tarihi</span> Van
          </h1>
          <p
            className="text-xs uppercase tracking-widest mt-1 font-medium"
            style={{ color: "var(--muted)" }}
          >
            Kahvaltı Evi · Yönetim Paneli
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--ink-soft)" }}
            >
              Yönetici Şifresi
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors"
                style={{
                  borderColor: "var(--line)",
                  backgroundColor: "var(--white)",
                  color: "var(--ink)",
                }}
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5" style={{ color: "var(--muted)" }} />
              </div>
            </div>
          </div>

          {error && (
            <div
              className="text-sm p-3 rounded-lg border text-center transition-all animate-pulse"
              style={{
                backgroundColor: "#fff5f5",
                borderColor: "#feb2b2",
                color: "#c53030",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 shadow hover:opacity-90 active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
            style={{
              backgroundColor: "var(--red)",
              boxShadow: "var(--shadow-red)",
            }}
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <span>Giriş Yap</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          className="text-center text-xs mt-8"
          style={{ color: "var(--muted)" }}
        >
          Tarihi Van Kahvaltı Evi © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
