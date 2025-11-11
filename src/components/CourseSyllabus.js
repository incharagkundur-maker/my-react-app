import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import Header from "./Header";
import EnrollmentForm from "./CourseEnrollmentForm";
import { useAuthModal } from "../context/AuthModalContext";

const CourseSyllabus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 Get syllabus data from navigation
  const syllabusData = location.state?.syllabusData || [];
  const courseTitle = location.state?.title || "Course";
  const { user, loadingUser } = useAuthModal();

  useEffect(() => {
      if (!loadingUser && !user) {
        navigate("/");
      }
    }, [user, loadingUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-[#0A1125] dark:to-[#0E1835] transition-all duration-500">
      <Header currentPage="syllabus" setCurrentPage={() => {}} setActivePage={() => {}} />

      <div className="px-6 py-16">
        

        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-medium shadow-md mb-4">
            <span className="text-lg mr-2">📘</span> Syllabus
          </div>

          <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 drop-shadow-sm">
           {courseTitle}
          </h1>
        </div>

        <div className="space-y-6 w-full px-2 sm:px-4 md:px-6 lg:px-8">
          {syllabusData.length > 0 ? (
            syllabusData.map((week, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center bg-gradient-to-br from-white to-gray-50 dark:from-[#0E1835] dark:to-[#13224A] shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl px-6 py-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center mr-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-500 text-white font-semibold shadow-md">
                    {i + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full shadow-sm border border-emerald-100">
                      Week {week.week}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {week.description}
                    </h3>
                  </div>

                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {week.week_array.map((topic, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="text-emerald-500">✓</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-12">
              No syllabus data available.
            </p>
          )}
        </div>

        {/* Buttons + Enrollment */}
        <div className="flex justify-center gap-6 mt-10">
          <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Enroll Now <ArrowRight size={18} />
          </button>

          <button className="flex items-center gap-2 border border-gray-300 px-6 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300">
            <Download size={18} /> Download Brochure
          </button>
        </div>

        <div className="max-w-5xl mx-auto mt-16">
          <EnrollmentForm />
        </div>
      </div>
    </div>
  );
};

export default CourseSyllabus;
