import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const steps = [
  { id: 1, label: "Your Role" },
  { id: 2, label: "Experience" },
  { id: 3, label: "Your Goal" },
];

const roles = [
  { icon: "💻", label: "Software Engineer" },
  { icon: "🎨", label: "UI/UX Designer" },
  { icon: "📊", label: "Data Scientist" },
  { icon: "🛠️", label: "DevOps Engineer" },
  { icon: "📱", label: "Mobile Developer" },
  { icon: "🧠", label: "AI/ML Engineer" },
  { icon: "🔒", label: "Cybersecurity" },
  { icon: "📝", label: "Other" },
];

const experiences = [
  {
    icon: "🌱",
    label: "Fresher",
    desc: "0–1 years, just starting out",
  },
  {
    icon: "⚡",
    label: "Mid-Level",
    desc: "2–5 years of experience",
  },
  {
    icon: "🚀",
    label: "Senior",
    desc: "6–10 years, leading projects",
  },
  {
    icon: "👑",
    label: "Expert",
    desc: "10+ years, executive level",
  },
];

const goals = [
  { icon: "🏢", label: "Land a job at a top company" },
  { icon: "🔄", label: "Switch careers or industries" },
  { icon: "📈", label: "Get a promotion or raise" },
  { icon: "🌍", label: "Apply for remote opportunities" },
  { icon: "🎓", label: "Apply to grad school or internship" },
  { icon: "🧩", label: "Just improving my resume" },
];

const GettingStarted = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [selected, setSelected] = useState({ role: "", experience: "", goal: "" });

  const handleNext = () => {
    if (current < 3) setCurrent(current + 1);
    else navigate("/resume");
  };

  const handleBack = () => {
    if (current > 1) setCurrent(current - 1);
  };

  const canProceed = () => {
    if (current === 1) return !!selected.role;
    if (current === 2) return !!selected.experience;
    if (current === 3) return !!selected.goal;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* MAIN */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 pb-10 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl">

          <div className="hidden sm:flex items-center justify-center mb-4 gap-2">
            
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                      ${current > step.id
                        ? "bg-emerald-600 text-white"
                        : current === step.id
                        ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                        : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {current > step.id ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      current === step.id ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px transition-colors duration-300 ${current > step.id ? "bg-emerald-400" : "bg-gray-200"}`} />
                )}
              </React.Fragment>
            ))}

          </div>

          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-10 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(current / steps.length) * 100}%` }}
            />
          </div>

          {/* STEP 1 — Role */}
          {current === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-emerald-50 border border-emerald-200 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
                    Step 1 of 3
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                  What's your role?
                </h1>
                <p className="text-gray-500 text-base">
                  We'll tailor your resume templates and ATS keywords to match your field.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {roles.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setSelected({ ...selected, role: label })}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200
                      ${selected.role === label
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100"
                        : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Experience */}
          {current === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-emerald-50 border border-emerald-200 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
                    Step 2 of 3
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                  Your experience level?
                </h1>
                <p className="text-gray-500 text-base">
                  This helps us highlight the right sections and structure for your resume.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experiences.map(({ icon, label, desc }) => (
                  <button
                    key={label}
                    onClick={() => setSelected({ ...selected, experience: label })}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200
                      ${selected.experience === label
                        ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                        : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                  >
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <div className={`font-bold text-base ${selected.experience === label ? "text-emerald-700" : "text-gray-800"}`}>
                        {label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                    </div>
                    {selected.experience === label && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Goal */}
          {current === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-emerald-50 border border-emerald-200 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
                    Step 3 of 3
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                  What's your main goal?
                </h1>
                <p className="text-gray-500 text-base">
                  We'll optimize your resume content and ATS score around your objective.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setSelected({ ...selected, goal: label })}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 text-sm font-semibold text-left transition-all duration-200
                      ${selected.goal === label
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100"
                        : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                  >
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <span>{label}</span>
                    {selected.goal === label && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:border-gray-400 hover:text-gray-900 transition-all duration-200
                ${current === 1 ? "invisible" : ""}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl transition-all duration-200
                ${canProceed()
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              {current === 3 ? "Build My Resume →" : "Continue →"}
            </button>
          </div>

          {/* Skip */}
          <p className="text-center mt-5">
            <button
              onClick={() => navigate("/resume")}
              className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
            >
              Skip for now
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default GettingStarted;