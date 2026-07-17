"use client";

import { useState } from "react";

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
        setError(data.error || "Şifre doğrulanamadı");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Bağlantı hatası");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 select-none"
      style={{
        backgroundColor: "#008080", // Classic Win95 Teal
        fontFamily: "'Courier New', Courier, monospace, sans-serif",
      }}
    >
      {/* Classic 3D Window Container */}
      <div
        className="w-full max-w-sm p-1 border-b-2 border-r-2 border-black"
        style={{
          backgroundColor: "#c0c0c0", // Win95 Gray
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #808080",
          borderBottom: "2px solid #808080",
          boxShadow: "1px 1px 0px 0px #000000",
        }}
      >
        {/* Title Bar */}
        <div
          className="px-2 py-1 flex items-center justify-between text-white font-bold select-none text-sm"
          style={{
            background: "linear-gradient(90deg, #000080, #1084d0)", // Win95 Dark Blue Gradient
          }}
        >
          <div className="flex items-center space-x-1">
            <span>🔒</span>
            <span style={{ fontSize: "11px" }}>Tarihi Van - Oturum Aç</span>
          </div>
          <div className="flex space-x-1">
            <button
              type="button"
              className="w-4 h-4 text-black text-xs font-bold flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: "#c0c0c0",
                borderTop: "1px solid #ffffff",
                borderLeft: "1px solid #ffffff",
                borderRight: "1px solid #808080",
                borderBottom: "1px solid #808080",
              }}
            >
              ?
            </button>
            <button
              type="button"
              className="w-4 h-4 text-black text-xs font-bold flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: "#c0c0c0",
                borderTop: "1px solid #ffffff",
                borderLeft: "1px solid #ffffff",
                borderRight: "1px solid #808080",
                borderBottom: "1px solid #808080",
              }}
            >
              x
            </button>
          </div>
        </div>

        {/* Dialog Body */}
        <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
          {/* Key Icon */}
          <div
            className="w-12 h-12 flex items-center justify-center bg-gray-300 text-3xl rounded border"
            style={{
              borderTop: "1px solid #808080",
              borderLeft: "1px solid #808080",
              borderRight: "1px solid #ffffff",
              borderBottom: "1px solid #ffffff",
              backgroundColor: "#c0c0c0",
            }}
          >
            🔑
          </div>

          <form onSubmit={handleSubmit} className="flex-grow space-y-4 w-full">
            <p className="text-xs text-black font-semibold leading-tight">
              Sisteme erişmek için lütfen yönetici şifrenizi girin.
            </p>

            {/* Password input */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-[11px] font-bold text-black"
              >
                Şifre:
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full px-2 py-1 text-sm bg-white text-black outline-none focus:bg-white"
                style={{
                  borderTop: "2px solid #808080",
                  borderLeft: "2px solid #808080",
                  borderRight: "2px solid #ffffff",
                  borderBottom: "2px solid #ffffff",
                }}
                disabled={loading}
              />
            </div>

            {error && (
              <div
                className="text-[11px] p-2 text-red-800 font-bold border border-red-500 bg-red-100"
                style={{
                  borderTop: "2px solid #808080",
                  borderLeft: "2px solid #808080",
                  borderRight: "2px solid #ffffff",
                  borderBottom: "2px solid #ffffff",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 text-xs text-black font-bold active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #808080",
                  borderBottom: "2px solid #808080",
                  boxShadow: "1px 1px 0px 0px #000000",
                }}
              >
                {loading ? "..." : "Tamam"}
              </button>

              <button
                type="button"
                onClick={() => setPassword("")}
                className="px-4 py-1.5 text-xs text-black font-bold cursor-pointer"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #808080",
                  borderBottom: "2px solid #808080",
                  boxShadow: "1px 1px 0px 0px #000000",
                }}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
