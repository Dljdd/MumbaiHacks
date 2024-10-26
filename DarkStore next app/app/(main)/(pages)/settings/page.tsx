'use client';
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import data from '@/data.json'; // Import the warehouse data

type WarehouseData = {
  owner: string;
  warehouseSize: string;
  pincode: string;
  areaName: string;
  zoneScore: number;
  status: string;
};

type Props = {}

const Settings = (props: Props) => {
  const [filterBy, setFilterBy] = useState<string>(''); // State for filter
  const [sortBy, setSortBy] = useState<string>(''); // State for sort
  const [filteredData, setFilteredData] = useState<WarehouseData[]>(data); // Filtered and sorted data state

  // Helper function for converting warehouse size to a number for sorting
  const parseWarehouseSize = (size: string): number => {
    return parseInt(size.replace(/[^\d]/g, '')); // Remove any non-digit characters and convert to number
  };

  // Effect to handle filtering and sorting whenever filter or sort changes
  useEffect(() => {
    let filtered = [...data]; // Start with the original data

    // Apply the filter based on the selected "Filter By" option
    if (filterBy === 'owner') {
      filtered = filtered.sort((a, b) => a.owner.localeCompare(b.owner)); // Alphabetical sort by owner name
    }

    // Apply sorting based on the "Sort By" option
    if (sortBy === 'ascending' || sortBy === 'descending') {
      const isAscending = sortBy === 'ascending';

      // Handle sorting based on filter type
      if (filterBy === 'warehouseSize') {
        filtered = filtered.sort((a, b) =>
          isAscending
            ? parseWarehouseSize(a.warehouseSize) - parseWarehouseSize(b.warehouseSize)
            : parseWarehouseSize(b.warehouseSize) - parseWarehouseSize(a.warehouseSize)
        );
      } else if (filterBy === 'pincode') {
        filtered = filtered.sort((a, b) =>
          isAscending ? a.pincode.localeCompare(b.pincode) : b.pincode.localeCompare(a.pincode)
        );
      }
    }

    // Update the filtered data
    setFilteredData(filtered);
  }, [filterBy, sortBy]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>

      {/* Dropdowns for Filter By and Sort By */}
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
            <option value="owner">Owner Data (Alphabetical)</option>
            <option value="warehouseSize">Warehouse Size</option>
            <option value="pincode">Pincode</option>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings;
