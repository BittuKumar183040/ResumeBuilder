import { EyeFilled, GithubFilled, GoogleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Terms from "./components/Terms";
import { EyeClosed } from "lucide-react";
import GoogleButton from "../components/GoogleButton";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/getting-started");
  };

  const passwordStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
    if (pwd.length < 10) return { label: "Fair", color: "bg-yellow-400", width: "w-2/4" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 pb-10 overflow-hidden">

        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">

          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100 p-8">

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-emerald-50 border border-emerald-200 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
                  Free Forever · No Credit Card
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
                Create your account
              </h1>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            <GoogleButton />

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 pr-12 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <EyeFilled visible={showPassword} />
                  </button>
                </div>

                {strength && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                      />
                    </div>
                    <p className={`text-xs mt-1 font-medium
                      ${strength.label === "Weak" ? "text-red-500" : ""}
                      ${strength.label === "Fair" ? "text-yellow-500" : ""}
                      ${strength.label === "Good" ? "text-blue-500" : ""}
                      ${strength.label === "Strong" ? "text-emerald-600" : ""}
                    `}>
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 pr-12 text-sm text-gray-900 bg-gray-50 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                      ${form.confirm && form.confirm !== form.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <EyeFilled visible={showConfirm} />
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    Passwords do not match
                  </p>
                )}
                {form.confirm && form.confirm === form.password && (
                  <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                    <EyeClosed />
                    Passwords match
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all duration-200 hover:-translate-y-0.5 mt-2"
              >
                Create Account →
              </button>
            </div>
          </div>

          <Terms />
        </div>
      </section>
    </div>
  );
};

export default Signup;