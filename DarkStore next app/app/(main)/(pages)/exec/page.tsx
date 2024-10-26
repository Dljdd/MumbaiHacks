'use client';
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/firebase'; // Make sure this path is correct

type WarehouseData = {
  id: string;
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
  isActive: boolean;
};

const Settings = () => {
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);
  const [expandedWarehouseId, setExpandedWarehouseId] = useState<string | null>(null); // To track which warehouse is expanded

  // Fetch warehouse data from Firebase
  useEffect(() => {
    const warehousesRef = ref(database, 'warehouses');
    onValue(warehousesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const warehouseList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as WarehouseData),
        }));
        setWarehouses(warehouseList);
      }
    });
  }, []);

  // Toggle expand/collapse on card click
  const toggleExpand = (id: string) => {
    setExpandedWarehouseId(expandedWarehouseId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Warehouses</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warehouses
          .filter((warehouse) => warehouse.darkStoreName) // Filter out warehouses without a darkStoreName
          .map((warehouse) => (
            <div
              key={warehouse.id}
              className="bg-card shadow-md p-4 rounded-lg cursor-pointer"
              onClick={() => toggleExpand(warehouse.id)}
            >
              {/* Display Warehouse Title */}
              <h2 className="text-xl font-bold">{warehouse.darkStoreName}</h2>

              {/* Conditionally Render Full Details if Expanded */}
              {expandedWarehouseId === warehouse.id && (
                <div className="mt-4">
                  <p><strong>Warehouse Size:</strong> {warehouse.warehouseSize} sq. ft.</p>
                  <p><strong>Ceiling Height:</strong> {warehouse.ceilingHeight}</p>
                  <p><strong>Warehouse Address:</strong> {warehouse.warehouseAddress}</p>
                  <p><strong>Storage Capacity:</strong> {warehouse.storageCapacity}</p>
                  <p><strong>Loading Dock Availability:</strong> {warehouse.loadingDock ? 'Yes' : 'No'}</p>
                  <p><strong>Power Backup:</strong> {warehouse.powerBackup ? 'Yes' : 'No'}</p>
                  <p><strong>Temperature Control:</strong> {warehouse.temperatureControl}</p>
                  <p><strong>Security Features:</strong> {warehouse.securityFeatures}</p>
                  <p><strong>Operational Hours:</strong> {warehouse.operationalHours}</p>
                  <p><strong>Accessibility:</strong> {warehouse.accessibility}</p>
                  <p><strong>Available Facilities:</strong> {warehouse.availableFacilities}</p>
                  <p><strong>Insurance Coverage:</strong> {warehouse.insuranceCoverage ? 'Yes' : 'No'}</p>
                  <p><strong>Fire Safety Compliance:</strong> {warehouse.fireSafetyCompliance}</p>
                  <p><strong>Year of Establishment:</strong> {warehouse.yearOfEstablishment}</p>
                  <p><strong>Certifications:</strong> {warehouse.certifications}</p>
                  <p><strong>Approval Status:</strong> {warehouse.isActive ? 'Approved' : 'Pending'}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Settings;