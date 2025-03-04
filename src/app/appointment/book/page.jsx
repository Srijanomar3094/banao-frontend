"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postHit } from "../../lib/customHit";
import { bookAppointment } from "../../lib/utilities";
import { useSearchParams } from "next/navigation";


export default function BookAppointment() {
    const router = useRouter();
    

const searchParams = useSearchParams();
const doctor_id = searchParams.get("doctor_id");


    const [formData, setFormData] = useState({
        doctor_id: doctor_id,
        speciality: "",
        date: "",
        start_time: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();

        try {
            const response = await postHit(bookAppointment, formData);
            if (response) {
                router.push(`/appointment/my`);
            } else {
                console.error("Failed to book appointment");
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };

    return (
        <div>
        <header className="bg-[#504da6] text-white p-6 text-center text-3xl font-bold shadow-lg">
        Book Appointment
      </header>
        <div className="bg-gray-100 flex items-center justify-center mt-10">
            <div className="w-full max-w-3xl bg-white p-12 rounded-3xl shadow-xl border-t-4 border-[#504da6]">
                <form onSubmit={handleBookAppointment} className="space-y-3">
                    <InputField label="Speciality" name="speciality" value={formData.speciality} onChange={handleChange} required />
                    <InputField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                    <InputField label="Start Time" name="start_time" type="time" value={formData.start_time} onChange={handleChange} required />
                    <button type="submit" className="w-full bg-[#504da6] text-white text-xl font-semibold px-5 py-4 rounded-xl shadow-lg hover:bg-[#3c397d] transition">Confirm</button>
                </form>
            </div>
        </div>
        </div>
    );
}

const InputField = ({ label, name, type = "text", value, onChange, required }) => (
    <div>
        <label className="block text-xl font-semibold text-gray-700">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} required={required} className="text-gray-800 w-full px-5 py-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#504da6]" />
    </div>
);