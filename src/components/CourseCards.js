import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
import { Link, useNavigate } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";

const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loadingUser } = useAuthModal();

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    "http://localhost:8080";

  // 🎨 Gradient & emoji rotation sets
  const gradientList = [
    "from-blue-500 to-cyan-400",
    "from-green-500 to-emerald-400",
    "from-pink-500 to-rose-400",
    "from-orange-500 to-amber-400",
    "from-indigo-500 to-violet-400",
  ];

  const emojiList = ["🧠", "💻", "🤖", "📊", "🔗", "🗄️"];

  // 🧠 Static fallback (if API fails)
  const staticCourses = [
    {
      course_name: "SQL & Database Management",
      course_domain: "Data Engineering",
      description:
        "Master SQL queries, database design, and data engineering fundamentals. Learn PostgreSQL, MySQL, and NoSQL databases.",
      course_level: "Beginner to Intermediate",
      how_many_weeks: 6,
      total_enrolled: 550,
      course_array: [
        "Advanced SQL queries",
        "Database design and normalization",
        "PostgreSQL & MySQL",
        "Query optimization",
      ],
    },
  ];

  // 🧩 Fetch Courses
  useEffect(() => {
    const handleGetCourses = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/api/course/getcourse`, {
          withCredentials: true,
        });
        const fetchedCourses = result.data.domains || result.data;

        const formatted = fetchedCourses.map((course, i) => ({
          title: course.course_name,
          category: course.course_domain,
          icon: emojiList[i % emojiList.length],
          gradient: gradientList[i % gradientList.length],
          description: course.description,
          detailsTop: [
            {
              icon: <Target className="w-4 h-4 text-sky-500" />,
              text: course.course_level,
            },
            {
              icon: <Clock className="w-4 h-4 text-emerald-500" />,
              text: `${course.how_many_weeks} Weeks`,
            },
            {
              icon: <Users className="w-4 h-4 text-purple-500" />,
              text: `${course.total_enrolled}+ enrolled`,
            },
          ],
          detailsBottom: course.course_array || [],
          rating: "4.8",
          courseweek: course.course_week_array,
        }));

        setCourses(formatted);
      } catch (error) {
        console.error("❌ API Fetch Error:", error);
        toast.error("Couldn't fetch courses — showing defaults");
      } finally {
        setLoading(false);
      }
    };

    handleGetCourses();
  }, [BASE_URL]);

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/");
    }
  }, [user, loadingUser, navigate]);

  const handleViewSyllabus = (course) => {
    console.log(course.course_week_array);
    navigate("/coursesyllabus", {
      state: { syllabusData: course.courseweek, title: course.title },
    });
  };

  return (
    <div className="pt-18">
      {/* 🌟 Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-50 to-green-100 dark:from-[#0A0F2C] dark:via-[#0B1739] dark:to-[#0D102B] transition-all duration-500 py-24 px-6">
        {/* Animated Background Glow */}
        <div className="absolute top-10 left-16 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute bottom-10 right-16 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        {/* Back Button */}
        <div className="absolute top-8 left-8 text-teal-600 text-sm font-medium flex items-center gap-2 hover:text-teal-800 transition">
          <ArrowLeft className="w-4 h-4" />
          <Link to="/" className="hover:underline">
            Back to Home
          </Link>
        </div>

        {/* Logo */}
        <div className="absolute top-6 right-8 flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_6px_20px_rgba(0,200,150,0.5)]">
            <BookOpen className="w-6 h-6 text-white" />
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

        {/* Title */}
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

        {/* ✅ Expert Courses / Active Learners / Completion Rate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl w-full px-4">
          {[
            {
              icon: (
                <BookOpen className="w-6 h-6 text-emerald-600 mb-3 mx-auto" />
              ),
              title: "6+",
              subtitle: "Expert Courses",
            },
            {
              icon: <Users className="w-6 h-6 text-emerald-600 mb-3 mx-auto" />,
              title: "2500+",
              subtitle: "Active Learners",
            },
            {
              icon: <Award className="w-6 h-6 text-emerald-600 mb-3 mx-auto" />,
              title: "95%",
              subtitle: "Completion Rate",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-[#0E1835]/70 backdrop-blur-md rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              {item.icon}
              <p className="text-3xl font-bold text-emerald-600 mb-1">
                {item.title}
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-sm font-medium">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 💡 Course Cards Section */}
      <div className="w-full flex flex-col gap-8 p-8 bg-white dark:bg-[#0B1120] rounded-2xl shadow-md border border-gray-100 dark:border-none font-sans transition-all duration-500">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading courses...
          </p>
        ) : (
          courses.map((course, i) => (
            <div
              key={i}
              className="bg-white/90 dark:bg-[#0E1835]/90 backdrop-blur-md border border-gray-100 dark:border-gray-700/40 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden"
            >
              {/* Gradient bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${course.gradient}`}
              ></div>

              {/* Card inner */}
              <div className="p-8 pl-6">
                {" "}
                {/* 👈 added slight left shift */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    {/* 🔥 Enlarged icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-4xl shadow-md`}
                    >
                      <span className="text-white">{course.icon}</span>
                    </div>

                    {/* Title + Category */}
                    <div className="ml-2">
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

                  {/* ⭐ Rating */}
                  <div className="text-yellow-500 font-medium text-lg">
                    ⭐ {course.rating}
                  </div>
                </div>
                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed mb-4 ml-24">
                  {course.description}
                </p>
                {/* Top details (level, weeks, enrolled) */}
                <div className="flex items-center gap-8 text-sm text-gray-700 dark:text-gray-300 mb-4 ml-24">
                  {course.detailsTop.map((detail, j) => (
                    <div key={j} className="flex items-center gap-2">
                      {/* slightly larger icons for detail clarity */}
                      <span className="text-lg">{detail.icon}</span>{" "}
                      {detail.text}
                    </div>
                  ))}
                </div>
                {/* Bottom points */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4 ml-24">
                  {course.detailsBottom.map((detail, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />{" "}
                      {detail}
                    </div>
                  ))}
                </div>
                {/* Syllabus link */}
                <button
                  onClick={() => handleViewSyllabus(course)}
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium text-sm transition mt-8 ml-5"
                >
                  📘 View Complete Syllabus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 💬 Recommendation Section */}
      <section className="bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 dark:from-[#0A0F2C] dark:via-[#0B1739] dark:to-[#0D102B] rounded-2xl p-12 mt-14 shadow-md text-center border border-emerald-100 dark:border-teal-700/40 transition-all duration-500">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,255,200,0.25)]">
            <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
            Not Sure Where to Start?
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-base leading-relaxed">
            Get personalized course recommendations from our AI career
            counselor. We’ll help you choose the perfect learning path based on
            your goals.
          </p>

          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-[0_8px_25px_rgba(0,255,180,0.25)] transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="w-3 h-3 bg-pink-300 rounded-full shadow-inner animate-pulse"></span>
            Get AI Recommendations
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseCards;
