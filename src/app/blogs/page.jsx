"use client";

import { useEffect, useState } from "react";
import { Card } from "antd";
import { blogs } from "../lib/utilities";
import { getHit } from "../lib/customHit";
import { imageURL } from "../lib/axios";

const truncateSummary = (text, wordLimit = 15) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

export default function BlogListPage() {
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await getHit(blogs);
        if (response?.res?.data?.blogs) {
          setBlogData(response.res.data.blogs);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  return (
    
    <div>
        <header className="bg-[#504da6] text-white p-6 text-center text-3xl font-bold shadow-lg">
        Blogs
      </header>
      <div className="p-6">
      {loading ? (
        <Card loading className="w-full h-64" />
      ) : (
        Object.entries(blogData).map(([category, blogs]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <Card key={blog.id} hoverable className="p-4">
                  {blog.image && (
                    <img
                      src={`${imageURL}${blog.image}`}
                      alt={blog.title}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  <Card.Meta
                    title={blog.title}
                    description={truncateSummary(blog.summary)}
                  />
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}
