import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const MyDetailsComponent = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pan: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Details Submitted:", userDetails);
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
    </div>
  );
};

export default MyDetailsComponent;