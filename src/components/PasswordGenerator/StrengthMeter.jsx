import React from "react";
import { calculateStrength } from "../../utils/passwordUtils";

const StrengthMeter = ({ password }) => {
  const strength = calculateStrength(password);
  
  // Segment counts
  const levels = [
    { label: "Too Weak", minScore: 25 },
    { label: "Medium", minScore: 50 },
    { label: "Strong", minScore: 75 },
    { label: "Unbreakable", minScore: 100 },
  ];

  const activeIndex = levels.findIndex(lvl => lvl.label === strength.label);

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 mt-4 transition-all duration-300">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
          Password Strength
        </span>
        <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${strength.text}`}>
          {strength.label}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {levels.map((lvl, index) => {
          const isActive = index <= activeIndex;
          let segmentColor = "bg-neutral-800";
          
          if (isActive) {
            // Apply different color based on overall strength level
            if (strength.label === "Too Weak") segmentColor = "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]";
            else if (strength.label === "Medium") segmentColor = "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]";
            else if (strength.label === "Strong") segmentColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
            else segmentColor = "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]";
          }

          return (
            <div
              key={lvl.label}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${segmentColor}`}
            />
          );
        })}
      </div>
      
      <p className="text-[11px] text-neutral-500 mt-2.5">
        {strength.label === "Too Weak" && "⚠️ Add uppercase, numbers, or symbols to improve strength."}
        {strength.label === "Medium" && "💡 Consider making it longer for better security."}
        {strength.label === "Strong" && "✔️ Great security! Suitable for most personal accounts."}
        {strength.label === "Unbreakable" && "🛡️ Excellent entropy! Highly secure for critical accounts."}
      </p>
    </div>
  );
};

export default StrengthMeter;
