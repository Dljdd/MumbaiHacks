import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { WarehouseIcon } from "lucide-react"; // Ensure you have lucide-react installed

interface Warehouse {
  id: number; // ID for each warehouse
  darkStoreName: string;
  warehouseSize: string;
  ceilingHeight: string;
  warehouseAddress: string;
  storageCapacity: string; // New field
  loadingDock: boolean; // New field
  powerBackup: boolean; // New field
  temperatureControl: string; // New field
  securityFeatures: string; // New field
  operationalHours: string; // New field
  accessibility: string; // New field
  availableFacilities: string; // New field
  insuranceCoverage: boolean; // New field
  fireSafetyCompliance: string; // New field
  yearOfEstablishment: string; // New field
  certifications: string; // New field
}

const MyWarehousesComponent = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [warehouseDetails, setWarehouseDetails] = useState<Warehouse>({
    id: 0,
    darkStoreName: "",
    warehouseSize: "",
    ceilingHeight: "",
    warehouseAddress: "",
    storageCapacity: "",
    loadingDock: false,
    powerBackup: false,
    temperatureControl: "",
    securityFeatures: "",
    operationalHours: "",
    accessibility: "",
    availableFacilities: "",
    insuranceCoverage: false,
    fireSafetyCompliance: "",
    yearOfEstablishment: "",
    certifications: "",
  });
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [openWarehouseId, setOpenWarehouseId] = useState<number | null>(null); // Track which warehouse is open

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target; // Get name and type directly
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value; // Get value based on type
  
    setWarehouseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, // Use the correctly determined value
    }));
  };

  const handleWarehouseSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newWarehouse = {
      ...warehouseDetails,
      id: warehouses.length + 1, // Generate a unique id
    };

    setWarehouses([...warehouses, newWarehouse]);
    setWarehouseDetails({
      id: 0,
      darkStoreName: "",
      warehouseSize: "",
      ceilingHeight: "",
      warehouseAddress: "",
      storageCapacity: "",
      loadingDock: false,
      powerBackup: false,
      temperatureControl: "",
      securityFeatures: "",
      operationalHours: "",
      accessibility: "",
      availableFacilities: "",
      insuranceCoverage: false,
      fireSafetyCompliance: "",
      yearOfEstablishment: "",
      certifications: "",
    }); // Reset form
    setShowForm(false); // Hide the form after submission
  };

  const toggleWarehouseDetails = (id: number) => {
    setOpenWarehouseId((prevId) => (prevId === id ? null : id)); // Toggle warehouse details
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">My Warehouses</h2>
      
      {/* Display warehouse cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out p-4 flex items-center justify-between" onClick={() => toggleWarehouseDetails(warehouse.id)}>
            <div className="flex items-center">
              <WarehouseIcon className="h-12 w-12 mr-2" />
              <h3 className="text-xl font-semibold">{`Warehouse ${warehouse.id}`}</h3>
            </div>
            <span>{openWarehouseId === warehouse.id ? '-' : '+'}</span> {/* Show caret */}
          </div>
        ))}
        
        <Button
          variant="outline"
          className="h-40 text-xl font-semibold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out flex items-center justify-center"
          onClick={() => setShowForm((prev) => !prev)} // Toggle the form visibility
        >
          <span className="mr-2">Add More</span>
          <span>+</span>
        </Button>
      </div>

      {/* Show form if showForm is true */}
      {showForm && (
        <form className="mt-4 space-y-4" onSubmit={handleWarehouseSubmit}>
          <div>
            <label className="block text-sm font-medium" htmlFor="darkStoreName">
              Dark Store Name
            </label>
            <input
              type="text"
              id="darkStoreName"
              name="darkStoreName"
              value={warehouseDetails.darkStoreName}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Dark Store Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="warehouseSize">
              Warehouse Size (sq.ft)
            </label>
            <input
              type="number"
              id="warehouseSize"
              name="warehouseSize"
              value={warehouseDetails.warehouseSize}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Warehouse Size"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="ceilingHeight">
              Ceiling Height
            </label>
            <input
              type="number"
              id="ceilingHeight"
              name="ceilingHeight"
              value={warehouseDetails.ceilingHeight}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Ceiling Height"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="warehouseAddress">
              Warehouse Address
            </label>
            <input
              type="text"
              id="warehouseAddress"
              name="warehouseAddress"
              value={warehouseDetails.warehouseAddress}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Warehouse Address"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="storageCapacity">
              Storage Capacity (pallets/shelves)
            </label>
            <input
              type="number"
              id="storageCapacity"
              name="storageCapacity"
              value={warehouseDetails.storageCapacity}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Storage Capacity"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="loadingDock"
                checked={warehouseDetails.loadingDock}
                onChange={handleWarehouseChange}
                className="mr-2"
              />
              Loading Dock Availability (Yes/No)
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="powerBackup"
                checked={warehouseDetails.powerBackup}
                onChange={handleWarehouseChange}
                className="mr-2"
              />
              Power Backup (Yes/No)
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="temperatureControl">
              Temperature Control (e.g., ambient, refrigerated, frozen)
            </label>
            <input
              type="text"
              id="temperatureControl"
              name="temperatureControl"
              value={warehouseDetails.temperatureControl}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Temperature Control"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="securityFeatures">
              Security Features (e.g., CCTV, 24/7 security)
            </label>
            <input
              type="text"
              id="securityFeatures"
              name="securityFeatures"
              value={warehouseDetails.securityFeatures}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Security Features"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="operationalHours">
              Operational Hours
            </label>
            <input
              type="text"
              id="operationalHours"
              name="operationalHours"
              value={warehouseDetails.operationalHours}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Operational Hours"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="accessibility">
              Accessibility (e.g., parking, ramp access)
            </label>
            <input
              type="text"
              id="accessibility"
              name="accessibility"
              value={warehouseDetails.accessibility}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Accessibility"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="availableFacilities">
              Available Facilities (e.g., restrooms, break rooms)
            </label>
            <input
              type="text"
              id="availableFacilities"
              name="availableFacilities"
              value={warehouseDetails.availableFacilities}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Available Facilities"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="insuranceCoverage"
                checked={warehouseDetails.insuranceCoverage}
                onChange={handleWarehouseChange}
                className="mr-2"
              />
              Insurance Coverage (Yes/No)
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="fireSafetyCompliance">
              Fire Safety Compliance (Yes/No, details if applicable)
            </label>
            <input
              type="text"
              id="fireSafetyCompliance"
              name="fireSafetyCompliance"
              value={warehouseDetails.fireSafetyCompliance}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Fire Safety Compliance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="yearOfEstablishment">
              Year of Establishment
            </label>
            <input
              type="text"
              id="yearOfEstablishment"
              name="yearOfEstablishment"
              value={warehouseDetails.yearOfEstablishment}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Year of Establishment"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="certifications">
              Certifications (e.g., FSSAI, ISO, etc., if applicable)
            </label>
            <input
              type="text"
              id="certifications"
              name="certifications"
              value={warehouseDetails.certifications}
              onChange={handleWarehouseChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Certifications"
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="w-1/3 text-sm" type="submit">
              Add Warehouse
            </Button>
          </div>
        </form>
      )}

      {/* Show added warehouses only if they exist */}
      {warehouses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Added Warehouses</h3>
          <ul className="space-y-2">
            {warehouses.map((warehouse) => (
              <li key={warehouse.id} className="border-b py-2">
                <div className="flex justify-between items-center" onClick={() => toggleWarehouseDetails(warehouse.id)}>
                  <span className="font-semibold">{warehouse.darkStoreName}</span>
                  <span>{openWarehouseId === warehouse.id ? '-' : '+'}</span>
                </div>
                {openWarehouseId === warehouse.id && (
                  <div className="ml-4 mt-1">
                    <p>{`Size: ${warehouse.warehouseSize} sq.ft`}</p>
                    <p>{`Ceiling Height: ${warehouse.ceilingHeight} ft`}</p>
                    <p>{`Address: ${warehouse.warehouseAddress}`}</p>
                    <p>{`Storage Capacity: ${warehouse.storageCapacity}`}</p>
                    <p>{`Loading Dock: ${warehouse.loadingDock ? 'Yes' : 'No'}`}</p>
                    <p>{`Power Backup: ${warehouse.powerBackup ? 'Yes' : 'No'}`}</p>
                    <p>{`Temperature Control: ${warehouse.temperatureControl}`}</p>
                    <p>{`Security Features: ${warehouse.securityFeatures}`}</p>
                    <p>{`Operational Hours: ${warehouse.operationalHours}`}</p>
                    <p>{`Accessibility: ${warehouse.accessibility}`}</p>
                    <p>{`Available Facilities: ${warehouse.availableFacilities}`}</p>
                    <p>{`Insurance Coverage: ${warehouse.insuranceCoverage ? 'Yes' : 'No'}`}</p>
                    <p>{`Fire Safety Compliance: ${warehouse.fireSafetyCompliance}`}</p>
                    <p>{`Year of Establishment: ${warehouse.yearOfEstablishment}`}</p>
                    <p>{`Certifications: ${warehouse.certifications}`}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyWarehousesComponent;
