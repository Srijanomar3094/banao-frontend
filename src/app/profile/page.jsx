'use client';

import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { getHit } from "../lib/customHit";
import { profileData } from "../lib/utilities";
import { imageURL } from "../lib/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await getHit(profileData);
        if (response) {
          setUser(response.res.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    fetchMyBlogs();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
  
      <header className="bg-[#504da6] text-white p-6 text-center text-3xl font-bold shadow-lg">
        {user?.user_role}
      </header>

      <div className="max-w-2xl mx-auto mt-8 bg-white p-10 rounded-2xl shadow-lg text-center border-t-4 border-[#504da6]">
        <h2 className="text-3xl font-bold text-[#504da6] mb-5">Profile</h2>

        <img 
         src={`${imageURL}${user?.employee_detail?.profile_picture || "/default-profile.png"}`} 
          alt="Profile Picture" 
          className="rounded-full w-32 h-32 border-4 border-[#504da6] mx-auto shadow-md"
        />

        <div className="mt-5">
          <h3 className="text-2xl font-bold text-gray-800">
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-lg text-gray-600 flex items-center justify-center">
            <FaUser className="text-[#504da6] mr-2" /> {user?.username}
          </p>
        </div>

        <hr className="my-5 border-gray-300" />


        <div className="px-4 text-left space-y-3">
          <p className="text-lg text-gray-700 flex items-center">
            <FaEnvelope className="text-[#504da6] text-xl w-6" />
            <span className="font-medium text-gray-800 ml-2">Email:</span>
            <span className="ml-2 text-gray-600">{user?.email}</span>
          </p>
          <p className="text-lg text-gray-700 flex items-start">
            <FaMapMarkerAlt className="text-[#504da6] text-xl w-6 mt-1" />
            <span className="font-medium text-gray-800 ml-2">Address:</span>
            <span className="ml-2 text-gray-600">
              {user?.employee_detail?.address}, {user?.employee_detail?.city}, 
              {user?.employee_detail?.state} - {user?.employee_detail?.pincode}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
