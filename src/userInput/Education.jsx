import { useState } from "react"
import { Plus, X, ChevronDown, ChevronRight } from "lucide-react"
import Seperator from "../components/Seperator"

const Education = ({ education, setEducation }) => {

  const [collapsed, setCollapsed] = useState({})

  const toggleCollapse = (index) => {
    setCollapsed(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const updateField = (index, key, value) => {
    setEducation(prev =>
      prev.map((edu, i) =>
        i === index
          ? { ...edu, [key]: { ...edu[key], value } }
          : edu
      )
    )
  }

  const addEducation = () => {
    const template = {
      degree: { label: "Degree", className: "text-sm font-medium", value: "" },
      location: { label: "Location", className: "italic text-sm", value: "" },
      college: { label: "College", className: "font-medium text-xs", value: "" },
      duration: { label: "Duration", className: "italic text-xs", value: "" }
    }

    setEducation(prev => [...prev, template])
  }

  const removeEducation = (index) => {
    setEducation(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-lg font-semibold">Education</h1>

        <button onClick={addEducation} className="flex items-center gap-1 text-blue-500 text-sm shrink" >
          <Plus size={16} /> Add
        </button>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-3">

        {education.map((edu, index) => {

          const isCollapsed = collapsed[index]

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-1 space-y-2 bg-white"
            >

              <div className="flex gap-2 px-1 justify-between items-center cursor-pointer">
                { isCollapsed ? <ChevronRight size={16}  onClick={() => toggleCollapse(index)}/> : <ChevronDown size={16}  onClick={() => toggleCollapse(index)}/> }

                <div className="flex flex-1 items-center gap-2 cursor-pointer" onClick={() => toggleCollapse(index)} >
                  <p className="font-medium truncate w-50"> {edu.degree.value || `Education ${index + 1}`} </p>
                </div>

                <button onClick={() => removeEducation(index)} className="text-red-500" >
                  <X size={16} />
                </button>

              </div>

              { !isCollapsed && (
                <>
                  {Object.entries(edu).map(([key, item]) => (
                    <div key={key} className="space-y-1">

                      <p className="text-sm">{item.label}</p>

                      <input
                        value={item.value}
                        onChange={(e) =>
                          updateField(index, key, e.target.value)
                        }
                        className="border text-sm border-gray-200 rounded-md w-full px-2 py-1"
                      />

                    </div>
                  ))}
                </>
              )}

            </div>
          )
        })}
      </div>
    </>
  )
}

export default Education
