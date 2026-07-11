"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Monitor,
  MapPin,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  Loader2,
  GraduationCap,
} from "lucide-react";
import UpdateTutorModal from "@/Component/UpdateTutorModal";
import DeleteConfirmationModal from "@/Component/DeleteConfirmationModal";
import toast from "react-hot-toast";

const MyTutorClient = ({ user }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        // Fetch user's tutors
        const response = await fetch(
          `/api/tutors/my?email=${encodeURIComponent(user.email)}`
        );

        if (response.ok) {
          const data = await response.json();
          setTutors(data.tutors || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [user.email]);

  const handleUpdate = (updatedTutor) => {
    setTutors((prevTutors) =>
      prevTutors.map((tutor) =>
        tutor._id === updatedTutor._id ? updatedTutor : tutor
      )
    );
  };

  const handleDelete = async () => {
    if (!selectedTutor) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tutors/${selectedTutor._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tutor");
      }

      toast.success("Tutor deleted successfully!");
      setTutors((prevTutors) =>
        prevTutors.filter((tutor) => tutor._id !== selectedTutor._id)
      );
      setIsDeleteModalOpen(false);
      setSelectedTutor(null);
    } catch (error) {
      toast.error("Failed to delete tutor");
    } finally {
      setIsDeleting(false);
    }
  };

  const openUpdateModal = (tutor) => {
    setSelectedTutor(tutor);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (tutor) => {
    setSelectedTutor(tutor);
    setIsDeleteModalOpen(true);
  };

  const getTeachingModeBadge = (teachingMode) => {
    switch (teachingMode) {
      case "online":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600 border border-green-500/30">
            <Monitor className="w-3 h-3 mr-1" />
            Online
          </span>
        );
      case "offline":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-600 border border-orange-500/30">
            <MapPin className="w-3 h-3 mr-1" />
            Offline
          </span>
        );
      case "both":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-600 border border-purple-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Both
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tutors</h1>
          <p className="text-gray-600">
            Manage your tutor profiles and bookings
          </p>
        </div>

        {/* Empty State */}
        {tutors.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No tutors found
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't created any tutors yet.
            </p>
            <Link
              href="/add-tutors"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Tutor
            </Link>
          </div>
        ) : (
          /* Table */
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Tutor Photo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Tutor Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Hourly Fee
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Teaching Mode
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Available Days
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Total Slots
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Session Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tutors.map((tutor) => (
                    <tr
                      key={tutor._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                          {tutor.profilePhoto ? (
                            <Image
                              src={tutor.profilePhoto}
                              alt={tutor.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          {tutor.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {tutor.subject}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {tutor.hourlyFee} BDT
                      </td>
                      <td className="px-6 py-4">
                        {getTeachingModeBadge(tutor.teachingMode)}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {tutor.availableDays || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {tutor.totalSlots}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {tutor.sessionStartDate || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openUpdateModal(tutor)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Update"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(tutor)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Update Modal */}
      <UpdateTutorModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedTutor(null);
        }}
        tutor={selectedTutor}
        onUpdate={handleUpdate}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTutor(null);
        }}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default MyTutorClient;
