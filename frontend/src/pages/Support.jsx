import React, { useState } from "react";

const SupportPage = ({ User }) => {
  const [form, setForm] = useState({
    category: "Payment Related",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <>
      <div className="text-center m-5">
        <h2 className="text-2xl font-bold text-white">Support</h2>
      </div>

      <div className="flex items-start justify-center bg-transparent py-6 px-4 sm:px-6 lg:px-8">
        <div
          className="shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-5/6"
          style={{
            background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
            backdropFilter: "blur(10px)", // Apply blur
            WebkitBackdropFilter: "blur(10px)", // Safari compatibility
            border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
          }}
        >
          <h1 className="text-2xl font-bold text-center mb-1 text-white">Got a Problem?</h1>
          <p className="text-center text-sm mb-4 text-gray-100 font-light">
            Please fill the below form.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Name Field (Non-editable) */}
            <div className="flex gap-8 flex-col md:flex-row">
              <div className="w-full md:w-2/3">
                <div className="mb-4">
                  <label
                    className="block text-gray-100 text-lg font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={User.name}
                    readOnly
                    className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 bg-gray-200 cursor-not-allowed"
                  />
                </div>
                {/* Email Field (Non-editable) */}
                <div className="mb-4">
                  <label
                    className="block text-gray-100 text-lg font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={User.email}
                    readOnly
                    className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 bg-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label
                    className="block text-gray-100 text-lg font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="shadow border rounded w-3/4 py-2 px-3 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
                    >
                      <option value="Payment Related">Payment Related</option>
                      <option value="Event Related">Event Related</option>
                      <option value="Website Related">Website Related</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-3/4 mb-6">
                {/* Message Box */}
                <label
                  className="block text-gray-100 text-lg font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  value={form.message}
                  onChange={handleChange}
                  className="h-full resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="self-end flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
