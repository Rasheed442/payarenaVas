import React from "react";

export default function DashboardHeader({ title, desc }) {
  return (
    <div>
      <div className="text-3xl font-semibold">{title}</div>
      <div className="font-medium mt-1">{desc}</div>
    </div>
  );
}
