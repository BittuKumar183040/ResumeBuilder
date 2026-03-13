import { useState } from "react"
import { Plus, X, ChevronDown, ChevronRight } from "lucide-react"
import Seperator from "../components/Seperator"

const Skills = ({ skills, setSkills }) => {

  const [collapsedSkills, setCollapsedSkills] = useState({})

  const toggleCollapse = (index) => {
    setCollapsedSkills(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
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
      items: { label: "Items", className: "text-sm", value: [] }
    }
    setSkills(prev => [...prev, template])
  }

  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-md font-semibold -ml-1">Technical Skills</h1>
        <button
          onClick={addSkill}
          className="flex items-center gap-1 text-blue-500 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      <Seperator className="mb-3" />
      <div className="flex flex-col gap-3">
        {skills.map((skill, index) => {
          const isCollapsed = collapsedSkills[index]
          return (
            <div key={index} className="border border-gray-200 rounded-md p-2 py-1 space-y-2 bg-white" >
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                  onClick={() => toggleCollapse(index)}
                >
                  {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                  <p className="font-medium truncate"> {skill.category.value ? skill.category.value : `Skill ${index + 1}`} </p>
                </div>
                <button onClick={() => removeSkill(index)} className="text-red-500 ml-2" > <X size={16} /> </button>
              </div>

              {!isCollapsed && (
                <>
                  <div className="space-y-1">
                    <p className="text-sm">{skill.category.label}</p>
                    <input
                      value={skill.category.value}
                      onChange={(e) => updateField(index, "category", e.target.value)}
                      className="border text-sm border-gray-200 rounded-md w-full px-2 py-1"
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm">{skill.items.label}</p>
                    <input
                      value={skill.items.value.join(", ")}
                      onChange={(e) => updateField(index, "items", e.target.value.split(",").map(s => s.trim()))}
                      className="border text-sm border-gray-200 rounded-md w-full px-2 py-1"
                    />
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Skills