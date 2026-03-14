import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CheckCircle, Lock } from "lucide-react";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    tag: "ATS Safe",
    tagColor: "bg-slate-100 text-slate-600 border-slate-200",
    desc: "Ultra-clean layout with maximum whitespace. Lets your content speak.",
    accent: "bg-slate-800",
    lines: [60, 85, 50, 75, 55],
  },
  {
    id: "modern",
    name: "Modern",
    tag: "Dev Favorite",
    tagColor: "bg-blue-100 text-blue-700 border-blue-200",
    desc: "Two-column layout built for developers. Highlights tech stacks clearly.",
    accent: "bg-blue-600",
    lines: [80, 65, 90, 50, 70],
  },
  {
    id: "sharp",
    name: "Sharp",
    tag: "New",
    tagColor: "bg-violet-100 text-violet-700 border-violet-200",
    desc: "Bold headings and strong hierarchy. Great for senior roles and leadership.",
    accent: "bg-violet-600",
    lines: [75, 55, 85, 65, 90],
  },
  {
    id: "compact",
    name: "Compact",
    tag: "1-Page Fit",
    tagColor: "bg-amber-100 text-amber-700 border-amber-200",
    desc: "Tight spacing designed to fit everything on one page without sacrificing clarity.",
    accent: "bg-amber-500",
    lines: [65, 90, 60, 80, 50],
  }
];

const TemplatePreview = ({ template, isHovered }) => (
  <div
    className={`w-full aspect-3/4 bg-white rounded-lg border flex flex-col gap-1.5 overflow-hidden transition-all duration-200
      ${isHovered ? "border-emerald-300 shadow-md" : "border-slate-200"}`}
  >
    {template.id === "minimal" ? (
      <img src={`/template/${template.id}.jpg`} alt={`${template.name} preview`} className=" object-cover rounded" />
    ) : (
      <>
        <div className="flex flex-col gap-1">
          <div className={`h-2 w-2/3 rounded-full ${template.accent}`} />
          <div className="h-1 w-1/2 rounded-full bg-slate-200" />
          <div className="h-1 w-3/4 rounded-full bg-slate-100" />
        </div>

        <div className={`h-px w-full ${template.accent} opacity-30`} />

        <div className="flex flex-col gap-1">
          <div className="h-1 w-1/3 rounded-full bg-slate-300" />
          {template.lines.slice(0, 3).map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
          ))}
        </div>

        <div className="relative flex flex-col gap-1 mt-0.5">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white/90 z-10 rounded" />
          <div className="h-px w-full bg-slate-200 opacity-40" />
          <div className="h-1 w-1/4 rounded-full bg-slate-200 opacity-50" />
          {[60, 75].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-slate-100 opacity-40" style={{ width: `${w}%` }} />
          ))}
        </div>

        <div className="relative flex flex-col gap-1 mt-0.5 opacity-30">
          <div className="absolute inset-0 bg-white/70 z-10 rounded" />
          <div className="h-px w-full bg-slate-200" />
          <div className="h-1 w-1/4 rounded-full bg-slate-200" />
          {[50, 65, 40].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
          ))}
        </div>
      </>)}
  </div>
);

const Templates = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleUseTemplate = (id) => {
    navigate(`/resume?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-52 h-52 bg-emerald-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
                {templates.length} ATS-Ready Templates
              </span>
            </div> */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Pick your{" "}
              <span className="italic text-emerald-600 font-serif">
                perfect template
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every template is optimized for ATS systems and designed to make
              recruiters stop scrolling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => {
              const isFirst = index === 0;
              const isSelected = selected === template.id;
              const isHovered = hovered === template.id;

              if (!isFirst) {
                return (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-2xl border-2 border-slate-100 overflow-hidden opacity-50 cursor-not-allowed select-none"
                  >
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-white/60 backdrop-blur-[2px]">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 border border-slate-200">
                        <Lock size={15} className="text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Coming Soon
                      </span>
                    </div>

                    <div className="p-2 pb-2 bg-slate-50 blur-[1px]">
                      <TemplatePreview template={template} isHovered={false} />
                    </div>

                    <div className="p-2 blur-[1px]">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-extrabold text-slate-800 tracking-tight">
                          {template.name}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${template.tagColor}`}>
                          {template.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {template.desc}
                      </p>
                      <div className="flex gap-2">
                        <div className="flex-1 py-2 bg-slate-200 rounded-lg" />
                        <div className="px-6 py-2 bg-slate-100 rounded-lg" />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={template.id}
                  onClick={() => setSelected(template.id)}
                  onMouseEnter={() => setHovered(template.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden
                    ${isSelected
                      ? "border-emerald-500 shadow-xl shadow-emerald-100"
                      : "border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-100"
                    }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle size={18} />
                    </div>
                  )}

                  <div className="p-2 pb-2">
                    <TemplatePreview template={template} isHovered={isHovered} />
                  </div>

                  <div className="p-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-extrabold text-slate-800 tracking-tight">
                        {template.name}
                      </h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${template.tagColor}`}>
                        {template.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {template.desc}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseTemplate(template.id);
                        }}
                        className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        Use Template →
                      </button>
                      <a
                        href={`/preview?template=${template.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-2 bg-white text-slate-600 text-xs font-semibold rounded-lg border border-slate-200 hover:border-slate-400 transition-all duration-200 flex items-center"
                      >
                        Preview
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          {selected && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => handleUseTemplate(selected)}
                className="px-10 py-4 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all duration-200 hover:-translate-y-0.5"
              >
                Continue with {templates.find((t) => t.id === selected)?.name} →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Templates;