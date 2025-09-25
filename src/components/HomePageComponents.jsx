'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { FaRegFileAlt, FaMagic, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaRegFileAlt className="text-sky-500 w-7 h-7" />,
    title: "Easy Resume Builder",
    desc: "Create your resume in minutes with our intuitive builder.",
  },
  {
    icon: <FaMagic className="text-purple-500 w-7 h-7" />,
    title: "Professional Templates",
    desc: "Choose from modern, recruiter-approved templates.",
  },
  {
    icon: <FaLock className="text-green-500 w-7 h-7" />,
    title: "Secure & Private",
    desc: "Your data is protected and never shared.",
  },
];

const HomePageComponents = () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const myToken = cookies.get("token");
        if (myToken) setToken(myToken);
    }, []);

  return (
    <section className="bg-gradient-to-br from-sky-50 to-white min-h-screen py-12 mt-20">
      <div className="container mx-auto px-4">
        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left Section */}
          <div className="md:w-1/2 flex flex-col justify-center gap-y-4 ">
            <h1 className="font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-2">
              Build a <span className="text-sky-600">Professional Resume</span> for Free
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Create your resume easily with our free builder and modern templates. Stand out to employers and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {token ? (
                <div className="flex flex-col gap-4 w-full">
                  <Link href="/profile" className="w-auto lg:w-[60%] btn px-4 !py-3 font-semibold bg-sky-600 text-white rounded-lg shadow hover:text-sky-700 hover:bg-transparent my-transition">
                    Go to Your Profile
                  </Link>
                  <Link href="/my-cv" className="w-auto lg:w-[60%] btn px-4 !py-3 font-semibold bg-purple-600  text-white rounded-lg shadow hover:text-purple-700 hover:bg-transparent my-transition">
                    Update Your RESUME
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-base text-gray-700 font-medium mb-2">
                    Please login first to create your resume.
                  </span>
                  <Link href="/user/login" className="btn w-fit !px-12 !py-3 font-semibold bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className="md:w-1/2 flex flex-col items-center gap-8">
            <Image
              className="rounded-xl shadow-lg border border-gray-100"
              width={500}
              height={400}
              src="/home.png"
              alt="Resume Builder Home"
              priority
            />
            {/* Extra Section: Features Grid */}
          
          </div>
        </section>
        {/* Features section  */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 w-full">
            {features.map((feature, idx) => (
            <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="bg-sky-100 rounded-full p-3 mb-3 flex items-center justify-center">
                {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-500 text-center text-[15px]">{feature.desc}</p>
            </div>
            ))}
        </section>
      </div>
    </section>
  );
};

export default HomePageComponents;