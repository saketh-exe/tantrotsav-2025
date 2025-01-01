import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    documents: "",
    clubName: "",
    thumbnail: "",
    registrationFee: 0,
    teamSize: 1,
    prize1st: 0,
    prize2nd: 0,
    contact1: "",
    contact1num: "",
    contact2: "",
    contact2num: "",
    type: "",
  });

  const clubNames = [
    "Shows",
    "IEEE STUDENT BRANCH",
    "SAE CLUB",
    "Robotics Club",
    "CAMHI Club",
    "AMC FOSS",
    "FACT Club",
    "E-Cell",
    "TRINETRA",
    "AURORA",
    "AWS Cloud Club",
    "MAC2H-1",
    "Neuronix Club",
    "Cognizance",
    "Literary and Fine Arts Club",
    "AMIGOS Gaming Club",
  ];

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact1" && !value) {
      setFormData((prevData) => ({
        ...prevData,
        contact1: value,
        contact1num: "",
      }));
      return;
    }

    if (name === "contact2" && !value) {
      setFormData((prevData) => ({
        ...prevData,
        contact2: value,
        contact2num: "",
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contact1 && !formData.contact1num) {
      alert("Please enter contact number for contact person 1");
      return;
    }

    if (formData.contact2 && !formData.contact2num) {
      alert("Please enter contact number for contact person 2");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/add`,
        formData
      );
      console.log("Event Created:", response.data);
      alert("Event created successfully!");
      // Optionally, reset the form or redirect after success
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        documents: "",
        clubName: "",
        thumbnail: "",
        registrationFee: 0,
        teamSize: 1,
        prize1st: 0,
        prize2nd: 0,
        contact1: "",
        contact1num: "",
        contact2: "",
        contact2num: "",
        type: "",
      });
      // Redirect to home page after event creation
      navigate("/"); // Adjust the route to your home page
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Redirect to home page when cancel button is clicked
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-semibold text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="documents"
            className="block text-sm font-semibold text-gray-700"
          >
            Documents (optional)
          </label>
          <input
            type="text"
            id="documents"
            name="documents"
            value={formData.documents}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="clubName"
            className="block text-sm font-semibold text-gray-700"
          >
            Club Name
          </label>
          <select
            id="clubName"
            name="clubName"
            value={formData.clubName}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Club</option>
            {clubNames.map((club, index) => (
              <option key={index} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-700"
          >
            Event Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-semibold text-gray-700"
          >
            Thumbnail URL (optional)
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="registrationFee"
            className="block text-sm font-semibold text-gray-700"
          >
            Registration Fee
          </label>
          <input
            type="number"
            id="registrationFee"
            name="registrationFee"
            value={formData.registrationFee}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="teamSize"
            className="block text-sm font-semibold text-gray-700"
          >
            Team Size
          </label>
          <input
            type="number"
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="prize1st"
            className="block text-sm font-semibold text-gray-700"
          >
            1st Place Prize Money
          </label>
          <input
            type="number"
            id="prize1st"
            name="prize1st"
            value={formData.prize1st}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="prize2nd"
            className="block text-sm font-semibold text-gray-700"
          >
            2nd Place Prize Money
          </label>
          <input
            type="number"
            id="prize2nd"
            name="prize2nd"
            value={formData.prize2nd}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="contact1"
            className="block text-sm font-semibold text-gray-700"
          >
            Contact Person 1
          </label>
          <input
            type="text"
            id="contact1"
            name="contact1"
            value={formData.contact1}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {formData.contact1 && (
          <>
            <div>
              <label
                htmlFor="contact1num"
                className="block text-sm font-semibold text-gray-700"
              >
                Contact Number 1 (Please include country code without '+')
              </label>
              <input
                type="text"
                id="contact1num"
                name="contact1num"
                value={formData.contact1num}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="contact2"
                className="block text-sm font-semibold text-gray-700"
              >
                Contact Person 2 (Please include country code without '+')
              </label>
              <input
                type="text"
                id="contact2"
                name="contact2"
                value={formData.contact2}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {formData.contact2 && (
              <div>
                <label
                  htmlFor="contact2num"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Contact Number 2
                </label>
                <input
                  type="text"
                  id="contact2num"
                  name="contact2num"
                  value={formData.contact2num}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </>
        )}

        <div className="flex justify-between">
          <button
            type="submit"
            className="mt-4 py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Event
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-4 py-3 px-6 bg-gray-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
