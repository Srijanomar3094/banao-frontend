"use client";

import { useState, useEffect } from "react";
import { getHit } from "../../lib/customHit";
import { getUserAppointments } from "../../lib/utilities";

export default function MyAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getHit(getUserAppointments);
                if (response) {
                    setAppointments(response.res.data);
                } else {
                    console.error("Failed to fetch appointments");
                }
            } catch (error) {
                console.error("Something went wrong:", error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
        <header className="bg-[#504da6] text-white p-6 text-center text-3xl font-bold shadow-lg">
        My Appointments
      </header>
        <div className=" flex items-center justify-center px-4 mt-10">
            <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-lg border-t-4 border-[#504da6]">
              

                {appointments.length > 0 ? (
                    <div className="space-y-5">
                        {appointments.map((appointment, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-100 p-6 rounded-2xl shadow-md border-l-4 border-[#504da6]">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Doctor: {appointment.doctor_name}
                                </h3>
                                <p className="text-gray-600"><strong>Date:</strong> {appointment.appointment_date}</p>
                                <p className="text-gray-600"><strong>Start Time:</strong> {appointment.start_time}</p>
                                <p className="text-gray-600"><strong>End Time:</strong> {appointment.end_time}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No appointments found.</p>
                )}
            </div>
        </div>
        </div>
    );
}
