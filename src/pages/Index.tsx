import HeroSection from "@/components/HeroSection";
import LiveDemo from "@/components/LiveDemo";
import APISection from "@/components/APISection";
import FeatureGrid from "@/components/FeatureGrid";
import { Github, Star, Package, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import "./Index.css";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="index">
      {/* Announcement banner */}
      <div className="index__banner">
        <Package className="index__banner-icon" />
        <span>smart-validate v1.0 is out — zero dependencies, full TypeScript support.</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="index__banner-link">
          Read the release →
        </a>
      </div>

      {/* Nav */}
      <nav className={`index__nav${scrolled ? " index__nav--scrolled" : ""}`}>
        <div className="index__nav-inner">
          <div className="index__nav-brand">
            <div className="index__nav-dot" />
            <span className="index__nav-name">smart-validate</span>
          </div>
          <div className="index__nav-links">
            <a href="#demo" className="index__nav-link">Demo</a>
            <a href="#features" className="index__nav-link">Features</a>
            <a href="#api" className="index__nav-link">API</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="index__nav-github-btn"
            >
              <Github className="index__nav-github-icon" />
              <span>Star on GitHub</span>
              <span className="index__nav-star-badge">
                <Star className="index__nav-star-icon" />
                1.2k
              </span>
            </a>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <LiveDemo />
        <div id="api">
          <APISection />
        </div>
        <div id="features">
          <FeatureGrid />
        </div>
      </main>

      {/* Stats bar */}
      <div className="index__stats">
        <div className="index__stats-inner">
          {[
            { label: "Weekly Downloads", value: "12,400+" },
            { label: "GitHub Stars", value: "1,200+" },
            { label: "Bundle Size", value: "<2KB" },
            { label: "Dependencies", value: "0" },
          ].map((stat) => (
            <div key={stat.label} className="index__stat">
              <span className="index__stat-value">{stat.value}</span>
              <span className="index__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="index__footer">
        <div className="index__footer-inner">
          <div className="index__footer-brand">
            <div className="index__nav-dot" />
            <span className="index__nav-name">smart-validate</span>
          </div>
          <p className="index__footer-text">
            Built with TypeScript · MIT License ·{" "}
            <span className="index__footer-accent">smart-validate</span>
          </p>
          <div className="index__footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="index__footer-link">GitHub</a>
            <span className="index__footer-divider">·</span>
            <a href="#" className="index__footer-link">Docs</a>
            <span className="index__footer-divider">·</span>
            <a href="#" className="index__footer-link">Changelog</a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackToTop && (
        <button className="index__back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp className="index__back-to-top-icon" />
        </button>
      )}
    </div>
  );
};

export default Index;