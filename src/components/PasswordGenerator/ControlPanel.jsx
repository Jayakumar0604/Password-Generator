import React from "react";
import { FiCheck } from "react-icons/fi";

const ControlPanel = ({ length, setLength, options, toggleOption }) => {
  const characterSets = [
    { key: "includeUppercase", label: "Uppercase Letters", desc: "A-Z", checked: options.includeUppercase, disabled: options.easyToSay },
    { key: "includeLowercase", label: "Lowercase Letters", desc: "a-z", checked: options.includeLowercase, disabled: options.easyToSay },
    { key: "includeNumbers", label: "Numbers", desc: "0-9", checked: options.includeNumbers, disabled: options.easyToSay || options.easyToRead },
    { key: "includeSymbols", label: "Special Symbols", desc: "!@#$..", checked: options.includeSymbols, disabled: options.easyToSay || options.easyToRead },
  ];

  const ruleOptions = [
    { key: "excludeSimilar", label: "Exclude Similar", desc: "Avoid i, l, 1, L, o, 0, O, etc.", checked: options.excludeSimilar },
    { key: "easyToSay", label: "Easy to Say", desc: "Avoid numbers and special characters", checked: options.easyToSay },
    { key: "easyToRead", label: "Easy to Read", desc: "Avoid confusing characters & symbols", checked: options.easyToRead },
  ];

  return (
    <div className="w-full flex flex-col gap-6 mt-5 text-left">
      {/* Slider Section */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="length-slider" className="text-sm font-semibold tracking-wide text-neutral-300">
            Password Length
          </label>
          <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold px-3 py-1 rounded-full text-xs shadow-[0_0_8px_rgba(34,211,238,0.1)]">
            {length} characters
          </span>
        </div>
        <input
          id="length-slider"
          type="range"
          min="6"
          max="40"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg bg-neutral-800 accent-cyan-400 cursor-pointer transition-all duration-200"
        />
        <div className="flex justify-between text-[10px] text-neutral-500 px-1">
          <span>6</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
          <span>30</span>
          <span>40</span>
        </div>
      </div>

      {/* Character Sets Grid */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
          Character Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {characterSets.map((c) => (
            <button
              key={c.key}
              type="button"
              disabled={c.disabled}
              onClick={() => toggleOption(c.key)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                c.disabled
                  ? "opacity-40 cursor-not-allowed border-neutral-800 bg-neutral-900/20"
                  : c.checked
                  ? "border-cyan-500/40 bg-cyan-500/5 text-neutral-100 shadow-[0_0_12px_rgba(6,182,212,0.03)]"
                  : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700/80 hover:bg-neutral-800/40"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold transition-colors duration-200">
                  {c.label}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {c.desc}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-300 ${
                  c.checked && !c.disabled
                    ? "bg-cyan-400 border-cyan-400 text-neutral-950 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    : "border-neutral-700 bg-neutral-800 text-transparent"
                }`}
              >
                <FiCheck className="text-xs stroke-[3.5]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Rules Settings */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
          Advanced Rules
        </h3>
        <div className="flex flex-col gap-2">
          {ruleOptions.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => toggleOption(r.key)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                r.checked
                  ? "border-purple-500/40 bg-purple-500/5 text-neutral-100 shadow-[0_0_12px_rgba(168,85,247,0.03)]"
                  : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700/80 hover:bg-neutral-800/40"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold transition-colors duration-200">
                  {r.label}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {r.desc}
                </span>
              </div>
              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${
                  r.checked ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]" : "bg-neutral-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-md ${
                    r.checked ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
