import { useState } from "react"
import { Plus, X, ChevronDown, ChevronRight, Award } from "lucide-react"
import Seperator from "../components/Seperator"

const Certification = ({ certifications, setCertifications }) => {

  const [collapsed, setCollapsed] = useState({})

  const toggleCollapse = (index) => {
    setCollapsed(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const updateField = (index, key, value) => {
    setCertifications(prev =>
      prev.map((cert, i) =>
        i === index ? { ...cert, [key]: { ...cert[key], value } } : cert
      )
    )
  }

  const addCertification = () => {
    const template = {
      title:  { label: "Title",  className: "font-medium", value: "" },
      year:   { label: "Year",   className: "italic",      value: "" },
      issuer: { label: "Issuer", className: "",            value: "" },
    }
    setCertifications(prev => [...prev, template])
  }

  const removeCertification = (index) => {
    setCertifications(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <Award size={14} className="text-indigo-400" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Certifications
          </h2>
        </div>
        <button
          onClick={addCertification}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">
        {certifications.map((cert, index) => {
          const isCollapsed = collapsed[index]
          return (
            <div
              key={index}
              className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden"
            >
              <div
                className="flex justify-between items-center px-3 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                onClick={() => toggleCollapse(index)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-slate-400">
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </span>
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {cert.title.value || `Certification ${index + 1}`}
                  </span>
                  {cert.year.value && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
                      {cert.year.value}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeCertification(index) }}
                  className="text-slate-300 hover:text-red-400 transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Expanded body */}
              {!isCollapsed && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-slate-100">
                  {Object.entries(cert).map(([key, item]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </label>
                      <input
                        value={item.value}
                        onChange={(e) => updateField(index, key, e.target.value)}
                        placeholder={`Enter ${item.label.toLowerCase()}…`}
                        className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder:text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {certifications.length === 0 && (
          <button
            onClick={addCertification}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4 text-xs text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-colors"
          >
            + Add your first certification
          </button>
        )}
      </div>
    </div>
  )
}

export default Certification
