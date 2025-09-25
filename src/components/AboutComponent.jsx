
"use client";
import {
  FaRocket,
  FaUserTie,
  FaChartLine,
  FaPalette,
  FaMobileAlt,
  FaCloud,
  FaBullseye,
  FaLightbulb,
} from "react-icons/fa";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: <FaUserTie className="w-8 h-8 text-sky-500" />, // Sky
    title: "Professional Templates",
    description:
      "Choose from a variety of modern and professional templates designed to impress recruiters.",
  },
  {
    icon: <FaRocket className="w-8 h-8 text-indigo-500" />, // Indigo
    title: "Quick & Easy",
    description:
      "Create a professional CV in minutes with our intuitive drag-and-drop interface.",
  },
  {
    icon: <FaPalette className="w-8 h-8 text-teal-500" />, // Teal
    title: "Customizable Design",
    description:
      "Fully customize colors, fonts, and layouts to match your personal brand.",
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-pink-500" />, // Pink
    title: "ATS Optimized",
    description:
      "Our templates are designed to pass through Applicant Tracking Systems (ATS) with ease.",
  },
  {
    icon: <FaMobileAlt className="w-8 h-8 text-yellow-500" />, // Yellow
    title: "Mobile Friendly",
    description: "Edit and download your CV on any device, anywhere, anytime.",
  },
  {
    icon: <FaCloud className="w-8 h-8 text-violet-500" />, // Violet
    title: "Cloud Storage",
    description:
      "All your CV details are securely saved in the cloud, accessible anytime from any device.",
  },
];

export default function AboutComponent() {
  const router = useRouter();

  const getStarted = async () => {
    let token = await cookies.get("token");
    if (token) {
      router.push("/my-cv");
    } else {
      router.push("/user/login");
    }
  };
  return (
    <div className="flex flex-col">
       {/* Hero Section */}
      <section className="bg-gradient-to-bl from-sky-800 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center py-8 md:py-12 lg:py-20 space-y-4 md:space-y-6 ">
          <h1 className="text-4xl md:text-5xl font-bold">About CV Builder</h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto">
            Empowering job seekers to create professional resumes that stand out
            from the crowd.
          </p>
        </div>
      </section>

      {/* Mission Section */}
  
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Our Mission
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white px-5 py-8 md:py-12 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FaBullseye className="w-8 h-8 text-sky-500" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
            Our Vision
          </h3>
          <p className="text-gray-600 text-center mx-auto w-[90%]">
            To become the most trusted platform for professionals to showcase their skills and experiences through beautifully crafted resumes.
          </p>
        </div>
        {/* Card 2 */}
        <div className="bg-white px-5 py-8 md:py-12 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FaLightbulb className="w-8 h-8 text-sky-500" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
            Our Mission
          </h3>
          <p className="text-gray-600 text-center mx-auto w-[90%]">
            We're dedicated to simplifying the resume creation process while maintaining the highest standards of professionalism and design, helping job seekers at all career levels create compelling resumes that get noticed by employers.
          </p>
        </div>
      </div>
      </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose CV Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white px- py-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Create Your Professional CV?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have landed their dream jobs
            with CV Builder.
          </p>
          <button
            onClick={getStarted}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Get Started for Free
          </button>
        </div>
      </section>
    </div>
  )
}
