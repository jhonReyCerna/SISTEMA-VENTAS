import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-blue-700">VentasApp</h2>
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`py-2 px-4 rounded hover:bg-blue-100 transition font-medium ${
            pathname === "/dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-700"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/productos"
          className={`py-2 px-4 rounded hover:bg-blue-100 transition font-medium ${
            pathname === "/productos" ? "bg-blue-50 text-blue-700" : "text-gray-700"
          }`}
        >
          Productos
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
