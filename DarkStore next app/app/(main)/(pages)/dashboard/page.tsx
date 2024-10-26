'use client';

import React, { useState, useEffect } from "react";
import { UserIcon, AppWindowIcon, WarehouseIcon } from "lucide-react";
import MyDetailsComponent from "@/components/dashboardPages/MyDetails";
import MyApplicationsComponent from "@/components/dashboardPages/MyApplication";
import MyWarehousesComponent from "@/components/dashboardPages/MyWarehouses";
import './dashboard.css';

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="loader-container">
          <div className="loader"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 relative min-h-screen bg-background text-foreground">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/80 backdrop-blur-lg flex items-center border-b">
        Account
      </h1>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <DashboardButton
            icon={<UserIcon className="h-12 w-12" />}
            title="My Details"
            onClick={() => setActiveSection("details")}
            active={activeSection === "details"}
            gradient="from-blue-500 to-purple-600"
          />
          <DashboardButton
            icon={<AppWindowIcon className="h-12 w-12" />}
            title="My Applications"
            onClick={() => setActiveSection("applications")}
            active={activeSection === "applications"}
            gradient="from-green-500 to-teal-600"
          />
          <DashboardButton
            icon={<WarehouseIcon className="h-12 w-12" />}
            title="My Warehouses"
            onClick={() => setActiveSection("warehouses")}
            active={activeSection === "warehouses"}
            gradient="from-orange-500 to-red-600"
          />
        </div>

        <div className="mt-12 w-full max-w-2xl bg-card p-6 rounded-lg shadow-lg">
          {activeSection === "details" && <MyDetailsComponent />}
          {activeSection === "applications" && <MyApplicationsComponent />}
          {activeSection === "warehouses" && <MyWarehousesComponent />}
        </div>
      </div>
    </div>
  );
};

interface DashboardButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  active: boolean;
  gradient: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ icon, title, onClick, active, gradient }) => {
  return (
    <button
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out
        ${active ? 'scale-105' : 'scale-100 hover:scale-105'}
        group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary
      `}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10 flex flex-col items-center justify-center p-8 h-64 text-white">
        <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2 tracking-wider">{title}</h3>
        <div className="h-1 w-12 bg-white rounded-full transform origin-left transition-all duration-300 group-hover:w-24" />
      </div>
      <div className="absolute inset-0 border-4 border-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default DashboardPage;