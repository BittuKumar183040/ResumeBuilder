import { useRef, useState, useEffect } from "react";
import { ICONS } from "../assets/Icons";
import { X } from "lucide-react";

const IconLibrary = ({ search, className, onClose, onSelect }) => {
  const [query, setQuery] = useState( search || "");

  const filteredIcons = Object.entries(ICONS).filter(([name]) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={ref} className={`h-50 w-50 p-3 flex flex-col shadow-[inset_2px_4px_4px_rgba(0,0,0,0.1),4px_4px_4px_rgba(0,0,0,0.1)]
      ${className}`}>
      <div className=" relative flex items-center justify-between mb-2">
        <p className="text-sm font-medium">Library</p>
        <button onClick={onClose} className="cursor-pointer text-gray-600 p-1">
          <X size={15} />
        </button>
      </div>

      <input
        className="border px-2 py-1 border-gray-200 text-sm outline-none w-full rounded-md mb-2"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className=" flex-1 overflow-auto flex flex-wrap gap-2 border-t border-gray-200 pt-2">
        {filteredIcons.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => onSelect(name, Icon)}
            title={name}
            className=" size-8 shrink-0 border border-gray-200 rounded hover:bg-gray-100 flex items-center justify-center"
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconLibrary;
