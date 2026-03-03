// smart-validate — Lightweight form validation library

export type ValidationResult = {
  valid: boolean;
  message: string;
};

export type PasswordStrength = "weak" | "fair" | "strong" | "very-strong";

export type PasswordAnalysis = {
  strength: PasswordStrength;
  score: number; // 0-100
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  message: string;
};

// ── Email Validation ──
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) return { valid: false, message: "Email is required" };
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(trimmed)) return { valid: false, message: "Invalid email format" };
  return { valid: true, message: "Valid email" };
}

// ── Password Strength ──
export function validatePassword(password: string): PasswordAnalysis {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;
  const score = Math.min(100, (passed / 5) * 80 + Math.min(password.length, 16) / 16 * 20);

  let strength: PasswordStrength = "weak";
  let message = "Too weak — add more variety";
  if (score >= 85) { strength = "very-strong"; message = "Excellent password"; }
  else if (score >= 65) { strength = "strong"; message = "Strong password"; }
  else if (score >= 40) { strength = "fair"; message = "Fair — consider adding special characters"; }

  return { strength, score: Math.round(score), checks, message };
}

// ── Custom Rule Validation ──
export type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
};

export function validate(value: string, rules: ValidationRule[]): ValidationResult {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return { valid: false, message: rule.message };
    }
  }
  return { valid: true, message: "Valid" };
}

// ── Built-in Rules ──
export const rules = {
  required: (msg = "This field is required"): ValidationRule => ({
    test: (v) => v.trim().length > 0,
    message: msg,
  }),
  minLength: (min: number, msg?: string): ValidationRule => ({
    test: (v) => v.length >= min,
    message: msg || `Must be at least ${min} characters`,
  }),
  maxLength: (max: number, msg?: string): ValidationRule => ({
    test: (v) => v.length <= max,
    message: msg || `Must be at most ${max} characters`,
  }),
  pattern: (regex: RegExp, msg = "Invalid format"): ValidationRule => ({
    test: (v) => regex.test(v),
    message: msg,
  }),
  url: (msg = "Invalid URL"): ValidationRule => ({
    test: (v) => {
      try { new URL(v); return true; } catch { return false; }
    },
    message: msg,
  }),
  phone: (msg = "Invalid phone number"): ValidationRule => ({
    test: (v) => /^\+?[\d\s\-()]{7,15}$/.test(v),
    message: msg,
  }),
};
