import { useState, Fragment } from "react";
import Seperator from "../components/Seperator";
import { LinkOutlined } from "@ant-design/icons";
import { ChevronDown } from "lucide-react";
import IconLibrary from "../components/IconLibrary";

const InputWithOptions = ({ outerKey, innerItem, setterArrayInnerKeys }) => {
  const [showlink, setShowlink] = useState(false);
  const [showIconLibrary, setShowIconLibrary] = useState(false);

  return (
    <div key={innerItem.key} className=" ml-4 space-y-1">
      <p className=' text-md'>{innerItem.label}</p>

      <div className=" relative flex gap-2 justify-between items-center">
        <button onClick={()=>setShowIconLibrary(!showIconLibrary)} className=" absolute cursor-pointer left-0 top-0 px-3 h-full p-2" >
          <innerItem.icon />
        </button>
        { showIconLibrary && <IconLibrary 
          search={innerItem.key}
          onClose={()=> setShowIconLibrary(false)}
          className={"absolute bottom-10 left-0 bg-white/60 backdrop-blur-sm rounded-md shadow z-10"} 
          /> 
        }
        <input value={innerItem.value}
          onChange={(e) => setterArrayInnerKeys(outerKey, innerItem.key, e.target.value, innerItem.className, innerItem.url, innerItem.icon)}
          type='text'
          className=' border border-gray-200 rounded-md w-full p-2 px-9 outline-blue-200 ' />
        <div className=" absolute right-0 top-0 px-3 h-full p-2 flex gap-2 items-center">
          <button className=" cursor-pointer" onClick={() => setShowlink(!showlink)} ><LinkOutlined /></button>
        </div>
      </div>
      {showlink &&
        <div className=" flex items-center gap-2">
          <p className=" opacity-50"><LinkOutlined /></p>
          <input value={innerItem.url}
            onChange={(e) => setterArrayInnerKeys(outerKey, innerItem.key, innerItem.value, innerItem.className, e.target.value, innerItem.icon)}
            type='text' 
            placeholder={innerItem.example ? innerItem.example : ""}
            className=' border border-gray-200 rounded-md w-full p-2 outline-blue-200 ' />
        </div>
      }
    </div>
  )
}

const Header = ({ header, setHeader }) => {

  const setterOuterKeys = (key, value, className) => {
    console.log(key, value, className)
    setHeader((prev) => ({
      ...prev, [key]: { ...prev[key], value, className }
    }))
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
    }));
  };

  return (
    <Fragment>
      <h1 className="text-md font-semibold -ml-1">Header Section</h1>
      <Seperator className="mb-2" />
      <div className=" flex flex-col gap-2">
        {Object.keys(header).map((key) => {
          const item = header[key]
          return (<div key={key} className=" space-y-1">
            {item.items ? <details className="group">
              <summary className="flex items-center justify-between py-2 rounded-md bg-linear-to-l from-gray-200 to-transparent cursor-pointer list-none">
                <p className="text-sm">{item.label}</p>
                <ChevronDown className="transition-transform mr-3 text-gray-600 -rotate-90 group-open:rotate-0" />
              </summary>
              <div className="pt-1 border-l border-gray-200">
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
              : <>
                <p className=' text-sm'>{item.label}</p>
                <input value={item.value}
                  onChange={(e) => setterOuterKeys(key, e.target.value, item.className)}
                  type='text'
                  className=' border border-gray-200 rounded-md w-full p-2 py-1 text-sm outline-blue-200 '
                />
              </>
            }
          </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default Header