'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {BiMenuAltRight} from "react-icons/bi";
import {usePathname, useRouter} from "next/navigation";
import {FaXmark} from "react-icons/fa6";
import cookies from "js-cookie";
import {RxAvatar} from "react-icons/rx";

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const [sidebar, setSidebar] = useState(false);
    const [token,setToken] = useState(null);

    useEffect( () => {
        const myToken = cookies.get("token");

        if(myToken){
            setToken(myToken);
        }else{
            setToken(null);
        }
    },[])

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
                                <strong className='font-bold text-sky-500 text-3xl'>resume</strong>
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
                                                <Link href={"/my-cv"}>My CV</Link>
                                            </li>
                                            <li className={` ${pathname === "/profile" ? "navActive  " : "navNotActive "} relative group `}>
                                                <Link href={`/profile`} >
                                                    <RxAvatar className="text-2xl text-sky-500 flex justify-center items-center"/>
                                                </Link>
                                                <ul className={"absolute top-8 -right-1/2 bg-[#F4F4F4] w-[200px] hidden group-hover:flex flex-col gap-y-4 p-4 my-transition border border-gray-400 "}>
                                                    <li className={"capitalize text-xl font-semibold text-sky-600 hover:bg-gray-200 px-4 py-2 my-transition"}>jone
                                                        due
                                                    </li>
                                                    <li onClick={handleLogOUt}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 my-transition w-full text-center">
                                                        logout
                                                    </li>
                                                    <li className={pathname === "/service" ? "navActive !uppercase" : "navNotActive !uppercase"}>
                                                        <Link href={"/my-cv"}>my-cv</Link>
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
                            <div className="flex items-center gap-4	 px-[10px]">
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
            <div
                className={`sidebar fixed ${
                    sidebar ? "left-0" : "left-[100%]"
                }  top-0 z-[9999] bg-transparent h-full w-full bg-btn/60 transition-all `}
            >
                <div className="ml-auto w-[300px] py-5 pl-6 lg:hidden relative z-0  ">
                    <div className="relative flex justify-center text-blue-600 ">
                        <span onClick={sidebarControl} className="group z-20 absolute -top-3 right-2 rounded-full bg-card  p-[12px]  text-[26px] border-[1px] border-gray-500 hover:border-blue-500 ">
                          <FaXmark className="text-gray-700 transition-all duration-500 group-hover:rotate-90 group-hover:text-theme" />
                        </span>
                    </div>
                    <menu className=" items-center absolute top-0 pt-14 pb-20 rounded-l-lg px-4 bg-white w-full z-10 duration-500 shadow-xl">
                        <ul className="grid  gap-[20px]">
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
                        </ul>
                    </menu>
                </div>
            </div>
        </section>
    );
};

export default NavBar;