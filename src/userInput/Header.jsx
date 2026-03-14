import { useState, Fragment, useRef } from "react"
import Seperator from "../components/Seperator"
import { LinkOutlined } from "@ant-design/icons"
import { ChevronDown, User } from "lucide-react"
import IconLibrary from "../components/IconLibrary"

const InputWithOptions = ({ outerKey, innerItem, setterArrayInnerKeys }) => {
  const [showlink, setShowlink] = useState(false)
  const [showIconLibrary, setShowIconLibrary] = useState(false)
  const iconBtnRef = useRef(null);

  return (
    <div className="space-y-1.5 mx-3 mb-3">
      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
        {innerItem.label}
      </label>

      <div className="relative flex items-center">
        <button
          ref={iconBtnRef}
          onClick={() => setShowIconLibrary(!showIconLibrary)}
          className="absolute left-0 top-0 h-full px-3 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <innerItem.icon />
        </button>
        {showIconLibrary && (
          <IconLibrary
            search={innerItem.key}
            anchorRef={iconBtnRef}
            onClose={() => setShowIconLibrary(false)}
            className="bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200"
          />
        )}
        <input
          value={innerItem.value}
          onChange={(e) =>
            setterArrayInnerKeys(outerKey, innerItem.key, e.target.value, innerItem.className, innerItem.url, innerItem.icon)
          }
          type="text"
          placeholder={`Enter ${innerItem.label.toLowerCase()}…`}
          className="border border-slate-200 rounded-lg w-full pl-9 pr-9 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
        />
        <button
          className="absolute right-0 top-0 h-full px-3 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
          onClick={() => setShowlink(!showlink)}
          title="Toggle URL"
        >
          <LinkOutlined />
        </button>
      </div>

      {showlink && (
        <div className="flex items-center gap-2">
          <span className="text-slate-300 shrink-0">
            <LinkOutlined />
          </span>
          <input
            value={innerItem.url}
            onChange={(e) =>
              setterArrayInnerKeys(outerKey, innerItem.key, innerItem.value, innerItem.className, e.target.value, innerItem.icon)
            }
            type="text"
            placeholder={innerItem.example || "https://…"}
            className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
          />
        </div>
      )}
    </div>
  )
}

const Header = ({ header, setHeader }) => {
  const setterOuterKeys = (key, value, className) => {
    setHeader(prev => ({ ...prev, [key]: { ...prev[key], value, className } }))
  }

  const setterArrayInnerKeys = (outerKey, innerKey, value, className, url, icon) => {
    setHeader(prev => ({
      ...prev,
      [outerKey]: {
        ...prev[outerKey],
        items: prev[outerKey].items.map(item =>
          item.key === innerKey
            ? { ...item, value, className, url, icon }
            : item
        )
      }
    }))
  }

  return (
    <Fragment>
      <div className="flex items-center gap-2 mb-1">
        <User size={14} className="text-emerald-500" />
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Header Section
        </h2>
      </div>

      <Seperator className="mb-3" />

      <div className="flex flex-col gap-2">
        {Object.keys(header).map((key) => {
          const item = header[key]

          if (item.items) {
            return (
              <details key={key} className="group border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors list-none select-none">
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className="text-slate-400 transition-transform -rotate-90 group-open:rotate-0"
                  />
                </summary>
                <div className="border-t border-slate-100 pt-2">
                  {item.items.map((innerItem) => (
                    <InputWithOptions
                      key={innerItem.key}
                      outerKey={key}
                      innerItem={innerItem}
                      setterArrayInnerKeys={setterArrayInnerKeys}
                    />
                  ))}
                </div>
              </details>
            )
          }

          return (
            <div key={key} className="space-y-1">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {item.label}
              </label>
              <input
                value={item.value}
                onChange={(e) => setterOuterKeys(key, e.target.value, item.className)}
                type="text"
                placeholder={`Enter ${item.label.toLowerCase()}…`}
                className="border border-slate-200 rounded-lg w-full px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
              />
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default Header