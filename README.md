# smart-validate

> A lightweight, zero-dependency validation library for TypeScript and React.  
> Email, password strength, custom rules — all in under 2KB.

---

## Features

- **Zero dependencies** — pure TypeScript, no bloat
- **Type-safe** — full TypeScript support with inferred return types
- **Under 2KB** — tree-shakeable, only import what you use
- **Custom rules** — compose your own validation logic with `validate()`
- **Framework agnostic** — works with React, Vue, or vanilla JS
- **i18n ready** — override error messages in any language

---

## Installation

```bash
npm install smart-validate
```

---

## Usage

### Email Validation

```ts
import { validateEmail } from "smart-validate";

const result = validateEmail("hello@world.com");
// → { valid: true, message: "Valid email" }

const bad = validateEmail("not-an-email");
// → { valid: false, message: "Invalid email format" }
```

### Password Strength

```ts
import { validatePassword } from "smart-validate";

const analysis = validatePassword("Pass@123");
// → {
//     strength: "strong",
//     score: 82,
//     checks: { length: true, uppercase: true, lowercase: true, number: true, special: true },
//     message: "Strong password"
//   }
```

### Custom Rules

```ts
import { validate, rules } from "smart-validate";

const result = validate("hello world", [
  rules.required(),
  rules.minLength(3),
  rules.maxLength(100),
  rules.pattern(/^[a-z\s]+$/i, "Letters only"),
]);
// → { valid: true, message: "Valid" }
```

---

## API Reference

### `validateEmail(value: string): ValidationResult`

Validates an email address against RFC-compliant format rules.

| Field     | Type      | Description                        |
|-----------|-----------|------------------------------------|
| `valid`   | `boolean` | Whether the email is valid         |
| `message` | `string`  | Human-readable result message      |

---

### `validatePassword(value: string): PasswordAnalysis`

Analyses password strength across multiple criteria.

| Field      | Type                                        | Description                            |
|------------|---------------------------------------------|----------------------------------------|
| `valid`    | `boolean`                                   | Whether the password meets minimum bar |
| `strength` | `"weak" \| "fair" \| "strong" \| "very-strong"` | Strength tier                     |
| `score`    | `number`                                    | Numeric score from 0–100               |
| `checks`   | `Record<string, boolean>`                   | Per-criterion pass/fail breakdown      |
| `message`  | `string`                                    | Human-readable result message          |

**Checks include:** `length`, `uppercase`, `lowercase`, `number`, `special`

---

### `validate(value: string, rules: Rule[]): ValidationResult`

Runs a value through a composed array of rules. Stops at the first failure.

| Field     | Type      | Description                    |
|-----------|-----------|--------------------------------|
| `valid`   | `boolean` | Whether all rules passed       |
| `message` | `string`  | Message from the failing rule, or `"Valid"` |

---

### Built-in Rules

| Rule                              | Description                              |
|-----------------------------------|------------------------------------------|
| `rules.required()`                | Value must be non-empty                  |
| `rules.minLength(n)`              | Minimum character length                 |
| `rules.maxLength(n)`              | Maximum character length                 |
| `rules.pattern(regex, message?)`  | Must match the provided regular expression |
| `rules.email()`                   | Must be a valid email format             |

---

## TypeScript Types

```ts
interface ValidationResult {
  valid: boolean;
  message: string;
}

interface PasswordAnalysis extends ValidationResult {
  strength: "weak" | "fair" | "strong" | "very-strong";
  score: number;
  checks: Record<string, boolean>;
}

type Rule = (value: string) => ValidationResult;
```

---

## React Example

```tsx
import { useState } from "react";
import { validateEmail } from "smart-validate";

export default function EmailInput() {
  const [value, setValue] = useState("");
  const result = value ? validateEmail(value) : null;

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter email"
      />
      {result && (
        <p style={{ color: result.valid ? "green" : "red" }}>
          {result.message}
        </p>
      )}
    </div>
  );
}
```

---

## Custom Rule Example

```ts
import { validate } from "smart-validate";
import type { Rule } from "smart-validate";

const noSpaces: Rule = (value) => ({
  valid: !value.includes(" "),
  message: "No spaces allowed",
});

const result = validate("hello world", [noSpaces]);
// → { valid: false, message: "No spaces allowed" }
```

---

## Bundle Size

| Import              | Size (minified + gzipped) |
|---------------------|--------------------------|
| Full library        | ~1.8KB                   |
| `validateEmail`     | ~0.4KB                   |
| `validatePassword`  | ~0.9KB                   |
| `validate` + rules  | ~0.6KB                   |

---

## License

MIT © smart-validate
