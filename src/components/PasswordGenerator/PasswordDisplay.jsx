import React, { useState } from "react";
import { FiRefreshCw, FiCopy, FiEye, FiEyeOff } from "react-icons/fi";
import { MdCheck } from "react-icons/md";

const PasswordDisplay = ({ password, onGenerate, onCopy, copied }) => {
  const [isRevealed, setIsRevealed] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  const triggerGenerate = () => {
    setIsSpinning(true);
    onGenerate();
    setTimeout(() => setIsSpinning(false), 500);
  };

  // Adjust font size dynamically based on length so it fits on screen
  const getFontSizeClass = (len) => {
    if (len > 28) return "text-sm sm:text-base";
    if (len > 20) return "text-base sm:text-lg";
    if (len > 14) return "text-lg sm:text-xl";
    return "text-xl sm:text-2xl";
  };

  return (
    <div className="w-full bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-4.5 flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] backdrop-blur-sm">
      <div className="flex-1 overflow-x-auto scrollbar-none pr-3">
        {password ? (
          <span
            className={`font-mono font-semibold tracking-wide transition-all duration-300 ${
              isRevealed
                ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                : "text-neutral-600 select-none"
            } ${getFontSizeClass(password.length)}`}
          >
            {isRevealed ? password : "•".repeat(password.length)}
          </span>
        ) : (
          <span className="text-neutral-500 font-mono italic text-sm">
            Click generate...
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 border-l border-neutral-800/80 pl-3">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          disabled={!password}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
          title={isRevealed ? "Hide Password" : "Reveal Password"}
        >
          {isRevealed ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
        </button>

        <button
          onClick={triggerGenerate}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer"
          title="Regenerate Password"
        >
          <FiRefreshCw
            className={`text-lg transition-transform duration-500 ease-out ${
              isSpinning ? "rotate-180 text-cyan-400" : ""
            }`}
          />
        </button>

        <button
          onClick={() => onCopy()}
          disabled={!password}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer disabled:opacity-30 disabled:pointer-events-none ${
            copied
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-neutral-950 font-black"
          }`}
        >
          {copied ? (
            <>
              <MdCheck className="text-sm stroke-[1.5]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <FiCopy className="text-sm" />
              <span className="hidden xs:inline">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordDisplay;
