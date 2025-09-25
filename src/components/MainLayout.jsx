import React from 'react';
import NavBar from "@/components/NavBar";
import Link from 'next/link';

const MainLayout = ({ children }) => {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gray-800 text-white  mt-10">
                <div className="container mx-auto px-4 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between py-4 md:items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold">CV Builder</h2>
                            <p className="text-gray-400">Create professional resumes easily</p>
                        </div>
                        <div className="flex space-x-6   ">
                            <Link href="/about" className="hover:text-blue-400 transition-colors">
                                About
                            </Link>
                            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border border-slate-700 py-2 text-center">
                    <p className="text-gray-400">
                        © {currentYear} <span className="text-blue-400 capitalize font-medium">CV Builder</span>. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;