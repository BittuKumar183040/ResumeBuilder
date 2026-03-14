import { useState } from "react"
import { Plus, X, ChevronDown, ChevronRight, GraduationCap } from "lucide-react"
import Seperator from "../components/Seperator"

const Education = ({ education, setEducation }) => {
  const [collapsed, setCollapsed] = useState({})

  const toggleCollapse = (index) => {
    setCollapsed(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const updateField = (index, key, value) => {
    setEducation(prev =>
      prev.map((edu, i) =>
        i === index ? { ...edu, [key]: { ...edu[key], value } } : edu
      )
    )
  }

  const addEducation = () => {
    const template = {
      degree:   { label: "Degree",   className: "text-sm font-medium",  value: "" },
      location: { label: "Location", className: "italic text-sm",       value: "" },
      college:  { label: "College",  className: "font-medium text-xs",  value: "" },
      duration: { label: "Duration", className: "italic text-xs",       value: "" },
    }
    setEducation(prev => [...prev, template])
  }

  const removeEducation = (index) => {
    setEducation(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <GraduationCap size={14} className="text-emerald-500" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Education
          </h2>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">
        {education.map((edu, index) => {
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
                    {edu.degree.value || `Education ${index + 1}`}
                  </span>
                  {edu.duration.value && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
                      {edu.duration.value}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeEducation(index) }}
                  className="text-slate-300 hover:text-red-400 transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {!isCollapsed && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-slate-100">
                  {Object.entries(edu).map(([key, item]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </label>
                      <input
                        value={item.value}
                        onChange={(e) => updateField(index, key, e.target.value)}
                        placeholder={`Enter ${item.label.toLowerCase()}…`}
                        className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {education.length === 0 && (
          <button
            onClick={addEducation}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4 text-xs text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
          >
            + Add your education history
          </button>
        )}
      </div>
    </div>
  )
}

export default Education