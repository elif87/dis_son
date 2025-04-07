"use client";

import React from "react";
import AdminNavbar from "@/app/components/AdminNavbar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onLogout={handleLogout} />
      {children}
    </div>
  );
} 