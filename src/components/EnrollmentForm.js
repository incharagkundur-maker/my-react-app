import React from "react";

const EnrollmentForm = () => {
  return (
    <section className="bg-gradient-to-b from-white to-green-50 rounded-2xl shadow-lg p-10 mt-10 border border-gray-100">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-2">
        Student Information
      </h2>
      <p className="text-gray-500 mb-8">
        Please provide accurate information. All fields marked with * are required.
      </p>

      <form className="space-y-10">
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-medium text-emerald-600 mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name *" className="input-style" />
            <input type="email" placeholder="Email Address *" className="input-style" />
            <input type="text" placeholder="Phone Number *" className="input-style" />
            <input type="text" placeholder="City *" className="input-style" />
            <input type="text" placeholder="State *" className="input-style" />
          </div>
        </div>

        {/* Academic Background */}
        <div>
          <h3 className="text-lg font-medium text-emerald-600 mb-4">Academic Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="College/University Name *" className="input-style" />
            <input type="text" placeholder="Degree Program *" className="input-style" />
            <input type="text" placeholder="Year of Study *" className="input-style" />
            <input type="text" placeholder="Major/Specialization *" className="input-style" />
          </div>
        </div>

        {/* Course Details */}
        <div>
          <h3 className="text-lg font-medium text-emerald-600 mb-4">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Preferred Start Date *" className="input-style" />
            <input type="text" placeholder="Current Experience Level *" className="input-style" />
            <textarea
              placeholder="What are your learning goals? *"
              rows="3"
              className="input-style md:col-span-2"
            ></textarea>
            <input type="text" placeholder="How did you hear about us?" className="input-style" />
          </div>
        </div>

        {/* Terms */}
        <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-gray-600 text-sm">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all"
        >
          Complete Enrollment
        </button>

        <p className="text-center text-gray-500 text-sm mt-3">
          Need help? Contact us at{" "}
          <a href="mailto:admin@smaranai.in" className="text-emerald-600 font-medium hover:underline">
            admin@smaranai.in
          </a>
        </p>
      </form>
    </section>
  );
};

export default EnrollmentForm;
