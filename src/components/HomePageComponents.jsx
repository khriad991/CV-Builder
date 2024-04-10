import React from 'react';
import Link from "next/link";

const HomePageComponents = () => {
    return (
        <section>
            <div className="container">
                <div className="flex flex-col md:flex-row my-16">
                    <div className="basis-1 md:basis-1/2 flex flex-col justify-center gap-y-4 p-6">
                        <h1 className="font-bold text-5xl text-black">Build a professional resume for free</h1>
                        <p className='text-lg text-gray-500 '>Create your resume easily with our free builder and professional templates.</p>
                        <div className="flex flex-col lg:flex-row gap-x-4 gap-y-4 !justify-start mt-8">
                            <Link href="/" className="btn ">go to my resume</Link>
                            <Link href={"/my-cv/project"} className="btnBG ">create new resume</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex md:basis-1/2 ">
                        <img className="w-full" src="/home.png" alt=""/>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HomePageComponents;