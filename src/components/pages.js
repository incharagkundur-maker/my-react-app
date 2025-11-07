import React from "react";
import CourseCards from "./CourseCards";

// ✅ Default export for home page
const SmaranAIWebsite = () => {
  return (
    <div className="pt-24">
      <CourseCards />
    </div>
  );
};

// ✅ Named exports for other pages
export const About = () => (
  <div className="pt-24 text-center text-gray-700 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-4">About Us</h1>
    <p>Learn more about SmaranAI and our vision to innovate learning.</p>
  </div>
);

export const Research = () => (
  <div className="pt-24 text-center text-gray-700 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-4">Research</h1>
    <p>Explore cutting-edge AI and ML research projects.</p>
  </div>
);

export const AcademicProjects = () => (
  <div className="pt-24 text-center text-gray-700 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-4">Academic Projects</h1>
    <p>Browse our student-driven academic projects in technology.</p>
  </div>
);

export const Internship = () => (
  <div className="pt-24 text-center text-gray-700 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-4">Internship</h1>
    <p>Join our internship programs and gain real-world AI experience.</p>
  </div>
);

export const Contact = () => (
  <div className="pt-24 text-center text-gray-700 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
    <p>Reach out via email or visit us at SmaranAI.</p>
  </div>
);

export default SmaranAIWebsite;
