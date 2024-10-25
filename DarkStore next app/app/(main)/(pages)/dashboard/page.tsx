'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MyDetailsComponent from "@/components/dashboardPages/MyDetails"
import MyApplicationsComponent from "@/components/dashboardPages/MyApplication";
import MyWarehousesComponent from "@/components/dashboardPages/MyWarehouses";
import { UserIcon, AppWindowIcon, WarehouseIcon } from "lucide-react";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState(""); // State to track the active section

  return (
    <div className="flex flex-col gap-4 relative min-h-screen bg-background text-foreground">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/80 backdrop-blur-lg flex items-center border-b">
        Account
      </h1>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            variant="outline"
            size="lg"
            className="h-40 text-xl font-semibold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
            onClick={() => setActiveSection("details")}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <UserIcon className="h-12 w-12" />
              <span>My Details</span>
            </div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-40 text-xl font-semibold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
            onClick={() => setActiveSection("applications")}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <AppWindowIcon className="h-12 w-12" />
              <span>My Applications</span>
            </div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-40 text-xl font-semibold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
            onClick={() => setActiveSection("warehouses")}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <WarehouseIcon className="h-12 w-12" />
              <span>My Warehouses</span>
            </div>
          </Button>
        </div>

        {/* Render based on active section */}
        <div className="mt-6 w-full max-w-2xl bg-card p-6">
          {activeSection === "details" && <MyDetailsComponent />}
          {activeSection === "applications" && <MyApplicationsComponent />}
          {activeSection === "warehouses" && <MyWarehousesComponent />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;