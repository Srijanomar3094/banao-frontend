"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { postHit, getHit } from "../lib/customHit";
import { register, userRoles } from "../lib/utilities";

export default function SignUp() {
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        profile_picture: null,
        address: "",
        city: "",
        state: "",
        pincode: "",
        role: "",
        password1: "",
        password2: ""
    });
    const [error, setError] = useState("");
    const router = useRouter(); 

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getHit(userRoles);
                if (response?.res?.data) {
                    setRoles(response.res.data);
                } else {
                    console.error("Failed to fetch roles");
                }
            } catch (error) {
                console.error("Something went wrong:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password1 !== formData.password2) {
            setError("Passwords do not match!");
            return;
        }
        setError("");

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await postHit(register, formDataToSend);
            alert(response.res.data.message);
            router.push("/profile");
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#504da6]">
                <h2 className="text-4xl font-bold text-[#504da6] text-center mb-8">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-6">
                        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
                        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                        <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>

                    <InputField label="Profile Picture" name="profile_picture" type="file" onChange={handleChange} />

                    <div className="grid grid-cols-2 gap-6">
                        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} required />
                        <InputField label="City" name="city" value={formData.city} onChange={handleChange} required />
                        <InputField label="State" name="state" value={formData.state} onChange={handleChange} required />
                        <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block text-xl font-semibold text-gray-700">Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} required className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#504da6]">
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.field}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <InputField label="Password" name="password1" type="password" value={formData.password1} onChange={handleChange} required />
                        <InputField label="Confirm Password" name="password2" type="password" value={formData.password2} onChange={handleChange} required />
                    </div>

                    {error && <p className="text-red-600 text-lg font-semibold">{error}</p>}

                    <button type="submit" className="w-full bg-[#504da6] text-white text-xl font-semibold px-5 py-4 rounded-xl shadow-lg hover:bg-[#3c397d] transition">
                        Sign Up
                    </button>
                    <div className="text-center">
          <p className="mt-4 text-gray-600">
                Already Registered?{" "}
                <a href="/signup" className="align-center text-[#504da6] font-semibold hover:underline">
                Login
                </a>
            </p>
            </div>
                </form>
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
