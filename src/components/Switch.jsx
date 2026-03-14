const Switch = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <span className="text-slate-400 text-xs font-medium uppercase tracking-wide lg:block hidden">
      {label}
    </span>
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer
        ${checked ? "bg-emerald-600" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
        ${checked ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  </label>
);

export default Switch;