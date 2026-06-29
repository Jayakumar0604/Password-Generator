import React from "react";
import { usePassword } from "../../hooks/usePassword";
import PasswordDisplay from "./PasswordDisplay";
import StrengthMeter from "./StrengthMeter";
import ControlPanel from "./ControlPanel";
import HistoryPanel from "./HistoryPanel";
import { FaShieldAlt } from "react-icons/fa";

const PasswordGenerator = () => {
  const {
    password,
    length,
    setLength,
    options,
    toggleOption,
    copied,
    history,
    generatePassword,
    copyToClipboard,
    clearHistory,
  } = usePassword();

  return (
    <div className="relative w-full max-w-lg mx-auto bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      
      {/* Decorative Radial Background Lights */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2.5 mb-7">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <FaShieldAlt className="text-neutral-950 text-2xl" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-100 tracking-tight">
            CRYPTOSHIELD
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-[280px] sm:max-w-none">
            Generate cryptographically strong, custom-tailored passwords.
          </p>
        </div>
      </div>

      {/* Output Display */}
      <PasswordDisplay
        password={password}
        onGenerate={generatePassword}
        onCopy={copyToClipboard}
        copied={copied}
      />

      {/* Strength Feedback */}
      <StrengthMeter password={password} />

      {/* Settings Panel */}
      <ControlPanel
        length={length}
        setLength={setLength}
        options={options}
        toggleOption={toggleOption}
      />

      {/* History Log */}
      <HistoryPanel
        history={history}
        onCopy={copyToClipboard}
        onClear={clearHistory}
      />

      {/* Bottom Brand Accent */}
      <div className="mt-8 text-center">
        <span className="text-[10px] text-neutral-600 font-medium tracking-widest uppercase">
          End-to-End Client-Side Security
        </span>
      </div>
    </div>
  );
};

export default PasswordGenerator;
