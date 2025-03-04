"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHit } from "../../lib/customHit";
import { getDoctors } from "../../lib/utilities";
import { imageURL } from "../../lib/axios";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getHit(getDoctors);
                if (response) {
                    setDoctors(response.res.data);
                } else {
                    console.error("Failed to fetch doctors");
                }
            } catch (error) {
                console.error("Something went wrong:", error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div>
        <header className="bg-[#504da6] text-white p-6 text-center text-3xl font-bold shadow-lg">
        Book Appointment
      </header>
        <div className="bg-gray-100 flex items-center justify-center mt-10 p-6">
            
            <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#504da6]">
                
                <h2 className="text-4xl font-bold text-[#504da6] text-center mb-8">Our Doctors</h2>

                {doctors.length === 0 ? (
                    <p className="text-center text-gray-500">No doctors available at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="flex items-center gap-6 bg-gray-50 p-6 rounded-xl shadow-md">
                                <img 
                                    src={`${imageURL}${doctor.profile_picture}`} 
                                    alt={`${doctor.name}'s profile`} 
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#504da6] object-cover"
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                                    <Link href={`/appointment/book?doctor_id=${doctor.id}`}>
                                        <button className="mt-4 bg-[#504da6] text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-[#3b3a90]">
                                            Book Appointment
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}
