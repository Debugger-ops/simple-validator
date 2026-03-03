import { useState } from "react";
import { validateEmail, validatePassword, validate, rules } from "@/lib/smart-validate";
import type { PasswordAnalysis, ValidationResult } from "@/lib/smart-validate";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Mail, Key, FileText } from "lucide-react";
import "./LiveDemo.css";

const strengthColors: Record<string, string> = {
  weak: "live-demo__strength-bar--weak",
  fair: "live-demo__strength-bar--fair",
  strong: "live-demo__strength-bar--strong",
  "very-strong": "live-demo__strength-bar--very-strong",
};

const LiveDemo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [custom, setCustom] = useState("");

  const emailResult: ValidationResult | null = email ? validateEmail(email) : null;
  const passwordResult: PasswordAnalysis | null = password ? validatePassword(password) : null;
  const customResult: ValidationResult | null = custom
    ? validate(custom, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(50),
        rules.pattern(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
      ])
    : null;

  return (
    <section className="live-demo" id="demo">
      <div className="live-demo__container">
        <h2 className="live-demo__heading">
          Try it <span className="live-demo__heading-accent">live</span>
        </h2>
        <p className="live-demo__subheading">
          Type below to see real-time validation in action.
        </p>

        <div className="live-demo__grid">
          {/* Email */}
          <div className="live-demo__card">
            <div className="live-demo__card-header">
              <Mail className="live-demo__card-icon" />
              <span className="live-demo__card-label">validateEmail()</span>
            </div>
            <Input
              placeholder="test@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="live-demo__input"
            />
            {emailResult && (
              <div className={`live-demo__result ${emailResult.valid ? "live-demo__result--valid" : "live-demo__result--invalid"}`}>
                {emailResult.valid
                  ? <CheckCircle2 className="live-demo__result-icon" />
                  : <XCircle className="live-demo__result-icon" />}
                <span className="live-demo__result-message">{emailResult.message}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="live-demo__card">
            <div className="live-demo__card-header">
              <Key className="live-demo__card-icon" />
              <span className="live-demo__card-label">validatePassword()</span>
            </div>
            <Input
              type="password"
              placeholder="Pass@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="live-demo__input"
            />
            {passwordResult && (
              <>
                <div className="live-demo__strength">
                  <div className="live-demo__strength-meta">
                    <span className="live-demo__strength-label">Strength</span>
                    <span className="live-demo__strength-value">{passwordResult.strength}</span>
                  </div>
                  <div className="live-demo__strength-track">
                    <div
                      className={`live-demo__strength-bar ${strengthColors[passwordResult.strength]}`}
                      style={{ width: `${passwordResult.score}%` }}
                    />
                  </div>
                </div>
                <div className="live-demo__checks">
                  {Object.entries(passwordResult.checks).map(([key, passed]) => (
                    <div key={key} className={`live-demo__check ${passed ? "live-demo__check--passed" : "live-demo__check--failed"}`}>
                      {passed
                        ? <CheckCircle2 className="live-demo__check-icon" />
                        : <XCircle className="live-demo__check-icon" />}
                      {key}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Custom Rules */}
          <div className="live-demo__card">
            <div className="live-demo__card-header">
              <FileText className="live-demo__card-icon" />
              <span className="live-demo__card-label">validate(rules)</span>
            </div>
            <Input
              placeholder="Your name"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="live-demo__input"
            />
            {customResult && (
              <div className={`live-demo__result ${customResult.valid ? "live-demo__result--valid" : "live-demo__result--invalid"}`}>
                {customResult.valid
                  ? <CheckCircle2 className="live-demo__result-icon" />
                  : <XCircle className="live-demo__result-icon" />}
                <span className="live-demo__result-message">{customResult.message}</span>
              </div>
            )}
            <div className="live-demo__rules">
              <p>• required</p>
              <p>• minLength(3)</p>
              <p>• maxLength(50)</p>
              <p>• letters only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;