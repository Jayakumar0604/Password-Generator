/**
 * Generates a pronounceable password of a given length
 */
const generatePronounceable = (length, excludeSimilar) => {
  const vowels = "aeiou";
  let consonants = "bcdfghjklmnpqrstvwxyz";
  
  if (excludeSimilar) {
    // Similar characters: l, o
    consonants = consonants.replace(/[lo]/g, "");
  }

  let password = "";
  let isVowel = Math.random() < 0.5;

  for (let i = 0; i < length; i++) {
    if (isVowel) {
      password += vowels[Math.floor(Math.random() * vowels.length)];
    } else {
      password += consonants[Math.floor(Math.random() * consonants.length)];
    }
    isVowel = !isVowel;
  }
  return password;
};

/**
 * Main password generation function
 */
export const generatePassword = ({
  length = 12,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true,
  includeSymbols = true,
  excludeSimilar = false,
  easyToSay = false,
  easyToRead = false,
}) => {
  // If Easy to Say (pronounceable), generate a readable vowel-consonant alternating string
  if (easyToSay) {
    let pwd = generatePronounceable(length, excludeSimilar);
    // Mix uppercase if selected
    if (includeUppercase && includeLowercase) {
      pwd = pwd.split("").map((c, i) => (i === 0 || Math.random() > 0.6 ? c.toUpperCase() : c)).join("");
    } else if (includeUppercase) {
      pwd = pwd.toUpperCase();
    }
    return pwd;
  }

  let charSet = "";
  let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lower = "abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const similarRegex = /[il1Lo0OIS52Z|]/g;

  if (excludeSimilar) {
    upper = upper.replace(similarRegex, "");
    lower = lower.replace(similarRegex, "");
    numbers = numbers.replace(similarRegex, "");
    symbols = symbols.replace(similarRegex, "");
  }

  if (easyToRead) {
    // Easy to read: exclude numbers and symbols
    if (includeUppercase) charSet += upper;
    if (includeLowercase) charSet += lower;
  } else {
    if (includeUppercase) charSet += upper;
    if (includeLowercase) charSet += lower;
    if (includeNumbers) charSet += numbers;
    if (includeSymbols) charSet += symbols;
  }

  if (!charSet) return "";

  // Make sure at least one character from each selected set is in the password (if length permits)
  const activeSets = [];
  if (includeUppercase) activeSets.push(upper);
  if (includeLowercase) activeSets.push(lower);
  if (includeNumbers && !easyToRead) activeSets.push(numbers);
  if (includeSymbols && !easyToRead) activeSets.push(symbols);

  if (activeSets.length === 0) return "";

  let guaranteed = "";
  activeSets.forEach((set) => {
    if (set.length > 0) {
      const idx = Math.floor(Math.random() * set.length);
      guaranteed += set[idx];
    }
  });

  let remainingLength = Math.max(0, length - guaranteed.length);
  let password = "";
  for (let i = 0; i < remainingLength; i++) {
    const idx = Math.floor(Math.random() * charSet.length);
    password += charSet[idx];
  }

  // Combine and shuffle
  let finalPassword = guaranteed + password;
  finalPassword = finalPassword
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return finalPassword.substring(0, length);
};

/**
 * Calculates password strength based on entropy and heuristic rules
 */
export const calculateStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: "Empty",
      color: "bg-neutral-700",
      text: "text-neutral-500",
      width: "w-0",
    };
  }

  let score = 0;
  const len = password.length;

  // Length heuristics
  if (len >= 6) score += 1;
  if (len >= 10) score += 1;
  if (len >= 14) score += 1;
  if (len >= 18) score += 1;

  // Variety heuristics
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Common patterns penalty
  const hasRepeating = /(.)\1{2,}/.test(password); // e.g. aaa
  if (hasRepeating) score -= 1.5;

  const hasSequential = /123|abc|qwerty|asd/i.test(password);
  if (hasSequential) score -= 1;

  // Normalizing score to levels 1 - 4
  let level = 1;
  if (score >= 7) {
    level = 4; // Unbreakable
  } else if (score >= 5) {
    level = 3; // Strong
  } else if (score >= 3) {
    level = 2; // Medium
  } else {
    level = 1; // Too Weak
  }

  switch (level) {
    case 1:
      return {
        score: 25,
        label: "Too Weak",
        color: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]",
        text: "text-rose-400",
        width: "w-1/4",
      };
    case 2:
      return {
        score: 50,
        label: "Medium",
        color: "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]",
        text: "text-amber-400",
        width: "w-2/4",
      };
    case 3:
      return {
        score: 75,
        label: "Strong",
        color: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]",
        text: "text-emerald-400",
        width: "w-3/4",
      };
    case 4:
    default:
      return {
        score: 100,
        label: "Unbreakable",
        color: "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]",
        text: "text-cyan-400",
        width: "w-full",
      };
  }
};
