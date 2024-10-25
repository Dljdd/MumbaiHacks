import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const MyApplicationsComponent = () => {
  const [applications, setApplications] = useState([
    { name: "Swiggy", status: "Apply" },
    { name: "Blinkit", status: "Apply" },
    { name: "Zepto", status: "Apply" },
    { name: "BigBasket", status: "Apply" },
  ]);

  const handleButtonClick = (index: number) => {
    const newApplications = [...applications];
    if (newApplications[index].status === "Apply") {
      newApplications[index].status = "In Review";
    } else if (newApplications[index].status === "In Review") {
      newApplications[index].status = "Approved";
    } else if (newApplications[index].status === "Approved") {
      newApplications[index].status = "Rejected";
    } else {
      newApplications[index].status = "Apply";
    }
    setApplications(newApplications);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">My Applications</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {applications.map((app, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{app.name}</span>
            <Button
              variant="outline"
              onClick={() => handleButtonClick(index)}
              className={`text-sm transition-colors duration-300 ease-in-out ${
                app.status === "Apply"
                  ? "hover:bg-white hover:text-black"
                  : app.status === "In Review"
                  ? "bg-yellow-300 text-black hover:bg-yellow-400"
                  : app.status === "Approved"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : app.status === "Rejected"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : ""
              }`}
            >
              {app.status}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsComponent;