import Link from "next/link";
import Image from "next/image";

const HomePageComponents = () => {
    return (
        <section>
            <div className="container">
                <div className="flex flex-col md:flex-row my-16">
                    <div className="basis-1 md:basis-1/2 flex flex-col justify-center gap-y-4 p-6">
                        <h1 className="font-bold text-5xl text-black">Build a professional resume for free</h1>
                        <p className='text-lg text-gray-500 '>Create your resume easily with our free builder and professional templates.</p>
                        <div className="flex flex-col lg:flex-row gap-x-4 gap-y-4 !justify-start mt-8">
                            <Link href={"/my-cv"} className="btn !px-8">Go to Your CV</Link>
                            <Link href={"/my-cv"} className="btnBG ">create new resume</Link>
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