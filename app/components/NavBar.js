"use client";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
  if (typeof window === "undefined") return;
      // Add background blur when scrolled
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "top-2" : ""
      }`}
    >
      <div className="main-container">
        <div 
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "glass-strong" : "glass"
          } rounded-xl px-6 py-3 shadow-lg ${
            scrolled ? "shadow-blue-500/10" : ""
          }`}
        >
          {/* Logo / Brand with Hover Effect */}
          <div className="flex items-center gap-3">
            <a 
              href="#home" 
              className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5"
            >
              {/* Animated Logo Icon */}
              <div className="relative">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="transition-transform duration-300 group-hover:rotate-90"
                >
                  <path 
                    d="M4 12h16M12 4v16" 
                    stroke="#60A5FA" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    className="transition-all duration-300 group-hover:stroke-[#9fe8ff]"
                  />
                </svg>
                <div className="absolute inset-0 bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <span className="font-semibold text-accent transition-all duration-300 group-hover:tracking-wider">
                Portfolio
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className={`nav-link relative px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? "text-accent font-medium bg-accent/10" 
                        : "text-muted hover:text-gray-200 hover:bg-white/5"
                    }`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {item.label}
                    
                    {/* Active Indicator */}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span 
                className={`block w-5 h-0.5 bg-accent transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`} 
              />
              <span 
                className={`block w-5 h-0.5 bg-accent transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`} 
              />
              <span 
                className={`block w-5 h-0.5 bg-accent transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden mt-2 glass-strong rounded-xl overflow-hidden transition-all duration-300 ${
            mobileMenuOpen 
              ? "max-h-96 opacity-100 shadow-lg shadow-blue-500/10" 
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li 
                  key={item.id}
                  className={`transition-all duration-300 ${
                    mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                >
                  <a 
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? "text-accent font-medium bg-accent/10" 
                        : "text-muted hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      {activeSection === item.id && (
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}