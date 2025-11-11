import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useAuthModal } from "../context/AuthModalContext";


function Profile({ onClose }) {
  const [profileImage, setProfileImage] = useState("");
  const { user, setUser } = useAuthModal();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await axios.post(
        "http://localhost:8080/api/user/profileupdate",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Profile photo updated successfully!");
      setProfileImage(res.data.profile);
      setUser({ ...user, profile: res.data.profile }); // update context
      window.location.reload();
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U"; // default letter if no name

  return (
    <div className="fixed top-20 right-5 z-50">
      <div
        className={`relative 
        bg-gradient-to-br from-violet-200 via-blue-300 to-blue-400 
        dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#1E1B4B]
        text-violet-800 dark:text-gray-100
        p-6 rounded-2xl shadow-xl w-72 flex flex-col items-center 
        border border-violet-300 dark:border-gray-700
        hover:shadow-2xl transition-all duration-300`}
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-violet-600 dark:text-gray-400 hover:text-red-400 transition-colors"
        >
          <FaTimes size={18} />
        </button>

        {/* 🖼 Profile Section */}
        <div className="relative group mb-4 mt-1">
          {profileImage || user?.profile ? (
            <img
              src={profileImage || user.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white/80 dark:border-gray-700 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-4xl font-bold shadow-lg">
              {userInitial}
            </div>
          )}

          {/* 📁 Upload Overlay */}
          <label className="absolute inset-0 flex items-center justify-center bg-violet-700/50 dark:bg-emerald-700/40 text-xs opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
            <span className="text-white font-semibold">Change</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* 🧠 User Info */}
        <h2 className="text-lg font-bold tracking-wide text-violet-900 dark:text-emerald-400">
          {user?.name}
        </h2>
        <p className="text-sm text-violet-700 dark:text-gray-400 mb-2">
          {user?.email}
        </p>

        <div className="w-full h-[1px] bg-violet-400/50 dark:bg-gray-700/60 my-2" />

        <p className="text-xs text-violet-600 dark:text-gray-400 italic text-center">
          Keep your profile up to date ✨
        </p>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={document.documentElement.classList.contains("dark") ? "dark" : "colored"}
        />
      </div>
    </div>
  );
}

export default Profile;
