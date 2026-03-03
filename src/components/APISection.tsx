import CodeBlock from "./CodeBlock";
import "./APISection.css";

const examples = [
  {
    title: "email-validation.ts",
    code: `import { validateEmail } from "smart-validate";
const result = validateEmail("hello@world.com");
// → { valid: true, message: "Valid email" }
const bad = validateEmail("not-an-email");
// → { valid: false, message: "Invalid email format" }`,
  },
  {
    title: "password-check.ts",
    code: `import { validatePassword } from "smart-validate";
const analysis = validatePassword("Pass@123");
// → {
//     strength: "strong",
//     score: 82,
//     checks: { length: ✓, uppercase: ✓, ... },
//     message: "Strong password"
//   }`,
  },
  {
    title: "custom-rules.ts",
    code: `import { validate, rules } from "smart-validate";
const result = validate("hello world", [
  rules.required(),
  rules.minLength(3),
  rules.maxLength(100),
  rules.pattern(/^[a-z\\s]+$/i, "Letters only"),
]);
// → { valid: true, message: "Valid" }`,
  },
];

const APISection = () => {
  return (
    <section className="api-section">
      <div className="api-section__container">
        <h2 className="api-section__heading">
          Clean <span className="api-section__heading-accent">API</span>
        </h2>
        <p className="api-section__subheading">
          Three functions. Zero configuration. Instant validation.
        </p>
        <div className="api-section__examples">
          {examples.map((ex) => (
            <CodeBlock key={ex.title} title={ex.title} code={ex.code} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default APISection;