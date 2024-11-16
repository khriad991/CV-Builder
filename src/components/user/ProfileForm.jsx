"use client";

import { useState, useEffect } from "react";
import {Get, Update} from "@/utility/APIHelper";
import {ErrToast, Successtoast} from "@/utility/FromHelper";
import {SuccessAlert} from "@/utility/SweetAlert";


const ProfileForm = () => {
    const [profile, setProfile] = useState([]); // Use null initially
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch profile data from the API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data  = await Get("/api/my-cv/profile/read")
                if(data.status === true){
                    setProfile(data?.data)
                }

            } catch (error) {
                ErrToast("Failed to load profile data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target); // Collect form data
        const updatedProfile = Object.fromEntries(formData);

        try {
            await Update("/api/my-cv/profile/update", updatedProfile);
            await SuccessAlert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            ErrToast("Failed to update profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    }

    if (!profile) {
        return <p className="text-center text-red-500">No profile data found.</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg py-44">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">User Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-lg">
                {/* Full Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        defaultValue={profile.full_name}
                        className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={profile.email}
                        className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                        required
                    />
                </div>

                {/* Country */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Country</label>
                    <input
                        type="text"
                        name="country"
                        defaultValue={profile.country}
                        className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                    />
                </div>

                {/* Mobile */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        defaultValue={profile.mobile}
                        className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                    />
                </div>

                {/* Summary */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Summary</label>
                    <textarea
                        name="summary"
                        defaultValue={profile.summary}
                        className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                    />
                </div>

                {/* Designation */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        defaultValue={profile.designation}
                        className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                    />
                </div>

                {/* Social Links */}
                {["facebook", "twitter", "git", "linkdin"].map((field) => (
                    <div className="flex flex-col" key={field}>
                        <label className="text-sm font-semibold text-gray-600">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type="text"
                            name={field}
                            defaultValue={profile[field]}
                            className="border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                        />
                    </div>
                ))}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={` py-2 text-white rounded-lg w-fit px-8  ${
                        isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
