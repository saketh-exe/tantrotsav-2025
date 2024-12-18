import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function GetRegistrations() {
  const [events, setEvents] = useState([]);
  const [departments, setDepartments] = useState([
    { value: 'CSE', label: 'CSE' },
    { value: 'ECE', label: 'ECE' },
    { value: 'EEE', label: 'EEE' },
    { value: 'MECH', label: 'MECH' },
    { value: 'CIVIL', label: 'CIVIL' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // Fetch events and departments when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`
        );
        // const departmentsResponse = await axios.get(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/events/departments`
        // );

        const eventOptions = eventsResponse.data.map((event) => ({
          value: event._id,
          label: event.title,
        }));
        // const departmentOptions = departmentsResponse.data.map(
        //   (department) => ({
        //     value: department._id,
        //     label: department.name,
        //   })
        // );

        setEvents(eventOptions);
        // setDepartments(departmentOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission to fetch registrations
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setFetchError(false);
    setRegistrations([]);

    try {
      let response;
      if (selectedEvent) {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/${
            selectedEvent.value
          }/registrations`
        );
      } else if (selectedDepartment) {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/departments/${
            selectedDepartment.value
          }/registrations`
        );
      }

      if (response) {
        setRegistrations(response.data.registeredUsers || []);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle downloading the registrations as Excel
  const handleDownloadExcel = async () => {
    try {
      let response;
      if (selectedEvent) {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/${
            selectedEvent.value
          }/registrations/excel`,
          { responseType: 'blob' }
        );
      } else if (selectedDepartment) {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/departments/${
            selectedDepartment.value
          }/registrations/excel`,
          { responseType: 'blob' }
        );
      }

      if (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          selectedEvent
            ? 'event-registrations.xlsx'
            : 'department-registrations.xlsx'
        );
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">Get Registrations</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="event"
            className="block text-sm font-semibold text-gray-700"
          >
            Select Event (Optional)
          </label>
          <Select
            id="event"
            options={events}
            onChange={(value) => {
              setSelectedEvent(value);
              setSelectedDepartment(null); // Reset department selection
            }}
            value={selectedEvent}
            placeholder="Select an event"
            className="mt-2"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-semibold text-gray-700"
          >
            Select Department (Optional)
          </label>
          <Select
            id="department"
            options={departments}
            onChange={(value) => {
              setSelectedDepartment(value);
              setSelectedEvent(null); // Reset event selection
            }}
            value={selectedDepartment}
            placeholder="Select a department"
            className="mt-2"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Registrations
          </button>
        </div>
      </form>

      {loading && <div className="text-center mt-4">Loading...</div>}

      {fetchError && !loading && (
        <div className="text-center text-red-500 mt-4">
          Error fetching registrations
        </div>
      )}

      {registrations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Registration Details:</h3>
          <div>
            <button
              onClick={handleDownloadExcel}
              className="py-3 px-6 bg-green-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download as Excel
            </button>
          </div>
        </div>
      )}

      {!registrations.length && !loading && !fetchError && (
        <div className="text-center mt-4">
          No registrations found for the selected option
        </div>
      )}
    </div>
  );
}

export default GetRegistrations;
