import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";

function ForgotEmail({ setemail, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  

  const handlesubmit = async (e) => {
    try {
      const user = { email };
      const result = await axios.post(`http://localhost:8080/api/user/resendOtp`, user, {
        withCredentials: true,
      });

      toast.success(result.data.message);
      setemail(email);

      setTimeout(() => {
        onSubmit();
      }, 1000);
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
          Enter Your Email
        </h1>

        {/* Email Field */}
        <div className="relative mb-8">
          <label
            className={`absolute left-3 transition-all ${
              emailFocus
                ? "text-xs -top-3 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-gray-700 dark:text-gray-300 top-2.5 text-sm"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full border-b-2 border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100 bg-transparent
              focus:outline-none focus:border-emerald-500
              py-2 px-3 pr-10 transition-all
            "
            onFocus={() => setEmailFocus(true)}
            onBlur={(e) => !e.target.value && setEmailFocus(false)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400">
            <FaEnvelope />
          </span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handlesubmit}
          className="
            w-full py-2 text-white rounded-full font-semibold
            bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
            hover:opacity-90 transition-transform duration-150
            focus:scale-95 active:scale-95 focus:outline-none cursor-pointer
          "
        >
          Send OTP
        </button>

        {/* Hint text */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          We’ll send a verification OTP to your registered email.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default ForgotEmail;
