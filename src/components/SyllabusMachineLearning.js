import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import Header from "./Header";
import EnrollmentForm from "./EnrollmentForm";

const SyllabusMachineLearning = () => {
  const navigate = useNavigate();

  const syllabus = [
    {
      week: "1-2",
      title: "ML Foundations",
      topics: [
        "Introduction to machine learning",
        "Types of ML algorithms",
        "Train-test split and cross-validation",
        "Evaluation metrics",
      ],
    },
    {
      week: "3-4",
      title: "Supervised Learning - Regression",
      topics: [
        "Linear and polynomial regression",
        "Regularization (Lasso, Ridge)",
        "Feature engineering",
        "Model optimization",
      ],
    },
    {
      week: "5-6",
      title: "Supervised Learning - Classification",
      topics: [
        "Logistic regression",
        "Decision trees and random forests",
        "Support vector machines",
        "Ensemble methods",
      ],
    },
    {
      week: "7-8",
      title: "Unsupervised Learning",
      topics: [
        "K-means clustering",
        "Hierarchical clustering",
        "Principal component analysis (PCA)",
        "Dimensionality reduction",
      ],
    },
    {
      week: "9-10",
      title: "Advanced Topics & Project",
      topics: [
        "Hyperparameter tuning",
        "Model deployment basics",
        "ML pipelines",
        "Capstone ML project",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-[#0A1125] dark:to-[#0E1835] transition-all duration-500">
      {/* ✅ Include Navbar (Header) */}
      <Header currentPage="syllabus" setCurrentPage={() => {}} setActivePage={() => {}} />

      {/* Page Content */}
      <div className="px-6 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-600 mb-8 hover:underline hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} /> Back to Courses
        </button>

        {/* Title Section */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-full 
            bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-medium 
            shadow-md mb-4">
            <span className="text-lg mr-2">📘</span> Syllabus
          </div>

          <h1 className="text-5xl font-semibold text-transparent bg-clip-text 
            bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 drop-shadow-sm">
            Syllabus for Machine Learning
          </h1>
        </div>

        {/* Modules */}
        <div className="space-y-6 w-full px-2 sm:px-4 md:px-6 lg:px-8">
          {syllabus.map((module, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start md:items-center 
              bg-gradient-to-br from-white to-gray-50 
              dark:from-[#0E1835] dark:to-[#13224A] 
              shadow-sm border border-gray-100 dark:border-gray-700/40 
              rounded-2xl px-6 py-5 transition-all duration-300 hover:shadow-lg w-full"
            >
              <div className="flex flex-col items-center mr-6">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg 
                  bg-teal-500 text-white font-semibold shadow-md"
                >
                  {i + 1}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-sm font-medium bg-emerald-50 text-emerald-600 
                    px-3 py-1 rounded-full shadow-sm border border-emerald-100"
                  >
                    Week {module.week}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {module.title}
                  </h3>
                </div>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {module.topics.map((topic, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-xl 
            font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Enroll Now <ArrowRight size={18} />
          </button>

          <button
            className="flex items-center gap-2 border border-gray-300 px-6 py-2.5 rounded-xl 
            font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            <Download size={18} /> Download Brochure
          </button>
        </div>

        {/* Enrollment Form */}
        <div className="max-w-5xl mx-auto mt-16">
          <EnrollmentForm />
        </div>
      </div>
    </div>
  );
};

export default SyllabusMachineLearning;
