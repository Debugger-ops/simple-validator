import { Terminal } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__glow" />

      <div className="hero__container">
        <div className="hero__badge">
          <Terminal className="hero__badge-icon" />
          <span className="hero__badge-text">smart-validate v1.0</span>
        </div>

        <h1 className="hero__heading">
          <span className="hero__heading-default">Form validation</span>
          <br />
          <span className="hero__heading-accent">made simple.</span>
        </h1>

        <p className="hero__subheading">
          A lightweight, zero-dependency validation library for React forms.
          Email, password strength, custom rules — all in under 2KB.
        </p>

        <div className="hero__install">
          <span className="hero__install-dollar">$</span>
          <span className="hero__install-cmd">npm install</span>
          <span className="hero__install-pkg">smart-validate</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;