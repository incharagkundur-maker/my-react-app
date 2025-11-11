import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaKey, FaInfoCircle } from "react-icons/fa";

function ForgotOtpVerify({ email, onClose, onSubmit }) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpFocus, setOtpFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef(null);
  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  const passwordRules = [
    { text: "Minimum 6 characters", regex: /^.{6,}$/ },
    { text: "At least one uppercase letter", regex: /[A-Z]/ },
    { text: "At least one lowercase letter", regex: /[a-z]/ },
    { text: "Contains numbers", regex: /[0-9]/ },
    { text: "Contains special characters (@, _)", regex: /[@_]/ },
  ];

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(300);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlesubmit = async () => {
    const invalidRule = passwordRules.find(
      (rule) => !rule.regex.test(password)
    );
    if (invalidRule) {
      toast.error(`Password invalid: ${invalidRule.text}`);
      return;
    }

    try {
      const user = { otp, password, email };
      const result = await axios.post(
        `http://localhost:8080/api/user/resetPassword`,
        user,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
      setTimeout(() => onSubmit(), 1000);
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const handleresend = async () => {
    try {
      const user = { email };
      const result = await axios.post(`http://localhost:8080/api/user/resendOtp`, user, {
        withCredentials: true,
      });
      toast.success(result.data.message);
      startTimer();
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <AnimatePresence>
      {/* 🔹 Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }} // was 0.6, now lighter
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" // was bg-black/70
      ></motion.div>

      {/* Login Box */}
      <motion.div
        key="login"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.25 }}
        className="
    fixed top-[85px] right-2 sm:right-10 md:right-24 z-[9999]
    bg-white/60 dark:bg-[#0E1835]/60  // was /80 — more transparent
    backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-10 w-[90%] max-w-[380px]
    border border-emerald-100 dark:border-teal-700/40
    text-gray-800 dark:text-gray-100
  "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-emerald-400 text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
          Verify OTP
        </h1>

        {/* OTP Field */}
        <div className="relative mb-6">
          <label
            className={`absolute left-3 transition-all ${
              otpFocus
                ? "text-xs -top-3 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-gray-700 dark:text-gray-300 top-2.5 text-sm"
            }`}
          >
            Enter OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none focus:border-emerald-500 py-2 px-3 pr-10"
            onFocus={() => setOtpFocus(true)}
            onBlur={(e) => !e.target.value && setOtpFocus(false)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400">
            <FaKey />
          </span>
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <label
            className={`absolute left-3 transition-all ${
              passwordFocus
                ? "text-xs -top-3 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-gray-700 dark:text-gray-300 top-2.5 text-sm"
            }`}
          >
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none focus:border-emerald-500 py-2 px-3 pr-10"
            onFocus={() => {
              setPasswordFocus(true);
              setShowRules(true);
            }}
            onBlur={(e) => {
              !e.target.value && setPasswordFocus(false);
              setShowRules(false);
            }}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

          {/* Password Rules */}
          {showRules && (
            <div className="absolute left-0 mt-1 p-3 bg-emerald-50 dark:bg-[#1B294E] border border-emerald-200 dark:border-teal-600 rounded-md shadow-md text-xs z-50 w-full">
              <p className="font-semibold mb-1 flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <FaInfoCircle /> Password must contain:
              </p>
              <ul className="list-disc list-inside ml-2">
                {passwordRules.map((rule) => (
                  <li
                    key={rule.text}
                    className={
                      rule.regex.test(password)
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-600 dark:text-gray-300"
                    }
                  >
                    {rule.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Timer & Resend */}
        <div className="text-right mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Time remaining:{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatTime(timeLeft)}
            </span>
          </p>
          <button
            onClick={handleresend}
            disabled={timeLeft !== 0}
            className={`text-sm font-medium ${
              timeLeft === 0
                ? "text-emerald-600 dark:text-emerald-400 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Resend OTP
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handlesubmit}
          className="w-full py-2 text-white rounded-full font-semibold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 transition-transform duration-150 focus:scale-95 active:scale-95 focus:outline-none cursor-pointer"
        >
          Submit
        </button>

        {/* Info Text */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          OTP sent to{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {email}
          </span>
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default ForgotOtpVerify;
