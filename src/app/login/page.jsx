"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postHit } from "../lib/customHit";
import { login } from "../lib/utilities";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { res, err } = await postHit(login, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res) {
      router.push("/blogs/my");
    } else {
      setError(err.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-12 rounded-3xl shadow-xl border-t-4 border-[#504da6]">
        <h2 className="text-4xl font-bold text-[#504da6] text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-xl font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-gray-800 w-full px-5 py-4 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#504da6]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xl font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-gray-800 w-full px-5 py-4 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#504da6]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#504da6] text-white text-xl font-semibold px-5 py-4 rounded-xl shadow-lg 
                        hover:bg-[#3f3c8c] transition"
          >
            Login
          </button>
          <div className="text-center">
          <p className="mt-4 text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="align-center text-[#504da6] font-semibold hover:underline">
                Register
                </a>
            </p>
            </div>
        </form>
        {error && <div className="mt-6 text-red-600 font-semibold text-center text-lg">{error}</div>}
      </div>
    </div>
  );
}
