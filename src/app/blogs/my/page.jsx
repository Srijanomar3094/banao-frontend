'use client';

import React, { useEffect, useState } from 'react';
import { getHit } from "../../lib/customHit";
import { myBlogs } from "../../lib/utilities";
import { imageURL } from '@/app/lib/axios';
import { Tag } from 'antd';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await getHit(myBlogs);
        if (response) {
          setBlogs(response.res.data.blogs);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    fetchMyBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="bg-[#504da6] text-white p-6 text-center text-3xl font-bold shadow-lg mb-10">
        My Blogs
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <h2 className="text-gray-800 text-xl font-semibold">{blog.title}</h2>
            <img
              src={`${imageURL}${blog.image}`}
              alt={blog.title}
              className="rounded-lg w-full h-48 object-cover"
            />
            <br/>
            <p className="text-gray-600 text-sm mb-2">{new Date(blog.created_at).toLocaleDateString()}</p>
            <p className="text-gray-800">{blog.summary}</p>
            {blog.draft && <Tag color="magenta">Draft</Tag>}

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
