import React from "react";
import { WarehouseIcon } from "lucide-react";

interface Warehouse {
  id: number;
  darkStoreName: string;
  warehouseSize: string;
  ceilingHeight: string;
  warehouseAddress: string;
  storageCapacity: string;
  loadingDock: boolean;
  powerBackup: boolean;
  temperatureControl: string;
  securityFeatures: string;
  operationalHours: string;
  accessibility: string;
  availableFacilities: string;
  insuranceCoverage: boolean;
  fireSafetyCompliance: string;
  yearOfEstablishment: string;
  certifications: string;
}

interface WarehouseCardProps {
  warehouse: Warehouse;
  toggleDetails: () => void;
  isOpen: boolean;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse, toggleDetails, isOpen }) => {
  return (
    <div className="bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out p-4 flex flex-col items-start justify-between space-y-2">
      <div className="flex justify-between w-full cursor-pointer" onClick={toggleDetails}>
        <div className="flex items-center">
          <WarehouseIcon className="h-12 w-12 mr-2" />
          <h3 className="text-xl font-semibold">{warehouse.darkStoreName}</h3>
        </div>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <div className="ml-4 mt-2 space-y-1">
          <p><strong>Size:</strong> {warehouse.warehouseSize} sq.ft</p>
          <p><strong>Ceiling Height:</strong> {warehouse.ceilingHeight} ft</p>
          <p><strong>Address:</strong> {warehouse.warehouseAddress}</p>
          <p><strong>Storage Capacity:</strong> {warehouse.storageCapacity}</p>
          <p><strong>Loading Dock:</strong> {warehouse.loadingDock ? "Yes" : "No"}</p>
          <p><strong>Power Backup:</strong> {warehouse.powerBackup ? "Yes" : "No"}</p>
          <p><strong>Temperature Control:</strong> {warehouse.temperatureControl}</p>
          <p><strong>Security Features:</strong> {warehouse.securityFeatures}</p>
          <p><strong>Operational Hours:</strong> {warehouse.operationalHours}</p>
          <p><strong>Accessibility:</strong> {warehouse.accessibility}</p>
          <p><strong>Available Facilities:</strong> {warehouse.availableFacilities}</p>
          <p><strong>Insurance Coverage:</strong> {warehouse.insuranceCoverage ? "Yes" : "No"}</p>
          <p><strong>Fire Safety Compliance:</strong> {warehouse.fireSafetyCompliance}</p>
          <p><strong>Year of Establishment:</strong> {warehouse.yearOfEstablishment}</p>
          <p><strong>Certifications:</strong> {warehouse.certifications}</p>
        </div>
      )}
    </div>
  );
};

export default WarehouseCard;