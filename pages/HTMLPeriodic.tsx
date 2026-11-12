import React from "react";
import PeriodicTable from "../components/periodic-table/core/PeriodicTable";

const HTMLPeriodic: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <PeriodicTable />
      </div>
    </div>
  );
};

export default HTMLPeriodic;
