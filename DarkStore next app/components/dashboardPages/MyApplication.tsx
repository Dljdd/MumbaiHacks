import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/firebase";

const MyApplicationsComponent = () => {
  const [applications, setApplications] = useState([
    { name: "Swiggy", status: "Apply" },
    { name: "Blinkit", status: "Apply" },
    { name: "Zepto", status: "Apply" },
    { name: "BigBasket", status: "Apply" },
  ]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);

    if (email) {
      fetchApplicationStatus(email);
    }
  }, []);

  const fetchApplicationStatus = async (email: string) => {
    const userRef = ref(database, `users/${email.replace(".", ",")}/applications`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userApplications = snapshot.val();
      setApplications(applications.map(app => ({
        ...app,
        status: userApplications[app.name] || "Apply"
      })));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">My Applications</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {applications.map((app, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{app.name}</span>
            <span className={`text-sm px-3 py-1 rounded-full ${
              app.status === "Apply"
                ? "bg-gray-200 text-gray-800"
                : app.status === "In Review"
                ? "bg-yellow-300 text-black"
                : app.status === "Approved"
                ? "bg-green-500 text-white"
                : app.status === "Rejected"
                ? "bg-red-500 text-white"
                : ""
            }`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsComponent;