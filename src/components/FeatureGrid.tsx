import { Zap, Shield, Feather, Puzzle, Code2, Globe } from "lucide-react";
import "./FeatureGrid.css";

const features = [
  { icon: Zap, title: "Zero Dependencies", desc: "Pure TypeScript. No bloat." },
  { icon: Shield, title: "Type-Safe", desc: "Full TypeScript support with inferred types." },
  { icon: Feather, title: "Under 2KB", desc: "Tree-shakeable and lightweight." },
  { icon: Puzzle, title: "Custom Rules", desc: "Compose your own validation logic." },
  { icon: Code2, title: "Framework Agnostic", desc: "Works with React, Vue, or vanilla JS." },
  { icon: Globe, title: "i18n Ready", desc: "Custom error messages in any language." },
];

const FeatureGrid = () => {
  return (
    <section className="feature-grid">
      <div className="feature-grid__container">
        <h2 className="feature-grid__heading">
          Why <span className="feature-grid__heading-accent">smart-validate</span>?
        </h2>
        <div className="feature-grid__grid">
          {features.map((f) => (
            <div key={f.title} className="feature-grid__card">
              <f.icon className="feature-grid__icon" />
              <h3 className="feature-grid__card-title">{f.title}</h3>
              <p className="feature-grid__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;