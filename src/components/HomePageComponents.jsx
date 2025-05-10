'use client'
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import cookies from "js-cookie";

const HomePageComponents = () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const myToken = cookies.get("token");
        if (myToken) {
            setToken(myToken);
        }
    }, []);
    return (
        <section>
            <div className="container">
                <div className="flex flex-col md:flex-row my-16">
                    <div className="basis-1 md:basis-1/2 flex flex-col justify-center gap-y-4 p-6">
                        <h1 className="font-bold text-5xl text-black">Build a professional resume for free</h1>
                        <p className='text-lg text-gray-500 '>Create your resume easily with our free builder and professional templates.</p>
                        <div className="flex flex-col lg:flex-row gap-4 !justify-start mt-8">
                            {token ?(
                                <>
                                    <Link href={"/profile"} className="btn !px-8">Go to Your Profile</Link>
                                    <Link href={"/my-cv"} className="btnBG !px-8">Update Your RESUME</Link>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-4">
                                        <h1 className={"text-lg text-gray-700 font-semibold "}>Please Login first for Create Your Resume</h1>
                                        <Link href={"/user/login"} className="btn w-fit !px-12">Get Started</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:flex md:basis-1/2 ">
                        <Image className="w-full" width="500" height={600} src="/home.png" alt="home"/>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HomePageComponents;