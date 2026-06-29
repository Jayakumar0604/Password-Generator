import { useState, useEffect, useCallback } from "react";
import { generatePassword } from "../utils/passwordUtils";

const HISTORY_KEY = "pwd_gen_history";
const MAX_HISTORY = 5;

export const usePassword = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  
  // Options state
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    easyToSay: false,
    easyToRead: false,
  });

  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load password history from localStorage", e);
    }
  }, []);

  // Update a single option
  const toggleOption = useCallback((optionKey) => {
    setOptions((prev) => {
      const updated = { ...prev, [optionKey]: !prev[optionKey] };

      // Mutual exclusivity rules if necessary:
      if (optionKey === "easyToSay" && updated.easyToSay) {
        updated.easyToRead = false;
      }
      if (optionKey === "easyToRead" && updated.easyToRead) {
        updated.easyToSay = false;
      }
      
      // Ensure at least one check is active if easyToSay or easyToRead is not active
      const hasAnyCharSet = updated.includeUppercase || updated.includeLowercase || updated.includeNumbers || updated.includeSymbols;
      if (!hasAnyCharSet) {
        // Force fallback
        updated.includeLowercase = true;
      }

      return updated;
    });
  }, []);

  // Generate password helper
  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword({
      length,
      ...options,
    });

    if (newPassword) {
      setPassword(newPassword);

      // Save to history
      setHistory((prevHistory) => {
        // Prevent adjacent duplicates
        if (prevHistory[0] === newPassword) return prevHistory;

        const updatedHistory = [newPassword, ...prevHistory.filter(p => p !== newPassword)].slice(0, MAX_HISTORY);
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (e) {
          console.error("Failed to save history", e);
        }
        return updatedHistory;
      });
    }
  }, [length, options]);

  // Copy helper
  const handleCopy = useCallback((textToCopy = password) => {
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy password to clipboard: ", err);
      }
    );
  }, [password]);

  // Clear history
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  }, []);

  // Generate on load if empty
  useEffect(() => {
    if (!password) {
      handleGenerate();
    }
  }, [handleGenerate, password]);

  return {
    password,
    length,
    setLength,
    options,
    toggleOption,
    copied,
    history,
    generatePassword: handleGenerate,
    copyToClipboard: handleCopy,
    clearHistory: handleClearHistory,
  };
};
