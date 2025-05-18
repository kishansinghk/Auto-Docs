"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user info from token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Use jwt-decode to decode the token
                const payload = jwtDecode(token);
                setUser(payload.user || payload); // fallback if user is root
            } catch (e) {
                setUser(null);
            }
        }
    }, []);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-lg text-gray-500 dark:text-gray-300">No user info found. Please log in.</div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-6 mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold">
                    {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{user.name || "User"}</h2>
                    <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Role:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{user.role || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Department:</span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">{user.department || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Status:</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">{user.status || "Active"}</span>
                </div>
            </div>
        </div>
    );
}
