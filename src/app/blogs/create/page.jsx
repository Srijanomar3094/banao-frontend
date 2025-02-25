"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postHit,getHit } from "../../lib/customHit";
import { createBlog,blogCategories } from "../../lib/utilities";


export default function CreateBlog() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: null,
        category: "",
        summary: "",
        content: "",
        isDraft: false,
    });
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getHit(blogCategories);
                if (response) {
                    setCategories(response.res.data) 
                } else {
                    console.error("Failed to fetch categories");
                }
            } catch (error) {
                console.error("Something went wrong:", error);
            }
        };
    
        fetchCategories();
    }, []);
    

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
        }));
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
    
        try {
            const response = await postHit(createBlog,formDataToSend);
            
            if (response) {  
                router.push("/blogs/my"); 
            } else {
                const errorData = await response.json();
                console.error("Failed to create blog:", errorData);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };
    
    

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl bg-white p-12 rounded-3xl shadow-xl border-t-4 border-[#504da6]">
                <h2 className="text-4xl font-bold text-[#504da6] text-center mb-8">Create Blog</h2>
                <form onSubmit={handleCreateBlog} className="space-y-3">
                    <InputField label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <InputField label="Image" name="image" type="file" onChange={handleChange} required />
                    
                    <div>
                        <label className="block text-xl font-semibold text-gray-700">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#504da6]">
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.field}</option>
                            ))}
                        </select>
                    </div>
                    
                    <TextAreaField label="Summary" name="summary" value={formData.summary} onChange={handleChange} required />
                    <TextAreaField label="Content" name="content" value={formData.content} onChange={handleChange} required rows={6} />
                    
                    <div className="flex items-center space-x-3">
                        <input type="checkbox" name="isDraft" checked={formData.isDraft} onChange={handleChange} className="w-5 h-5" />
                        <label className="text-xl font-semibold text-gray-700">Save as Draft</label>
                    </div>

                    <button type="submit" className="w-full bg-[#504da6] text-white text-xl font-semibold px-5 py-4 rounded-xl shadow-lg hover:bg-[#3c397d] transition">Create Blog</button>
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

const TextAreaField = ({ label, name, value, onChange, required, rows = 3 }) => (
    <div>
        <label className="block text-xl font-semibold text-gray-700">{label}</label>
        <textarea name={name} value={value} onChange={onChange} required={required} rows={rows} className="text-gray-800 w-full px-5 py-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#504da6]"></textarea>
    </div>
);