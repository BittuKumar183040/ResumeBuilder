import { useRef, useEffect, useState } from "react"
import Seperator from "../components/Seperator"
import { X, ChevronDown, ChevronRight, Plus, Briefcase, AlignLeft } from "lucide-react"

const childrenToHTML = (node) => {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(childrenToHTML).join("")
  if (node?.type === "span") {
    return `<span class="${node.props.className}">${childrenToHTML(node.props.children)}</span>`
  }
  return ""
}

const getHTML = (li) => {
  return (
    li?.props?.dangerouslySetInnerHTML?.__html ??
    childrenToHTML(li?.props?.children)
  )
}

const EditableBullet = ({ html, onChange, onEnter }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== html) {
      ref.current.innerHTML = html
    }
  }, [html])

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all min-h-[36px]"
      onInput={(e) => onChange(e.currentTarget.innerHTML)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          onEnter()
        }
      }}
    />
  )
}

const Experience = ({ experiences, setExperiences }) => {
  const [collapsedExperiences, setCollapsedExperiences] = useState(
    () => Object.fromEntries(experiences.map((_, i) => [i, true]))
  )
  const [descCollapsed, setDescCollapsed] = useState({})

  const toggleCollapse = (index) => {
    setCollapsedExperiences(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleDesc = (index) => {
    setDescCollapsed(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const setterOuterKeys = (index, key, value) => {
    setExperiences(prev =>
      prev.map((exp, i) =>
        i === index ? { ...exp, [key]: { ...exp[key], value } } : exp
      )
    )
  }

  const updateDescription = (expIndex, descIndex, html) => {
    setExperiences(prev =>
      prev.map((exp, i) => {
        if (i !== expIndex) return exp
        const newList = exp.description.value.map((li, j) =>
          j === descIndex
            ? <li key={j} dangerouslySetInnerHTML={{ __html: html }} />
            : li
        )
        return { ...exp, description: { ...exp.description, value: newList } }
      })
    )
  }

  const addDescription = (expIndex) => {
    setExperiences(prev =>
      prev.map((exp, i) => {
        if (i !== expIndex) return exp
        return {
          ...exp,
          description: {
            ...exp.description,
            value: [...exp.description.value, <li key={Date.now()}></li>]
          }
        }
      })
    )
  }

  const removeDescription = (expIndex, descIndex) => {
    setExperiences(prev =>
      prev.map((exp, i) => {
        if (i !== expIndex) return exp
        const newList = exp.description.value
          .filter((_, j) => j !== descIndex)
          .map((li, idx) => {
            const html = getHTML(li)
            return <li key={idx} dangerouslySetInnerHTML={{ __html: html }} />
          })
        return { ...exp, description: { ...exp.description, value: newList } }
      })
    )
  }

  const addExperience = () => {
    const template = {
      designation: { label: "Designation", className: "tracking-wide text-sm font-semibold", value: "" },
      company:     { label: "Company",     className: "text-xs font-medium",                 value: "" },
      duration:    { label: "Duration",    className: "italic text-sm",                      value: { start: "", end: "" } },
      mode:        { label: "Mode",        className: "italic text-xs",                      value: "" },
      location:    { label: "Location",    className: "italic text-xs",                      value: "" },
      description: { label: "Description", className: "list-disc pl-5 space-y-1 text-sm ml-4", value: [<li key={Date.now()}></li>] }
    }
    setExperiences(prev => [...prev, template])
    setCollapsedExperiences(prev => ({ ...prev, [experiences.length]: false }))
  }

  const removeExperience = (index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index))
  }

  const setDuration = (index, field, value) => {
    setExperiences(prev =>
      prev.map((exp, i) =>
        i === index
          ? { ...exp, duration: { ...exp.duration, value: { ...exp.duration.value, [field]: value } } }
          : exp
      )
    )
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <Briefcase size={14} className="text-emerald-500" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Experience
          </h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">
        {experiences.map((experience, index) => {
          const isCollapsed = collapsedExperiences[index]
          const isDescCollapsed = descCollapsed[index]

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
                    {experience.designation.value || `Experience ${index + 1}`}
                  </span>
                  {experience.company.value && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0 truncate max-w-[80px]">
                      {experience.company.value}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeExperience(index) }}
                  className="text-slate-300 hover:text-red-400 transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {!isCollapsed && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-slate-100">
                  {Object.entries(experience).map(([key, item]) => {

                    if (key === "description") {
                      const bulletCount = item.value.length
                      return (
                        <div key={key} className="space-y-2">
                          <div
                            className="flex justify-between items-center cursor-pointer py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                            onClick={() => toggleDesc(index)}
                          >
                            <div className="flex items-center gap-1.5">
                              <AlignLeft size={12} className="text-slate-400" />
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-slate-400 bg-white border border-slate-200 px-1.5 rounded-full">
                                {bulletCount}
                              </span>
                            </div>
                            {isDescCollapsed
                              ? <ChevronRight size={12} className="text-slate-400" />
                              : <ChevronDown size={12} className="text-slate-400" />}
                          </div>

                          {!isDescCollapsed && (
                            <div className="space-y-2">
                              {item.value.map((li, liIndex) => (
                                <div key={liIndex} className="flex gap-2 items-start">
                                  <span className="text-slate-300 mt-2.5 text-xs select-none">•</span>
                                  <EditableBullet
                                    html={getHTML(li)}
                                    onChange={(html) => updateDescription(index, liIndex, html)}
                                    onEnter={() => addDescription(index)}
                                  />
                                  <button
                                    disabled={item.value.length === 1}
                                    onClick={() => removeDescription(index, liIndex)}
                                    className="text-slate-300 hover:text-red-400 transition-colors disabled:opacity-30 mt-2 shrink-0"
                                  >
                                    <X size={13} />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => addDescription(index)}
                                className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                              >
                                <Plus size={12} /> Add bullet
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    }

                    if (key === "duration") {
                      return (
                        <div key={key} className="space-y-1">
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            {item.label}
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              value={item.value.start}
                              placeholder="Start"
                              onChange={(e) => setDuration(index, "start", e.target.value)}
                              className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                            />
                            <input
                              value={item.value.end}
                              placeholder="End"
                              onChange={(e) => setDuration(index, "end", e.target.value)}
                              className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                            />
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div key={key} className="space-y-1">
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          {item.label}
                        </label>
                        <input
                          value={item.value}
                          onChange={(e) => setterOuterKeys(index, key, e.target.value)}
                          placeholder={`Enter ${item.label.toLowerCase()}…`}
                          className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {experiences.length === 0 && (
          <button
            onClick={addExperience}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4 text-xs text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
          >
            + Add your work experience
          </button>
        )}
      </div>
    </div>
  )
}

export default Experience