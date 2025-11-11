import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, Sparkles, User } from "lucide-react";
import { useAuthModal } from "../context/AuthModalContext";
import { toast } from "react-toastify";
import axios from "axios";
import Profile from "./Profile";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setActivePage, user, setUser } = useAuthModal();

  const pages = [
    { name: "Home", targetId: "home" },
    { name: "Services", targetId: "services" },
    { name: "Tech Stack", targetId: "TechStack" },
    { name: "Testimonials", targetId: "testimonials" },
    { name: "Contact", targetId: "contact" },
    { name: "Apply Internship", targetId: "intenship" },
  ];

  // 🌗 Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 🌗 Toggle theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 🧭 Smooth scroll (cross-route)
  const scrollToSection = (id) => {
    const offset = 100;

    const performScroll = () => {
      if (id) {
        const section = document.getElementById(id);
        if (section) {
          const topPos =
            section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: topPos, behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(performScroll, 500);
    } else {
      performScroll();
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0B1120]/90 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* ===== Desktop Navbar ===== */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* ✅ Logo */}
            <button
              onClick={() => scrollToSection(null)}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-emerald-400 blur-lg opacity-40"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.4)]">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                  SmaranAI
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                  Excellence in Education
                </p>
              </div>
            </button>

            {/* ✅ Nav Links */}
            <nav className="flex items-center space-x-10 mx-auto">
              {pages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => scrollToSection(page.targetId)}
                  className="transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                >
                  {page.name}
                </button>
              ))}
            </nav>

            {/* ✅ Right Side */}
            <div className="flex items-center space-x-3 relative">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user ? (
                <>
                  {/* ✅ Profile Circle */}
                  <button
                    onClick={() => setShowProfile((prev) => !prev)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-emerald-600 font-semibold shadow-md hover:scale-105 transition-transform overflow-hidden"
                    title={user.name || "Profile"}
                  >
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || <User size={18} />
                    )}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setActivePage("login")}
                  className="relative px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          {/* ===== Mobile Navbar ===== */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Logo */}
            <button
              onClick={() => scrollToSection(null)}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-emerald-400 blur-lg opacity-40"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.4)]">
                  <Sparkles className="text-white w-4 h-4" />
                </div>
              </div>
              <h2 className="text-base font-semibold text-emerald-700 dark:text-emerald-400">
                SmaranAI
              </h2>
            </button>

            <div className="flex items-center gap-3">
              {/* Profile in mobile */}
              {user && (
                <button
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-emerald-600 font-semibold shadow-md hover:scale-105 transition-transform overflow-hidden"
                >
                  {user.profile ? (
                    <img
                      src={user.profile}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || <User size={14} />
                  )}
                </button>
              )}

              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md border border-slate-200/60 bg-white/60 dark:bg-slate-800/60 shadow-sm"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ===== Mobile Dropdown ===== */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 dark:bg-[#0B1120]/95 border-t border-gray-200 dark:border-gray-700 py-4 px-6 shadow-md">
            <nav className="grid gap-4">
              {pages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => {
                    scrollToSection(page.targetId);
                    setMobileOpen(false);
                  }}
                  className="text-left transition-all text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                >
                  {page.name}
                </button>
              ))}
            </nav>

            <div className="mt-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full relative px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setActivePage("login")}
                  className="w-full relative px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ✅ Profile Popup (always visible regardless of device) */}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Header;
