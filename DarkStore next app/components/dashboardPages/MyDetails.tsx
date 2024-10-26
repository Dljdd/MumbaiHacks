import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ref, set, get } from "firebase/database";
import { database } from "@/firebase"; // Make sure this import is correct

const MyDetailsComponent = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pan: "",
    email: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch existing user details when component mounts
    const userRef = ref(database, 'myDetails');
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUserDetails(snapshot.val());
      }
    }).catch((error) => {
      console.error("Error fetching user details:", error);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userRef = ref(database, 'myDetails');
    set(userRef, userDetails)
      .then(() => {
        console.log("User Details Saved Successfully");
        localStorage.setItem("userEmail", userDetails.email);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch((error) => {
        console.error("Error saving user details:", error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">My Details</h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your phone number"
            pattern="[0-9]*"
            inputMode="numeric"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="pan">
            PAN Card Number
          </label>
          <input
            type="text"
            id="pan"
            name="pan"
            value={userDetails.pan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your PAN Card Number"
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="w-1/3 text-sm transition-colors duration-300 ease-in-out"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-green-600 font-semibold">Data saved successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDetailsComponent;
