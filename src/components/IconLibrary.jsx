import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ICONS } from "../assets/Icons";
import { X } from "lucide-react";

const IconLibrary = ({ search, className, onClose, onSelect, anchorRef }) => {
  const [query, setQuery] = useState(search || "");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  const filteredIcons = Object.entries(ICONS).filter(([name]) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
      className={`h-50 w-50 p-3 flex flex-col shadow-[inset_2px_4px_4px_rgba(0,0,0,0.1),4px_4px_4px_rgba(0,0,0,0.1)]
        ${className}`}
    >
      <div className="relative flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-slate-700">Library</p>
        <button
          onClick={onClose}
          className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X size={15} />
        </button>
      </div>

      <input
        className="border px-2 py-1 border-slate-200 text-sm outline-none w-full rounded-lg mb-2 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-300"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex-1 overflow-auto flex flex-wrap gap-2 border-t border-slate-200 pt-2">
        {filteredIcons.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => onSelect(name, Icon)}
            title={name}
            className="size-8 shrink-0 border border-slate-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default IconLibrary;