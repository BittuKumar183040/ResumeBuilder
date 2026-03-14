import { useState } from "react"
import { Plus, X, ChevronDown, ChevronRight, Cpu } from "lucide-react"
import Seperator from "../components/Seperator"

const Skills = ({ skills, setSkills }) => {
  const [collapsedSkills, setCollapsedSkills] = useState({})

  const toggleCollapse = (index) => {
    setCollapsedSkills(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const updateField = (index, key, value) => {
    setSkills(prev =>
      prev.map((skill, i) =>
        i === index ? { ...skill, [key]: { ...skill[key], value } } : skill
      )
    )
  }

  const addSkill = () => {
    const template = {
      category: { label: "Category", className: "font-semibold text-sm", value: "" },
      items:    { label: "Skills",   className: "text-sm",               value: [] }
    }
    setSkills(prev => [...prev, template])
    setCollapsedSkills(prev => ({ ...prev, [skills.length]: false }))
  }

  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-emerald-500" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Technical Skills
          </h2>
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">
        {skills.map((skill, index) => {
          const isCollapsed = collapsedSkills[index]
          const itemCount = skill.items.value.filter(Boolean).length

          return (
            <div key={index} className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <div
                className="flex justify-between items-center px-3 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                onClick={() => toggleCollapse(index)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-slate-400">
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </span>
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {skill.category.value || `Skill ${index + 1}`}
                  </span>
                  {itemCount > 0 && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
                      {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeSkill(index) }}
                  className="text-slate-300 hover:text-red-400 transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {!isCollapsed && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {skill.category.label}
                    </label>
                    <input
                      value={skill.category.value}
                      onChange={(e) => updateField(index, "category", e.target.value)}
                      placeholder="e.g. Languages, Frameworks…"
                      className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {skill.items.label}
                      <span className="ml-1 normal-case font-normal text-slate-300">(comma-separated)</span>
                    </label>
                    <input
                      value={skill.items.value.join(", ")}
                      onChange={(e) =>
                        updateField(index, "items", e.target.value.split(",").map(s => s.trim()))
                      }
                      placeholder="React, TypeScript, Node.js…"
                      className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                    />
                    {skill.items.value.filter(Boolean).length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {skill.items.value.filter(Boolean).map((s, i) => (
                          <span key={i} className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {skills.length === 0 && (
          <button
            onClick={addSkill}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4 text-xs text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
          >
            + Add a skill category
          </button>
        )}
      </div>
    </div>
  )
}

export default Skills