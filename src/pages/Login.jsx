import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GoogleCircleFilled } from "@ant-design/icons";
import { LucideEye, LucideEyeOff } from "lucide-react";
import Terms from "./components/Terms";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/resume");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">

        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-emerald-50 border border-emerald-200 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
                  Welcome Back
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
                Log in to your account
              </h1>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Sign up free
                </Link>
              </p>
            </div>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6">
              <GoogleCircleFilled />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email address
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-emerald-600 font-semibold hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <LucideEye />
                    ) : (
                      <LucideEyeOff />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all duration-200 hover:-translate-y-0.5 mt-2"
              >
                Log in to B2RB →
              </button>
            </div>
          </div>

          <Terms />
        </div>
      </section>
    </div>
  );
};

export default Login;