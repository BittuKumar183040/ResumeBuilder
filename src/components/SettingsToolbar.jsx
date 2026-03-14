import Switch from "./Switch";
import ZoomHandler from "./ZoomHandler";

const getSelected = (arr) => arr.find((o) => o.selected) ?? arr[0];
const selectOption = (arr, value) => arr.map((o) => ({ ...o, selected: o.value === value }));

const SettingsToolbar = ({ settings, setSettings }) => {
  const update = (key, value) =>
    setSettings((prev) => {
      const current = prev[key];
      if (current && !Array.isArray(current)) {
        return { ...prev, [key]: { ...current, value } };
      }
      return { ...prev, [key]: selectOption(current, value) };
    });

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
      <ZoomHandler settings={settings} setSettings={setSettings} />
      <Divider />

      <Switch label="Free Edit" checked={settings.modifyEnabled.value} onChange={(v) => update("modifyEnabled", v)} />
      <Divider />
      
      <SettingSelect label="Page" options={settings.pageSize} onChange={(v) => update("pageSize", v)} />

      <Divider />
      <FontSelect options={settings.font} onChange={(v) => update("font", v)} />

      <Divider />
      <SegmentedToggle options={settings.previewType} onChange={(v) => update("previewType", v)} />
    </div>
  );
};

const Divider = () => <div className="h-5 w-px bg-gray-200" />;

const SettingSelect = ({ label, options, onChange }) => {
  const selected = getSelected(options);
  return (
    <label className="flex items-center gap-1.5">
      <span className="text-gray-400 text-xs font-medium uppercase tracking-wide lg:block hidden">{label}</span>
      <select value={selected.value} onChange={(e) => onChange(e.target.value)} 
        className="h-6 px-2 border border-gray-300 rounded-md outline-none text-gray-800 bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
};

const SegmentedToggle = ({ options, onChange }) => {
  const selected = getSelected(options);
  return (
    <div className="flex items-center rounded-md border border-gray-300 overflow-hidden">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`h-6 px-3 text-sm transition-colors cursor-pointer
            ${o.value === selected.value ? "bg-gray-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50" }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

const FontSelect = ({ options, onChange }) => {
  const selected = options.find((o) => o.selected) ?? options[0];
  return (
    <label className="flex items-center gap-1.5">
      <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Font</span>
      <select
        value={selected.value}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontFamily: `'${selected.value}', sans-serif` }}
        className="h-8 px-2 border border-gray-300 rounded-md outline-none text-gray-800 bg-white"
      >
        {["Sans Serif", "Serif", "Mono"].map((cat) => (
          <optgroup key={cat} label={cat}>
            {options
              .filter((o) => o.category === cat)
              .map((o) => (
                <option key={o.value} value={o.value} style={{ fontFamily: `'${o.value}', sans-serif` }}>
                  {o.label}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
};

export default SettingsToolbar