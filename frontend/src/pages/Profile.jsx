import { useEffect, useState } from "react";
import EventRegistered from "../components/EventRegistered";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { pdf } from "@react-pdf/renderer"; // Import pdf function from react-pdf
import { GoDownload } from "react-icons/go";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2D3748",
    letterSpacing: 2,
  },
  logo: {
    width: "50%",
    height: "auto",
    marginBottom: 20,
    alignSelf: "center",
  },
  content: {
    fontSize: 12,
    color: "#4A5568",
    lineHeight: 1,
    marginBottom: 10,
  },
  row: {
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: "bold",
    color: "#2D3748",
    fontSize: 14,
    width: "30%",
  },
  columnData: {
    fontSize: 12,
    color: "#4A5568",
    paddingLeft: 10,
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 10,
    color: "#A0AEC0",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 15,
    marginBottom: 15,
    textTransform: "uppercase",
  },
  borderBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 35,
    backgroundColor: "#F7FAFC",
  },
  totalRow: {
    marginTop: 25,
    borderTopWidth: 2,
    borderTopColor: "#2D3748",
    paddingTop: 15,
    textAlign: "right",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2D3748",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 12,
    justifyContent: "space-between", // Ensure the columns are spaced correctly
  },
  tableColumn: {
    fontSize: 12,
    color: "#4A5568",
    paddingLeft: 10,
    textAlign: "left",
    width: "48%", // Set width to ensure alignment (use percentage or fixed pixel value)
  },
  tableHeader: {
    fontWeight: "bold",
    color: "#2D3748",
    fontSize: 14,
    textAlign: "left",
    paddingRight: 10,
    width: "48%", // Ensure headers have the same width
  },
  pageBreak: {
    marginTop: 35,
  },
});

function Profile() {
  const { user } = useAuthStore();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  // console.log(user);

  useEffect(() => {
    document.title = "Profile | Tantrotsav - Amrita Vishwa Vidyapeetham";
  }, []);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (user.registeredEvents.length === 0) return;
      const events = await Promise.all(
        user.registeredEvents.map(async (eventId) => {
          const data = await axios.get(
            `/api/events/${eventId}`
          );
          return data.data;
        })
      );
      setRegisteredEvents(events);
    };
    fetchRegisteredEvents();
  }, [user.registeredEvents]);

  // Function to generate the invoice PDF using react-pdf
  const downloadInvoice = async () => {
    const Invoice = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <Image
            style={styles.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Amrita-vishwa-vidyapeetham-logo.svg/640px-Amrita-vishwa-vidyapeetham-logo.svg.png"
          />

          <Text style={styles.header}>Invoice</Text>
          <View style={styles.row}>
            <Text style={styles.content}>Name: {user.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.content}>Email: {user.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.content}>Phone Number: {user.phoneNumber}</Text>
          </View>

          {user.orders.length > 0 ? (
            user.orders
              .filter((order) => order.paymentStatus === "Success") // Only include successful payments
              .map((order) => (
                <View key={order._id} style={styles.borderBox}>
                  <Text style={styles.sectionTitle}>
                    Order ID: {order.orderId}
                  </Text>
                  <Text style={styles.content}>
                    Payment Status: {order.paymentStatus}
                  </Text>
                  <Text style={styles.content}>
                    Payment Mode: {order.paymentDetails.paymentMode}
                  </Text>
                  <Text style={styles.content}>
                    Transaction ID: {order.paymentDetails.transactionId}
                  </Text>
                  <Text style={styles.content}>
                    Amount: INR {order.paymentDetails.amount}
                  </Text>
                  <Text style={styles.content}>
                    Date: {new Date(order.paymentDetails.date).toLocaleString()}
                  </Text>

                  <View style={styles.sectionTitle}>Events in this Order:</View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Event</Text>
                    <Text style={styles.tableHeader}>Amount</Text>
                  </View>
                  {order.events.map((eventId) => {
                    const event = registeredEvents.find(
                      (event) => event._id === eventId
                    );
                    return event ? (
                      <View key={event._id} style={styles.tableRow}>
                        <Text style={styles.tableColumn}>{event.title}</Text>
                        <Text style={styles.tableColumn}>
                          INR {event.registrationFee}
                        </Text>
                      </View>
                    ) : null;
                  })}
                </View>
              ))
          ) : (
            <Text style={styles.content}>No successful orders found</Text>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Total: INR{" "}
              {user.orders
                .filter((order) => order.paymentStatus === "Success") // Only include successful payments
                .reduce(
                  (total, order) =>
                    total +
                    order.events.reduce((sum, eventId) => {
                      const event = registeredEvents.find(
                        (event) => event._id === eventId
                      );
                      return event ? sum + event.registrationFee : sum;
                    }, 0),
                  0
                )}
            </Text>
          </View>

          <Text style={styles.footer}>Thank you for your participation!</Text>
        </Page>
      </Document>
    );

    // Generate the PDF and trigger download
    const blob = await pdf(<Invoice />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className=" w-full  flex-col items-center justify-center pt-28 p-4 min-h-screen h-fit bg-gradient-to-br from-black to-blue-950">
      <div className="flex w-full justify-center align-middle flex-wrap">
        <div className="flex rounded-md mr-4">
          <img
            src={user.profileImage}
            alt="profile image"
            className="rounded-xl w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transition-transform transform hover:scale-110 hover:rotate-12 duration-300 border-2 border-white"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col gap-4 flex-wrap justify-center align-middle">
          <div className="flex gap-4 flex-wrap justify-center align-middle">
            <div className="flex flex-col w-[250px] gap-1 ">
              <p className="text-sm font-medium text-slate-200">Name</p>
              <h1 className="font-bold border-2 rounded-lg border-white p-2 text-gray-200 truncate">
                {user.name}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-200">Email</p>
              <h1 className="font-bold border-2 rounded-lg border-white p-2 text-gray-200 truncate">
                {user.email}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-200">Phone Number</p>
              <h1 className="font-bold border-2 rounded-lg border-white p-2 text-gray-200 truncate">
                {user.phoneNumber}
              </h1>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap justify-center align-middle">
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-200">College</p>
              <h1 className="font-bold border-2 rounded-lg border-white p-2 text-gray-200 truncate">
                {user.collegeName}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-200">
                College Roll Number
              </p>
              <h1 className="font-bold border-2 rounded-lg border-white p-2 text-gray-200 truncate">
                {user.collegeRollNumber}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-200">City</p>
              <h1 className="font-bold border-2 rounded-lg border-white p-2 text-gray-200 truncate">
                {user.city}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 gap-4 w-full justify-center align-middle ">
        <div className="flex justify-evenly items-center">
          <h1 className="text-2xl font-bold text-gray-100">
            Registered Events
          </h1>
          <button
            onClick={downloadInvoice}
            className="px-3 py-2 flex items-center gap-2 rounded-md border border-gray-400 hover:bg-green-100 bg-slate-300"
          >
            Download Invoice <GoDownload />
          </button>
        </div>
        {registeredEvents.length === 0 ? (
          <p className="text-center text-gray-400">No events registered yet, Hurry up!!</p>
        ) : (
          <div className="flex flex-wrap gap-4 w-full justify-center items-center md:justify-start mt-10">
            {registeredEvents.map((event) => (
              
              <EventRegistered key={event._id} event={event} />
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
