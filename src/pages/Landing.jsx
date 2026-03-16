import { GithubFilled } from "@ant-design/icons";
import { ArrowBigRight, ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
              ATS-Optimized · Free
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
            Build Résumés That{" "}
            <span className="italic text-emerald-600 font-serif">
              Actually Get Hired
            </span>
            <br />
            <span className="text-gray-400 font-light">Not Just Ignored</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Stop getting ghosted by automated screeners.{" "}
            <span className="text-gray-800 font-semibold">Betoo Resume Builder</span>{" "}
            helps developers and professionals build{" "}
            <span className="text-gray-800 font-semibold">
              ATS-friendly resumes
            </span> that pass filters and land in front of real hiring managers — in
            minutes, not hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button className="px-7 py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all duration-200 hover:-translate-y-0.5">
              Build My Resume — Free
            </button>
            
            <Link to="/templates" className="px-7 py-3.5 bg-white text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all duration-200">
              View Templates →
            </Link>
          </div>

          {/* <div className="flex items-center justify-center divide-x divide-gray-200">
            {[
              { num: "98%", label: "ATS Pass Rate" },
              { num: "12k+", label: "Resumes Built" },
              { num: "3 min", label: "Avg. Build Time" },
            ].map(({ num, label }) => (
              <div key={label} className="px-8 first:pl-0 last:pr-0 text-center">
                <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  {num}
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-widest uppercase mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div> */}
        </div>

        <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {[
            { icon: "🎯", text: "ATS Keyword Analyzer" },
            { icon: "⚡", text: "Dev-First Templates" },
            { icon: "📄", text: "One-Click PDF Export" },
            { icon: "✦", text: "Real-Time Feedback" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 cursor-default"
            >
              <span>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;