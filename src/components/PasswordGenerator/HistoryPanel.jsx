import React, { useState } from "react";
import { FiCopy, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { MdCheck } from "react-icons/md";

const HistoryPanel = ({ history, onCopy, onClear }) => {
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const toggleReveal = (index) => {
    setRevealedIndex(revealedIndex === index ? null : index);
  };

  const handleCopyHistory = (pwd, index) => {
    onCopy(pwd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 mt-5">
      <div className="flex justify-between items-center mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
            History Log
          </span>
          {history.length > 0 && (
            <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold px-2 py-0.5 rounded-full text-[10px]">
              {history.length} Saved
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-[11px] text-rose-400 font-semibold hover:text-rose-300 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
          >
            <FiTrash2 className="text-xs" /> Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center text-neutral-600">
          <p className="text-xs italic">No passwords generated yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {history.map((pwd, idx) => {
            const isRevealed = revealedIndex === idx;
            const isCopied = copiedIndex === idx;

            return (
              <div
                key={`${pwd}-${idx}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-900/60 hover:border-neutral-800/80 transition-all duration-300 hover:shadow-inner"
              >
                <div className="font-mono text-xs select-all overflow-x-auto whitespace-nowrap scrollbar-none pr-3 flex-1 text-left text-neutral-300">
                  {isRevealed ? pwd : "•".repeat(Math.max(pwd.length, 12))}
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleReveal(idx)}
                    className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 transition-all duration-200 cursor-pointer"
                    title={isRevealed ? "Hide Password" : "Show Password"}
                  >
                    {isRevealed ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  </button>
                  <button
                    onClick={() => handleCopyHistory(pwd, idx)}
                    className={`p-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                      isCopied
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300"
                    }`}
                    title="Copy Password"
                  >
                    {isCopied ? <MdCheck className="text-sm" /> : <FiCopy className="text-sm" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
