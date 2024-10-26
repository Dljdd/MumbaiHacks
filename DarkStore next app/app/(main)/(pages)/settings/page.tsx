/* eslint-disable prefer-const */
'use client'
import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
import data from '@/data.json'; // Import the warehouse data
=======
import { ref, onValue } from 'firebase/database';
import { database } from '@/firebase';
>>>>>>> Stashed changes

type WarehouseData = {
  owner: string;
  warehouseSize: string;
  pincode: string;
  areaName: string;
  zoneScore: number;
  status: string;
};

const Settings = () => {
  const [filterBy, setFilterBy] = useState<string>(''); // State for filter
  const [sortBy, setSortBy] = useState<string>(''); // State for sort
<<<<<<< Updated upstream
  const [filteredData, setFilteredData] = useState<WarehouseData[]>(data); // Filtered and sorted data state

  // Helper function for converting warehouse size to a number for sorting
  const parseWarehouseSize = (size: string): number => {
    return parseInt(size.replace(/[^\d]/g, '')); // Remove any non-digit characters and convert to number
  };
=======
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState<WarehouseData[]>([]); // Separate state for filtered warehouses

  // Fetch warehouse data from Firebase
  useEffect(() => {
    const warehousesRef = ref(database, 'warehouses');
    const unsubscribe = onValue(warehousesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const warehouseList = Object.entries(data).map(([key, value]) => {
          const warehouseData = value as WarehouseData;
          return { id: key, ...warehouseData };
        });
        setWarehouses(warehouseList);
      }
    });

    return () => unsubscribe();
  }, []);
>>>>>>> Stashed changes

  // Effect to handle filtering and sorting
  useEffect(() => {
<<<<<<< Updated upstream
    let filtered = [...data]; // Start with the original data

    // Apply the filter based on the selected "Filter By" option
    if (filterBy === 'owner') {
      filtered = filtered.sort((a, b) => a.owner.localeCompare(b.owner)); // Alphabetical sort by owner name
    }

    // Apply sorting based on the "Sort By" option
=======
    let sorted = [...warehouses];

    // Apply sorting based on the "Filter By" option
>>>>>>> Stashed changes
    if (sortBy === 'ascending' || sortBy === 'descending') {
      const isAscending = sortBy === 'ascending';

      // Sorting based on the selected filter
      if (filterBy === 'warehouseSize') {
        sorted.sort((a, b) =>
          isAscending
            ? parseWarehouseSize(a.warehouseSize) - parseWarehouseSize(b.warehouseSize)
            : parseWarehouseSize(b.warehouseSize) - parseWarehouseSize(a.warehouseSize)
        );
<<<<<<< Updated upstream
      } else if (filterBy === 'pincode') {
        filtered = filtered.sort((a, b) =>
          isAscending ? a.pincode.localeCompare(b.pincode) : b.pincode.localeCompare(a.pincode)
=======
      } else if (filterBy === 'ceilingHeight') {
        sorted.sort((a, b) =>
          isAscending
            ? parseInt(a.ceilingHeight) - parseInt(b.ceilingHeight)
            : parseInt(b.ceilingHeight) - parseInt(a.ceilingHeight)
        );
      } else if (filterBy === 'operationalHours') {
        sorted.sort((a, b) =>
          isAscending
            ? a.operationalHours.localeCompare(b.operationalHours)
            : b.operationalHours.localeCompare(a.operationalHours)
>>>>>>> Stashed changes
        );
      }
    }

<<<<<<< Updated upstream
    // Update the filtered data
    setFilteredData(filtered);
  }, [filterBy, sortBy]);
=======
    setFilteredWarehouses(sorted); // Update the filtered data
  }, [filterBy, sortBy, warehouses]);
>>>>>>> Stashed changes

  return (
    <div className="flex flex-col gap-4">
      {/* Header and Filters */}
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex gap-4 p-4">
        <div className="flex flex-col">
          <label htmlFor="filter" className="text-lg font-semibold">Filter By</label>
          <select
            id="filter"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select a filter</option>
<<<<<<< Updated upstream
            <option value="owner">Owner Data (Alphabetical)</option>
            <option value="warehouseSize">Warehouse Size</option>
            <option value="pincode">Pincode</option>
=======
            <option value="ceilingHeight">Ceiling Height</option>
            <option value="warehouseSize">Warehouse Size</option>
            <option value="operationalHours">Operational Hours</option>
>>>>>>> Stashed changes
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="sort" className="text-lg font-semibold">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select sorting method</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-300 p-2">Owner Data</th>
              <th className="border border-gray-300 p-2">Warehouse Size</th>
<<<<<<< Updated upstream
              <th className="border border-gray-300 p-2">Pincode</th>
              <th className="border border-gray-300 p-2">Area Name</th>
              <th className="border border-gray-300 p-2">Zone Score</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((warehouse, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{warehouse.owner}</td>
                <td className="border border-gray-300 p-2">{warehouse.warehouseSize}</td>
                <td className="border border-gray-300 p-2">{warehouse.pincode}</td>
                <td className="border border-gray-300 p-2">{warehouse.areaName}</td>
                <td className="border border-gray-300 p-2">{warehouse.zoneScore}</td>
                <td className="border border-gray-300 p-2">{warehouse.status}</td>
=======
              <th className="border border-gray-300 p-2">Ceiling Height</th>
              <th className="border border-gray-300 p-2">Warehouse Address</th>
              <th className="border border-gray-300 p-2">Storage Capacity</th>
              <th className="border border-gray-300 p-2">Loading Dock</th>
              <th className="border border-gray-300 p-2">Power Backup</th>
              <th className="border border-gray-300 p-2">Temperature Control</th>
              <th className="border border-gray-300 p-2">Security Features</th>
              <th className="border border-gray-300 p-2">Operational Hours</th>
              <th className="border border-gray-300 p-2">Insurance Coverage</th>
              <th className="border border-gray-300 p-2">Fire Safety Compliance</th>
              <th className="border border-gray-300 p-2">Year of Establishment</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td className="border border-gray-300 p-2">{warehouse.darkStoreName}</td>
                <td className="border border-gray-300 p-2">{warehouse.warehouseSize}</td>
                <td className="border border-gray-300 p-2">{warehouse.ceilingHeight}</td>
                <td className="border border-gray-300 p-2">{warehouse.warehouseAddress}</td>
                <td className="border border-gray-300 p-2">{warehouse.storageCapacity}</td>
                <td className="border border-gray-300 p-2">{warehouse.loadingDock ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 p-2">{warehouse.powerBackup ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 p-2">{warehouse.temperatureControl}</td>
                <td className="border border-gray-300 p-2">{warehouse.securityFeatures}</td>
                <td className="border border-gray-300 p-2">{warehouse.operationalHours}</td>
                <td className="border border-gray-300 p-2">{warehouse.insuranceCoverage ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 p-2">{warehouse.fireSafetyCompliance}</td>
                <td className="border border-gray-300 p-2">{warehouse.yearOfEstablishment}</td>
>>>>>>> Stashed changes
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings;
