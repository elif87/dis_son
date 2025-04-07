"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/app/components/AdminNavbar";
import Cookies from "js-cookie";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
}

const DEFAULT_DOCTOR_IMAGE = "/images/default-doctor.jpg";

export default function DoctorManagement() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    title: "",
    specialties: ""
  });

  const handleLogout = () => {
    Cookies.remove("adminToken");
    router.push("/admin/login");
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      console.error("Doktor yükleme hatası:", err);
      setError(err instanceof Error ? err.message : "Doktorlar yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
        body: JSON.stringify({
          ...newDoctor,
          specialties: newDoctor.specialties.split(",").map(s => s.trim()),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Doktor eklenirken bir hata oluştu");
      }

      const data = await response.json();
      setDoctors(prevDoctors => [...prevDoctors, data]);

      setNewDoctor({
        name: "",
        title: "",
        specialties: "",
      });
    } catch (err) {
      console.error("Doktor ekleme hatası:", err);
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu doktoru silmek istediğinizden emin misiniz?")) return;

    try {
      const response = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Doktor silinirken bir hata oluştu");

      fetchDoctors();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-4">Yükleniyor...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-4 text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Doktor Yönetimi</h1>
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Geri Dön
            </button>
          </div>

          {/* Yeni Doktor Ekleme Formu */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Yeni Doktor Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doktor Adı
                </label>
                <input
                  type="text"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unvan
                </label>
                <input
                  type="text"
                  value={newDoctor.title}
                  onChange={(e) => setNewDoctor({ ...newDoctor, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uzmanlık Alanları (virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={newDoctor.specialties}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specialties: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
                  placeholder="Örn: İmplant Tedavisi, Kanal Tedavisi, Ortodonti"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Doktor Ekle
              </button>
            </form>
          </div>

          {/* Doktor Listesi */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-semibold p-6 border-b">Doktor Listesi</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unvan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uzmanlık Alanları
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {doctor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doctor.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {doctor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(doctor.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 