'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {BiMenuAltRight} from "react-icons/bi";
import {usePathname, useRouter} from "next/navigation";
import {FaXmark} from "react-icons/fa6";
import cookies from "js-cookie";
import {RxAvatar} from "react-icons/rx";
import {Get} from "@/utility/APIHelper";
import {ErrToast} from "@/utility/FromHelper";

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const [sidebar, setSidebar] = useState(false);
    const [token,setToken] = useState(null);
    const [data,setData] = useState(null);

    useEffect(() => {
        // Check and set token from cookies
        const myToken = cookies.get("token");
        if (myToken) {
            setToken(myToken);
        } else {
            setToken(null);
        }
    }, []);

    useEffect(() => {
        // Fetch profile data if token exists
        const fetchProfile = async () => {
            try {
                const response = await Get("/api/my-cv/profile/read");
                if (response?.status) {
                    setData(response.data);
                    console.log("my user data",response.data)
                } else {
                    throw new Error("Failed to fetch profile");
                }
            } catch (error) {
                setData(null); // Reset data on error
                ErrToast("Failed to load profile data.");
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);


    const handleLogOUt = () => {
        cookies.remove("token");
        setToken(false)
        router.push("/user/login")

    }

    const sidebarControl = () => {
        setSidebar(!sidebar);
    };
    return (
        <section className="fixed top-0 left-0 w-screen z-[9999] bg-red-500">
            <header className="relative z-[999] bg-gray-100">
                <div className="container">
                    <div className={sidebar ? "flex justify-between rounded-[10px] bg-card py-5": "flex justify-between rounded-[10px] bg-gray-100 py-5"}>
                        <div className="logo flex items-center ">
                            <Link href={"/"}>
                                <strong className='font-bold text-sky-500 text-3xl capitalize'>resume</strong>
                            </Link>
                        </div>

                        {/* nav for lg Screen --------*/}
                        <nav className="hidden items-center lg:flex">
                            <ul className="flex  gap-x-[30px] gap-y-4">
                                <li className={pathname === "/" ? "navActive " : "navNotActive "}>
                                    <Link href={"/"}>Home</Link>
                                </li>

                                <li className={pathname === "/about" ? "navActive " : "navNotActive "}>
                                    <Link href={"/about"}>About Us</Link>
                                </li>
                                {
                                    token ?(
                                        <>
                                            <li className={pathname === "/my-cv" ? "navActive " : "navNotActive "}>
                                                <Link href={"/my-cv"}>My Resume</Link>
                                            </li>
                                            <li className={` ${pathname === "/profile" ? "navActive  " : "navNotActive "} relative group `}>
                                                <Link href={`/profile`} >
                                                    <RxAvatar className="text-3xl text-sky-500 flex justify-center items-center"/>
                                                </Link>
                                                <ul className={"absolute top-7 -right-12 bg-[#F4F4F4] w-[220px] rounded-md hidden group-hover:flex flex-col gap-y-2  p-4 my-transition border border-gray-300 "}>
                                                    <li className={"capitalize hover:bg-gray-300 my-transition py-2 text-xl font-semibold text-[#FF8C00] text-center"}>
                                                        <Link href={"/profile"} >{data?.full_name}</Link>
                                                    </li>
                                                    <li className={pathname === "/my-cv" ? "navActive " : "py-2 navNotActive " +"text-center py-2 hover:bg-gray-300 my-transition -mt-2"}>
                                                        <Link href={"/my-cv"} className={"!text-center"}>My Resume</Link>
                                                    </li>
                                                    <li onClick={handleLogOUt}
                                                        className="capitalize bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 my-transition w-full text-center">
                                                        log out
                                                    </li>

                                                </ul>
                                            </li>


                                        </>
                                    ) : (
                                        <>
                                            <li className={`${pathname === "/user/login" ? "navActive " : "navNotActive "}`}>
                                                <Link className={"bg-blue-500 py-2 px-6 text-white"} href={"/user/login"}>login</Link>
                                            </li>
                                            <li className={pathname === "/user/registetion" ? "navActive " : "navNotActive "}>
                                                <Link href={"/user/registetion"}>registration </Link>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </nav>
                        <div className="block lg:hidden">
                            <div className={`items-center gap-4 px-[10px] ${sidebar ? "hidden": "flex"} `}>
                                <span
                                    onClick={sidebarControl}
                                    className="rounded-full border border-[#919295] p-[10px] text-[25px] "
                                >
                                  <BiMenuAltRight className="text-black " />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`sidebar fixed ${sidebar ? "bg-opacity-75 left-0 " : "left-[100%] bg-opacity-0 "} my-transition bg-gray-700 top-0 z-[9999] h-full w-full`} onClick={() => setSidebar(false)}>
                <div className="ml-auto w-[300px] py-5 pl-6 lg:hidden relative z-0   ">
                    <menu
                        className="items-center absolute top-4 py-10 rounded-l-lg px-4 bg-white w-full z-10 my-transition  shadow-xl">
                        <div className="relative flex justify-center text-blue-600 ">
                            <span onClick={sidebarControl}
                                  className="group z-20 absolute -top-9 right-3 rounded-full bg-card  p-[8px]  text-[26px] border-[1px] border-gray-500 hover:border-blue-500 ">
                              <FaXmark
                                  className="text-gray-700 my-transition group-hover:rotate-90 group-hover:text-theme"/>
                            </span>
                        </div>

                        <ul className="grid gap-[20px] text-center" >
                            {token ? (
                                <>
                                    <li className={pathname === "/profile" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                        <Link href={"/profile"} className={"text-[#FF8C00]"}>{data?.full_name}</Link>
                                    </li>

                                    <li className={pathname === "/my-cv" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                        <Link href={"/my-cv"}>My Resume</Link>
                                    </li>

                                    <li onClick={handleLogOUt}
                                        className="capitalize bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 my-transition w-full text-center">
                                        log out
                                    </li>

                                </>
                            ) : (
                                <>
                                    <li className={pathname === "/" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                        <Link href={"/"}>Home</Link>
                                    </li>

                                    <li className={pathname === "/about" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                        <Link href={"/about"}>About us</Link>
                                    </li>
                                    <li
                                        className={pathname === "/blog" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                        <Link href={"/user/login"}>login</Link>
                                    </li>
                                    <li className={pathname === "/registration" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                        <Link href={`/user/registration`}>registration </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </menu>
                </div>
            </div>
        </section>
    );
};

export default NavBar;