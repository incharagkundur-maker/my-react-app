import React from "react";
import {
  Clock,
  Target,
  Users,
  CheckCircle,
  BookOpen,
  Award,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const CourseCards = () => {
  const courses = [
    {
      title: "Python for Data Science",
      category: "Data Science & Analytics",
      icon: "💻",
      gradient: "from-blue-500 to-cyan-400",
      description:
        "Master Python programming with focus on data analysis, visualization, and scientific computing. Learn pandas, NumPy, Matplotlib, and more.",
      detailsTop: [
        { icon: <Target className="w-4 h-4 text-sky-500" />, text: "Beginner to Intermediate" },
        { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "8 Weeks" },
        { icon: <Users className="w-4 h-4 text-purple-500" />, text: "500+ enrolled" },
      ],
      detailsBottom: [
        "Hands-on coding with real datasets",
        "Interactive Jupyter notebooks",
        "Capstone project included",
        "Industry-standard tools",
      ],
      rating: "4.9",
    },
    {
      title: "Machine Learning Fundamentals",
      category: "Artificial Intelligence",
      icon: "🧠",
      gradient: "from-green-500 to-emerald-400",
      description:
        "Comprehensive introduction to machine learning algorithms, model training, and deployment. Build real ML models from scratch.",
      detailsTop: [
        { icon: <Target className="w-4 h-4 text-sky-500" />, text: "Intermediate" },
        { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "10 Weeks" },
        { icon: <Users className="w-4 h-4 text-purple-500" />, text: "450+ enrolled" },
      ],
      detailsBottom: [
        "Supervised & unsupervised learning",
        "Model evaluation techniques",
        "Scikit-learn mastery",
        "Real-world ML projects",
      ],
      rating: "4.8",
    },
    {
      title: "Deep Learning with Neural Networks",
      category: "AI & Neural Networks",
      icon: "🔗",
      gradient: "from-pink-500 to-rose-400",
      description:
        "Deep dive into neural networks, CNNs, RNNs, and transformers. Build state-of-the-art deep learning models using TensorFlow and PyTorch.",
      detailsTop: [
        { icon: <Target className="w-4 h-4 text-sky-500" />, text: "Advanced" },
        { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "12 Weeks" },
        { icon: <Users className="w-4 h-4 text-purple-500" />, text: "350+ enrolled" },
      ],
      detailsBottom: [
        "TensorFlow & PyTorch frameworks",
        "Computer vision applications",
        "NLP with transformers",
        "GPU-accelerated training",
      ],
      rating: "4.9",
    },
    {
      title: "Prompt Engineering & LLM Mastery",
      category: "Generative AI",
      icon: "🤖",
      gradient: "from-orange-500 to-amber-400",
      description:
        "Master the art of prompt engineering with GPT-4, Claude, and other LLMs. Learn to build AI applications using modern prompt techniques.",
      detailsTop: [
        { icon: <Target className="w-4 h-4 text-sky-500" />, text: "Beginner to Advanced" },
        { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "6 Weeks" },
        { icon: <Users className="w-4 h-4 text-purple-500" />, text: "600+ enrolled" },
      ],
      detailsBottom: [
        "GPT-4 and Claude expertise",
        "Advanced prompting strategies",
        "AI app development",
        "Chain-of-thought reasoning",
      ],
      rating: "5.0",
    },
    {
      title: "Data Visualization Mastery",
      category: "Data Science & Analytics",
      icon: "📊",
      gradient: "from-green-500 to-lime-400",
      description:
        "Create stunning, insightful data visualizations. Master Tableau, Power BI, D3.js, and Python visualization libraries.",
      detailsTop: [
        { icon: <Target className="w-4 h-4 text-sky-500" />, text: "Intermediate" },
        { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "6 Weeks" },
        { icon: <Users className="w-4 h-4 text-purple-500" />, text: "400+ enrolled" },
      ],
      detailsBottom: [
        "Tableau & Power BI dashboards",
        "D3.js interactive charts",
        "Storytelling with data",
        "Dashboard design principles",
      ],
      rating: "4.7",
    },
    {
      title: "SQL & Database Management",
      category: "Data Engineering",
      icon: "🗄️",
      gradient: "from-indigo-500 to-violet-400",
      description:
        "Master SQL queries, database design, and data engineering fundamentals. Learn PostgreSQL, MySQL, and NoSQL databases.",
      detailsTop: [
        { icon: <Target className="w-4 h-4 text-sky-500" />, text: "Beginner to Intermediate" },
        { icon: <Clock className="w-4 h-4 text-emerald-500" />, text: "6 Weeks" },
        { icon: <Users className="w-4 h-4 text-purple-500" />, text: "550+ enrolled" },
      ],
      detailsBottom: [
        "Advanced SQL queries",
        "Database design and normalization",
        "PostgreSQL & MySQL",
        "Query optimization",
      ],
      rating: "4.8",
    },
  ];

  return (
    <div className="pt-18">
      {/* 🌟 Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-50 to-green-100 dark:from-[#0A0F2C] dark:via-[#0B1739] dark:to-[#0D102B] transition-all duration-500 py-24 px-6">
        <div className="absolute top-10 left-16 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute bottom-10 right-16 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        <div className="absolute top-8 left-8 text-teal-600 text-sm font-medium flex items-center gap-2 hover:text-teal-800 transition">
          <ArrowLeft className="w-4 h-4" />
          <Link to="/" className="hover:underline">
            Back to Home
          </Link>
        </div>

        <div className="absolute top-6 right-8 flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_6px_20px_rgba(0,200,150,0.5)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h2 className="text-emerald-700 font-semibold text-lg tracking-tight">
              SmaranAI
            </h2>
            <p className="text-emerald-600 text-sm opacity-80 leading-tight">
              Excellence in Education
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 font-medium shadow-sm hover:shadow-md transition-all duration-300">
          ⚡ AI-Powered Micro Courses
        </div>

        <h1 className="mt-6 text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent drop-shadow-md text-center">
          Master AI & Data Science
        </h1>

        <p className="text-slate-600 text-lg text-center max-w-2xl mb-16 leading-relaxed">
          Bite-sized, practical courses designed for busy professionals. Learn
          cutting-edge skills with hands-on projects, real-world applications,
          and expert mentorship.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl w-full px-4">
          {[
            { icon: <BookOpen className="w-6 h-6 text-emerald-600 mb-3 mx-auto" />, title: "6+", subtitle: "Expert Courses" },
            { icon: <Users className="w-6 h-6 text-emerald-600 mb-3 mx-auto" />, title: "2500+", subtitle: "Active Learners" },
            { icon: <Award className="w-6 h-6 text-emerald-600 mb-3 mx-auto" />, title: "95%", subtitle: "Completion Rate" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              {item.icon}
              <p className="text-3xl font-bold text-emerald-600 mb-1">{item.title}</p>
              <p className="text-slate-700 text-sm font-medium">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💡 Course Cards Section */}
      <div className="w-full flex flex-col gap-8 p-8 bg-white dark:bg-[#0B1120] rounded-2xl shadow-md border border-gray-100 dark:border-none font-sans transition-all duration-500">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white/90 dark:bg-[#0E1835]/90 backdrop-blur-md border border-gray-100 dark:border-gray-700/40 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden"
          >
            <div className={`h-1 w-full bg-gradient-to-r ${course.gradient}`}></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-2xl shadow-md`}
                  >
                    <span className="text-white">{course.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-wide">
                      {course.title}
                    </h3>
                    <span
                      className={`inline-block mt-2 text-xs sm:text-sm px-3 py-1 rounded-full bg-gradient-to-r ${course.gradient} text-white font-medium shadow-sm`}
                    >
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="text-yellow-500 font-medium text-lg">
                  ⭐ {course.rating}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed mb-4">
                {course.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300 mb-4">
                {course.detailsTop.map((detail, j) => (
                  <div key={j} className="flex items-center gap-2">
                    {detail.icon} {detail.text}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                {course.detailsBottom.map((detail, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> {detail}
                  </div>
                ))}
              </div>

              <Link
                to="/syllabus"
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium text-sm transition mt-8"
              >
                📘 View Complete Syllabus
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 💬 Recommendation Section */}
      <section className="bg-gradient-to-b from-green-50 to-green-100 rounded-2xl p-12 mt-14 shadow-sm text-center border border-transparent transition-all duration-500">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-5 rounded-2xl shadow-lg transition-all duration-500">
            <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-600 max-w-2xl text-base leading-relaxed">
            Get personalized course recommendations from our AI career counselor.
            We’ll help you choose the perfect learning path based on your goals.
          </p>
          <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="w-3 h-3 bg-pink-300 rounded-full shadow-inner"></span>
            Get AI Recommendations
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseCards;
