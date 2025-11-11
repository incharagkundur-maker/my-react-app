import React, { useState } from "react";
import { toast } from "react-toastify";

const EnrollmentForm = () => {
  // 🧠 Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    college: "",
    degree: "",
    year: "",
    major: "",
    startDate: "",
    experience: "",
    goals: "",
    referral: "",
  });

  // ✍️ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "city",
      "state",
      "college",
      "degree",
      "year",
      "major",
      "startDate",
      "experience",
      "goals",
    ];
    const missing = requiredFields.filter((field) => !formData[field]);

    if (missing.length > 0) {
      toast.error("Please fill all required fields!");
      return;
    }

    console.log("✅ Enrollment Data:", formData);
    toast.success("Enrollment submitted successfully!");
  };

  return (
    <section className="bg-gradient-to-b from-white to-green-50 dark:from-[#0B1120] dark:to-[#0E1835] rounded-2xl shadow-lg p-10 mt-10 border border-gray-200 dark:border-gray-700 transition-all duration-500">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 mb-2">
        Student Information
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Please provide accurate information. All fields marked with * are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Full Name *"
              className="input-style"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address *"
              className="input-style"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone Number *"
              className="input-style"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="City *"
              className="input-style"
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              type="text"
              placeholder="State *"
              className="input-style"
            />
          </div>
        </div>

        {/* Academic Background */}
        <div>
          <h3 className="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            Academic Background
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              type="text"
              placeholder="College/University Name *"
              className="input-style"
            />
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              type="text"
              placeholder="Degree Program *"
              className="input-style"
            />
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              type="text"
              placeholder="Year of Study *"
              className="input-style"
            />
            <input
              name="major"
              value={formData.major}
              onChange={handleChange}
              type="text"
              placeholder="Major/Specialization *"
              className="input-style"
            />
          </div>
        </div>

        {/* Course Details */}
        <div>
          <h3 className="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            Course Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="text"
              placeholder="Preferred Start Date *"
              className="input-style"
            />
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              type="text"
              placeholder="Current Experience Level *"
              className="input-style"
            />
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="What are your learning goals? *"
              rows="4"
              className="input-style md:col-span-2 resize-none"
            ></textarea>
            <input
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              type="text"
              placeholder="How did you hear about us?"
              className="input-style"
            />
          </div>
        </div>

        {/* Terms */}
        <div className="bg-green-50 dark:bg-[#0D1B2A] border border-green-100 dark:border-emerald-800 p-4 rounded-lg text-gray-600 dark:text-gray-300 text-sm">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-500 
          text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:opacity-90 
          transition-all text-base"
        >
          Complete Enrollment
        </button>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
          Need help? Contact us at{" "}
          <a
            href="mailto:admin@smaranai.in"
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            admin@smaranai.in
          </a>
        </p>
      </form>

      {/* 🔧 Input Style Class */}
      <style>
        {`
          .input-style {
            width: 100%;
            padding: 12px 16px;
            border-radius: 10px;
            border: 1.5px solid #cbd5e1;
            font-size: 15px;
            background-color: #ffffff;
            color: #111827;
            transition: all 0.3s ease;
          }

          .dark .input-style {
            background-color: #111a2b;
            border-color: #334155;
            color: #f1f5f9;
          }

          .input-style:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
          }

          .dark .input-style:focus {
            border-color: #34d399;
            box-shadow: 0 0 0 2px rgba(52,211,153,0.2);
          }
        `}
      </style>
    </section>
  );
};

export default EnrollmentForm;
