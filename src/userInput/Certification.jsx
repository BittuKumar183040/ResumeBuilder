import { useState } from "react"
import { Plus, X, ChevronDown, ChevronRight } from "lucide-react"
import Seperator from "../components/Seperator"

const Certification = ({ certifications, setCertifications }) => {

  const [collapsed, setCollapsed] = useState({})

  const toggleCollapse = (index) => {
    setCollapsed(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const updateField = (index, key, value) => {
    setCertifications(prev =>
      prev.map((cert, i) =>
        i === index
          ? { ...cert, [key]: { ...cert[key], value } }
          : cert
      )
    )
  }

  const addCertification = () => {
    const template = {
      title: { label: "Title", className: "font-medium", value: "" },
      year: { label: "Year", className: "italic", value: "" },
      issuer: { label: "Issuer", className: "", value: "" }
    }

    setCertifications(prev => [...prev, template])
  }

  const removeCertification = (index) => {
    setCertifications(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-lg font-semibold">Certifications</h1>

        <button
          onClick={addCertification}
          className="flex items-center gap-1 text-blue-500 text-sm"
        >
          <Plus size={16}/> Add
        </button>
      </div>

      <Seperator className="mb-3"/>

      <div className="flex flex-col gap-3">

        {certifications.map((cert, index) => {

          const isCollapsed = collapsed[index]

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-4 space-y-2 bg-white"
            >

              <div className="flex justify-between items-center">

                <div
                  className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                  onClick={() => toggleCollapse(index)}
                >
                  {isCollapsed
                    ? <ChevronRight size={16}/>
                    : <ChevronDown size={16}/>
                  }

                  <p className="font-medium truncate">
                    {cert.title.value || `Certification ${index + 1}`}
                  </p>
                </div>

                <button
                  onClick={() => removeCertification(index)}
                  className="text-red-500"
                >
                  <X size={16}/>
                </button>

              </div>

              {!isCollapsed && (
                <>
                  {Object.entries(cert).map(([key, item]) => (
                    <div key={key} className="space-y-1">

                      <p className="text-sm">{item.label}</p>

                      <input
                        value={item.value}
                        onChange={(e) =>
                          updateField(index, key, e.target.value)
                        }
                        className="border border-gray-200 rounded-md w-full p-2"
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

export default Certification
