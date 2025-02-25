'use client';

import './globals.css';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getHit, postHit } from "./lib/customHit";
import { leftPanel, logout } from "./lib/utilities";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await getHit(leftPanel);
        if (response.res) {
          setRoutes(response.res.data.routes);
          setRole(response.res.data.user_role);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    }
    fetchRoutes();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await postHit(logout);

      if (response) {
        localStorage.removeItem("authToken");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <html lang="en">
      <body className={`flex h-screen ${isAuthPage ? "justify-center items-center" : ""} bg-gray-100`}>
        {!isAuthPage && (
          <aside className="w-64 bg-[#504da6] text-white p-6 flex flex-col h-full shadow-xl">
            <h2 className="text-3xl font-bold  tracking-wide">Dashboard</h2>
            <hr className="border-t border-gray-300 opacity-50 my-4" />
            
            <nav className="flex-1">
              <ul className="space-y-4">
                {routes.map((route) => (
                  <li key={route.path}>
                    <a
                      href={route.path}
                      className="block py-3 px-5 text-lg font-medium hover:bg-[#6966c3] rounded-lg transition duration-300"
                    >
                      {route.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <button
              onClick={handleLogout}
              className="w-full py-3 px-5 bg-red-500 hover:bg-red-600 text-lg font-semibold rounded-lg transition duration-300 shadow-md"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </aside>
        )}

        <main className={`flex-1 p-6 ${isAuthPage ? "w-full" : ""}`}>{children}</main>
      </body>
    </html>
  );
}
