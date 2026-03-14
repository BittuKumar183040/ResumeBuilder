import { useRef, useEffect, useState } from "react"
import Seperator from "../components/Seperator"
import { X, ChevronDown, ChevronRight, Plus, FolderOpen, AlignLeft, Tag } from "lucide-react"

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

const Projects = ({ projects, setProjects }) => {
  const [collapsedProjects, setCollapsedProjects] = useState(
    () => Object.fromEntries(projects.map((_, i) => [i, true]))
  )
  const [descCollapsed, setDescCollapsed] = useState({})

  const toggleCollapse = (index) => {
    setCollapsedProjects(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleDesc = (index) => {
    setDescCollapsed(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const setterOuterKeys = (index, key, value) => {
    setProjects(prev =>
      prev.map((proj, i) =>
        i === index ? { ...proj, [key]: { ...proj[key], value } } : proj
      )
    )
  }

  const updateDescription = (projIndex, descIndex, html) => {
    setProjects(prev =>
      prev.map((proj, i) => {
        if (i !== projIndex) return proj
        const newList = proj.description.value.map((li, j) =>
          j === descIndex
            ? <li key={j} dangerouslySetInnerHTML={{ __html: html }} />
            : li
        )
        return { ...proj, description: { ...proj.description, value: newList } }
      })
    )
  }

  const addDescription = (projIndex) => {
    setProjects(prev =>
      prev.map((proj, i) => {
        if (i !== projIndex) return proj
        return {
          ...proj,
          description: {
            ...proj.description,
            value: [...proj.description.value, <li key={Date.now()}></li>]
          }
        }
      })
    )
  }

  const removeDescription = (projIndex, descIndex) => {
    setProjects(prev =>
      prev.map((proj, i) => {
        if (i !== projIndex) return proj
        const newList = proj.description.value
          .filter((_, j) => j !== descIndex)
          .map((li, idx) => {
            const html = getHTML(li)
            return <li key={idx} dangerouslySetInnerHTML={{ __html: html }} />
          })
        return { ...proj, description: { ...proj.description, value: newList } }
      })
    )
  }

  const addProject = () => {
    const template = {
      title:       { label: "Title",       className: "font-semibold",                      value: "" },
      technology:  { label: "Technology",  className: "text-xs italic",                     value: [] },
      live:        { label: "Live URL",    className: "font-medium",                        value: "" },
      github:      { label: "GitHub",      className: "font-medium",                        value: "" },
      date:        { label: "Date",        className: "text-xs italic",                     value: "" },
      description: { label: "Description", className: "list-disc pl-5 space-y-px ml-2 text-sm", value: [<li key={Date.now()}></li>] }
    }
    setProjects(prev => [...prev, template])
    setCollapsedProjects(prev => ({ ...prev, [projects.length]: false }))
  }

  const removeProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <FolderOpen size={14} className="text-emerald-500" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Projects
          </h2>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">
        {projects.map((project, index) => {
          const isCollapsed = collapsedProjects[index]
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
                    {project.title.value || `Project ${index + 1}`}
                  </span>
                  {project.date.value && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
                      {project.date.value}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeProject(index) }}
                  className="text-slate-300 hover:text-red-400 transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {!isCollapsed && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-slate-100">
                  {Object.entries(project).map(([key, item]) => {

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

                    if (key === "technology") {
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Tag size={11} className="text-slate-400" />
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                              {item.label}
                            </label>
                          </div>
                          <input
                            value={item.value.join(", ")}
                            onChange={(e) =>
                              setterOuterKeys(index, key, e.target.value.split(",").map(t => t.trim()))
                            }
                            placeholder="React, Node.js, Tailwind…"
                            className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
                          />
                          {item.value.filter(Boolean).length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {item.value.filter(Boolean).map((t, i) => (
                                <span key={i} className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
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

        {projects.length === 0 && (
          <button
            onClick={addProject}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4 text-xs text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
          >
            + Add your first project
          </button>
        )}
      </div>
    </div>
  )
}

export default Projects