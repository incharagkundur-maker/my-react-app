import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Why Us", path: "/about" },
    { name: "Testimonials", path: "/research" },
    { name: "Contact", path: "/contact" },
  ];

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update theme when toggled
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0B1120]/90 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* ===== Desktop Navbar ===== */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* ✅ No SmaranAI text here */}

          {/* Nav Links */}
          <nav className="flex items-center space-x-10 mx-auto">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`transition-all text-sm font-medium ${
                  location.pathname === page.path
                    ? "text-emerald-600 dark:text-emerald-400 underline underline-offset-8"
                    : "text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                }`}
              >
                {page.name}
              </Link>
            ))}
          </nav>

          {/* Right Section - Dark Mode & Get Started Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
  to="/services"
  className="relative px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300"
>
  Get Started
  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-50 -z-10"></span>
</Link>

          </div>
        </div>

        {/* ===== Mobile Navbar ===== */}
        <div className="flex items-center justify-between w-full md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-md border border-slate-200/60 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            )}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* ===== Mobile Dropdown ===== */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0B1120]/95 border-t border-gray-200 dark:border-gray-700 py-4 px-6 shadow-md">
          <nav className="grid gap-4">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                onClick={() => setMobileOpen(false)}
                className={`block text-base transition-all ${
                  location.pathname === page.path
                    ? "font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-8"
                    : "text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                }`}
              >
                {page.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
