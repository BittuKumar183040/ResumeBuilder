import { useRef, useEffect } from "react"
import Seperator from "../components/Seperator"

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

const EditableBullet = ({ html, onChange }) => {
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
    />
  )
}

const Experience = ({ experiences, setExperiences }) => {

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

  return (
    <>
      <h1 className="text-lg">Experiences</h1>
      <Seperator className="mb-2" />

      <div className="flex flex-col gap-4">

        {experiences.map((experience, index) =>
          Object.entries(experience).map(([key, item]) => {

            if (key === "description") {
              return (
                <div key={`${index}-${key}`} className="space-y-2">

                  <div className="flex justify-between items-center">
                    <p className="text-md">{item.label}</p>

                    <button
                      onClick={() => addDescription(index)}
                      className="text-blue-500 text-sm"
                    >
                      + Add
                    </button>
                  </div>

                  {item.value.map((li, liIndex) => (
                    <div key={liIndex} className="flex gap-2 items-start">

                      <EditableBullet
                        html={getHTML(li)}
                        onChange={(html) =>
                          updateDescription(index, liIndex, html)
                        }
                      />

                      <button
                        onClick={() => removeDescription(index, liIndex)}
                        className="text-red-500 text-sm mt-2"
                      >
                        ✕
                      </button>

                    </div>
                  ))}

                </div>
              )
            }

            if (typeof item.value === "object") return null

            return (
              <div key={`${index}-${key}`} className="space-y-1">

                <p className="text-md">{item.label}</p>

                <input
                  value={item.value}
                  onChange={(e) =>
                    setterOuterKeys(index, key, e.target.value)
                  }
                  type="text"
                  className="border border-gray-200 rounded-md w-full p-2 outline-blue-200"
                />

              </div>
            )
          })
        )}

      </div>
    </>
  )
}

export default Experience