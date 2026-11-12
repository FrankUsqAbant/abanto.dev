import React from "react";
import PythonPeriodicTable from "../components/periodic-table/core/PythonPeriodicTable";

const PythonPeriodic: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <PythonPeriodicTable />
      </div>
    </div>
  );
};

export default PythonPeriodic;
