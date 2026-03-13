import { useRef, useEffect, useState } from "react"
import Seperator from "../components/Seperator"
import { X, ChevronDown, ChevronRight, Plus } from "lucide-react"

const childrenToHTML = (node) => {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(childrenToHTML).join("")
  if (node?.type === "span") {
    return `<span class="${node.props.className}">
      ${childrenToHTML(node.props.children)}
    </span>`
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
      className="border border-gray-200 rounded-md w-full p-2 outline-blue-200"
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
    setCollapsedExperiences(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const toggleDesc = (index) => {
    setDescCollapsed(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const setterOuterKeys = (index, key, value) => {
    setExperiences(prev =>
      prev.map((exp, i) =>
        i === index
          ? { ...exp, [key]: { ...exp[key], value } }
          : exp
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

        return {
          ...exp,
          description: { ...exp.description, value: newList }
        }
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

        return {
          ...exp,
          description: { ...exp.description, value: newList }
        }
      })
    )
  }

  const addExperience = () => {
    const template = {
      designation: { label: "Designation", className: "tracking-wide text-sm font-semibold", value: "" },
      company: { label: "Company", className: "text-xs font-medium", value: "" },
      duration: { label: "Duration", className: "italic text-sm", value: { start: "", end: "" } },
      mode: { label: "Mode", className: "italic text-xs", value: "" },
      location: { label: "Location", className: "italic text-xs", value: "" },
      description: { label: "Description", className: "list-disc pl-5 space-y-1 text-sm ml-4", value: [<li key={Date.now()}></li>] }
    }
    setExperiences(prev => [...prev, template])
  }

  const removeExperience = (index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-md font-semibold -ml-1">Experiences</h1>

        <button
          onClick={addExperience}
          className="flex items-center gap-1 text-blue-500 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">

        {experiences.map((experience, index) => {

          const isCollapsed = collapsedExperiences[index]
          const isDescCollapsed = descCollapsed[index]

          return (
            <div key={index} className="border border-gray-200 rounded-md p-1 space-y-3 bg-white" >
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleCollapse(index)}
                >
                  {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                  <p className="font-medium">{experience.designation.value ? experience.designation.value : `Experience ${index + 1}`}</p>
                </div>

                {experiences.length > 0 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {!isCollapsed && (
                <>
                  {Object.entries(experience).map(([key, item]) => {
                    if (key === "description") {
                      const bulletCount = item.value.length
                      return (
                        <div key={key} className="space-y-2">
                          <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDesc(index)}
                          >
                            <p>
                              {item.label}
                              <span className="ml-2 text-xs text-gray-400">
                                ({bulletCount})
                              </span>
                            </p>
                            {isDescCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                          </div>

                          {!isDescCollapsed && (
                            <>
                              <div className="flex justify-end">
                                <button onClick={() => addDescription(index)} className="text-blue-500 text-sm">
                                  + Add
                                </button>
                              </div>

                              {item.value.map((li, liIndex) => (
                                <div key={liIndex} className="flex gap-2">

                                  <EditableBullet
                                    html={getHTML(li)}
                                    onChange={(html) => updateDescription(index, liIndex, html) }
                                    onEnter={() => addDescription(index)}
                                  />
                                  <button
                                    disabled={item.value.length === 1}
                                    onClick={() =>  removeDescription(index, liIndex) }
                                    className="text-red-500 disabled:opacity-30"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      )
                    }

                    if (typeof item.value === "object") return null

                    return (
                      <div key={key} className="space-y-1">
                        <p className="text-sm">{item.label}</p>
                        <input
                          value={item.value}
                          onChange={(e) =>
                            setterOuterKeys(index, key, e.target.value)
                          }
                          className="border border-gray-200 rounded-md w-full p-2"
                        />
                      </div>
                    )

                  })}
                </>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Experience