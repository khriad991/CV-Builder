"use client";
import { useState, useEffect } from "react";
import { Get, Update } from "@/utility/APIHelper";
import { ErrToast } from "@/utility/FromHelper";
import { SuccessAlert } from "@/utility/SweetAlert";
import Loader from "@/components/ChildComponents/Loader";
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import SkillComponent from "@/components/skill/SkillComponent";
import EducationComponent from "@/components/education/EducationComponent";
import ProjectComponents from "@/components/project/ProjectComponents";
import{Toaster} from "react-hot-toast"
import WorkExperianceComponent from "@/components/workExperiance/WorkExperianceComponent";
import {FaRegEdit} from "react-icons/fa";

const ProfileForm = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [imgError, setImgError] = useState(false);
    const [activeTab, setActiveTab] = useState("projects");

    // Optional: prefetch components on hover for snappier UX
    const prefetchTab = (key) => {
        switch (key) {
            case "skills":
                import("@/components/skill/SkillComponent");
                break;
            case "educations":
                import("@/components/education/EducationComponent");
                break;
            case "projects":
                import("@/components/project/ProjectComponents");
                break;
            case "work":
                import("@/components/workExperiance/WorkExperianceComponent");
                break;
            default:
                break;
        }
    };

    // Fetch profile data from the API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await Get("/api/my-cv/profile/read");
                if (data.status === true) {
                    setProfile(data?.data);
                    setFormData(data?.data);
                }
            } catch (error) {
                ErrToast("Failed to load profile data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Handle input changes in edit mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email || "")) {
            ErrToast("Please provide a valid email address.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Prepare a clean payload with only updatable fields
            const payload = {
                full_name: formData.full_name || "",
                email: formData.email || "",
                country: formData.country || "",
                mobile: formData.mobile || "",
                img: formData.img || "",
                summary: formData.summary || "",
                designation: formData.designation || "",
                facebook: formData.facebook || "",
                twitter: formData.twitter || "",
                git: formData.git || "",
                linkdin: formData.linkdin || "", 
            };

      
            const res = await Update("/api/my-cv/profile/update", payload);

            if (res?.status === true) {

                setProfile(payload);
                setFormData(payload);
                setIsEditing(false);
                await SuccessAlert("Profile updated successfully!");
            } else {
                ErrToast(res?.message || res?.error || "Failed to update profile.");
            }
        } catch (error) {
            console.error("[ProfileForm] Error updating profile:", error);
            ErrToast(error?.message || "Failed to update profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle edit button click
    const handleEdit = () => {
        setFormData(profile);
        setIsEditing(true);
    };

    // Handle cancel button click
    const handleCancel = () => {
        setFormData(profile || {});
        setIsEditing(false);
    };

    // Handle image upload (base64), accept only image files up to 1.5 MB
    const handleImageUpload = (e) => {
        const input = e.target;
        const file = input.files && input.files[0];
        if (!file) return;

        // Reset previous error state
        setImgError(false);

        if (!file.type.startsWith("image/")) {
            ErrToast("Only image files are allowed.");
            input.value = "";
            return;
        }
        const MAX = 1.5 * 1024 * 1024; // 1.5 MB in bytes
        if (file.size > MAX) {
            ErrToast("Image size must be 1.5 MB or less.");
            setImgError(true);
            input.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, img: reader.result }));
            setImgError(false);
        };
        reader.readAsDataURL(file);
    };

    if (isLoading) {
        return <Loader text="Loading profile..." />;
    }

    if (!profile) {
        return (
            <div className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
                <p className="text-center text-red-500">No profile data found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl mt-20 max-w-4xl">
            <Toaster position="top-right" reverseOrder={false} />
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {isEditing ? "Edit Profile" : "User Profile"}
                </h1>
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="btn !px-5 py-2 flex items-center gap-2"
                    >
                       <FaRegEdit   />
                           Edit Profile
                    </button>
                )}
            </div>

            {/* Profile View Section */}
            {!isEditing && (
                <div className="space-y-8">
                    {/* Profile Header with Image */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                                {profile.img ? (
                                    <img
                                        src={profile.img}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                        <svg
                                            className="w-16 h-16 text-gray-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {profile.full_name || "No Name"}
                            </h2>
                            <p className="text-lg text-blue-600 font-semibold mb-2">
                                {profile.designation || "No Designation"}
                            </p>
                            <p className="text-gray-600 mb-2">{profile.email}</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {profile.country || "No Country"}
                                </span>
                                {profile.mobile && (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        {profile.mobile}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    {profile.summary && (
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                About Me
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {profile.summary}
                            </p>
                        </div>
                    )}

                    {/* Social Links Section */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Social Links
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    key: "facebook",
                                    label: "Facebook",
                                    icon: "📘",
                                    color: "bg-blue-500",
                                },
                                {
                                    key: "twitter",
                                    label: "Twitter",
                                    icon: "🐦",
                                    color: "bg-sky-500",
                                },
                                {
                                    key: "git",
                                    label: "GitHub",
                                    icon: "🐙",
                                    color: "bg-gray-800",
                                },
                                {
                                    key: "linkdin",
                                    label: "LinkedIn",
                                    icon: "💼",
                                    color: "bg-blue-700",
                                },
                            ].map(
                                (social) =>
                                    profile[social.key] && (
                                        <div
                                            key={social.key}
                                            className="flex items-center gap-3 p-3 bg-white rounded-lg border"
                                        >
                                            <div
                                                className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white text-lg`}
                                            >
                                                {social.icon}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {social.label}
                                                </p>
                                                <a
                                                    href={profile[social.key]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm truncate block max-w-xs"
                                                >
                                                    {profile[social.key]}
                                                </a>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Form Section */}
            {isEditing && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image Upload */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Image</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                                {formData.img ? (
                                    <img
                                        src={formData.img}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                        <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="profile-image"
                                />
                                <label
                                    htmlFor="profile-image"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                                >
                                    Upload Image
                                </label>
                              {imgError && <p className="text-red-500 mt-2">Only image files up to 1.5 MB.</p>}
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            About Me
                        </h3>
                        <textarea
                            name="summary"
                            value={formData.summary || ""}
                            onChange={handleInputChange}
                            rows={6}
                            placeholder="Tell us about yourself..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                        />
                    </div>

                    {/* Social Links */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Social Links
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    key: "facebook",
                                    label: "Facebook URL",
                                    placeholder:
                                        "https://facebook.com/yourprofile",
                                },
                                {
                                    key: "twitter",
                                    label: "Twitter URL",
                                    placeholder:
                                        "https://twitter.com/yourprofile",
                                },
                                {
                                    key: "git",
                                    label: "GitHub URL",
                                    placeholder:
                                        "https://github.com/yourusername",
                                },
                                {
                                    key: "linkdin",
                                    label: "LinkedIn URL",
                                    placeholder:
                                        "https://linkedin.com/in/yourprofile",
                                },
                            ].map((social) => (
                                <div key={social.key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {social.label}
                                    </label>
                                    <input
                                        type="url"
                                        name={social.key}
                                        value={formData[social.key] || ""}
                                        onChange={handleInputChange}
                                        placeholder={social.placeholder}
                                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 justify-end pt-6 border-t">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btnBG  !px-8"
                        >
                            Cancel
                        </button>
                        <SubmitButton submit={isSubmitting} text="Update Profile" />
                    </div>
                </form>
            )}

            {/* tab section: skills, educations, projects, work */}
            { !isEditing && (
                <section className="py-8">
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="flex flex-wrap gap-2" aria-label="Tabs">
                            {[
                                { key: "projects", label: "Projects" },
                                { key: "skills", label: "Skills" },
                                { key: "educations", label: "Educations" },
                                { key: "work", label: "Work Experience" },
                            ].map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    onMouseEnter={() => prefetchTab(t.key)}
                                    onClick={() => setActiveTab(t.key)}
                                    className={`px-4 py-2 rounded-t-md font-medium transition-colors ${
                                        activeTab === t.key
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-gray-50 rounded-lg border p-4">
                        {activeTab === "skills" && (
                            <SkillComponent />
                        )}
                        {activeTab === "educations" && (
                            <EducationComponent />
                        )}
                        {activeTab === "projects" && (
                            <ProjectComponents />
                        )}
                        {activeTab === "work" && (
                            <WorkExperianceComponent />
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProfileForm;
