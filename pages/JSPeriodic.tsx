import React from "react";
import JSPeriodicTable from "../components/periodic-table/core/JSPeriodicTable";

const JSPeriodic: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <JSPeriodicTable />
      </div>
    </div>
  );
};

export default JSPeriodic;
