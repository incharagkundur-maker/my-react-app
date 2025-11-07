import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home"; // ✅ new homepage
import CourseCards from "./components/CourseCards"; // ✅ Services page
import SyllabusMachineLearning from "./components/SyllabusMachineLearning";
import EnrollmentForm from "./components/EnrollmentForm";
import {
  About,
  Research,
  AcademicProjects,
  Internship,
  Contact,
} from "./components/pages"; // ✅ other pages

import "./App.css";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* ✅ Use your new Home.js here */}
        <Route path="/" element={<Home />} />

        {/* ✅ Services Page → your courses */}
        <Route path="/services" element={<CourseCards />} />

        {/* ✅ Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/academic-projects" element={<AcademicProjects />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Syllabus & Enrollment */}
        <Route path="/syllabus" element={<SyllabusMachineLearning />} />
        <Route path="/enroll" element={<EnrollmentForm />} />

        {/* ✅ 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center mt-40 text-gray-600 text-xl">
              404 – Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
