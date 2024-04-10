'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {BiMenuAltRight} from "react-icons/bi";
import {usePathname} from "next/navigation";
import {FaXmark} from "react-icons/fa6";
import cookies from "js-cookie";
import {RxAvatar} from "react-icons/rx";

const NavBar = () => {
    const pathname = usePathname();
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
    const sidebarControl = () => {
        setSidebar(!sidebar);
    };
    return (
        <section>
            <header className="relative z-[999] bg-gray-100  ">
                <div className="container">
                    <div className=" flex justify-between rounded-[10px] bg-card py-5">
                        <div className="logo flex items-center ">
                            <Link href={"/"}>
                                <strong className='font-bold text-sky-500 text-3xl'>resume</strong>
                            </Link>
                        </div>
                        <menu className="hidden items-center lg:flex">
                            <ul className="flex  gap-x-[30px] gap-y-4">
                                <li className={pathname === "/" ? "navActive " : "navNotActive "}>
                                    <Link href={"/"}>Home</Link>
                                </li>
                                <li className={pathname === "/service" ? "navActive " : "navNotActive "}>
                                    <Link href={"/service"}>Service</Link>
                                </li>
                                <li className={pathname === "/about" ? "navActive " : "navNotActive "}>
                                    <Link href={"/about"}>About Us</Link>
                                </li>
                                {
                                    token ?(
                                        <>
                                            <li className={pathname === "/user/login" ? "navActive  " : "navNotActive "}>
                                                <RxAvatar  size={30} className="text-sky-500 flex justify-center items-center"/>
                                            </li>

                                        </>
                                    ):(
                                        <>
                                            <li className={pathname === "/user/login" ? "navActive " : "navNotActive "}>
                                                <Link href={"/user/login"}>login</Link>
                                            </li>
                                            <li className={pathname === "/user/registetion" ? "navActive " : "navNotActive "}>
                                                <Link href={"/user/registetion"}>registration </Link>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </menu>
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
                }  top-0 z-[9999]  h-full w-full bg-btn/60 transition-all duration-500`}
            >
                <div className="ml-auto h-full min-h-[750px] w-[300px] bg-card py-5 pt-[60px] md:min-h-[700px]">
                    <div className="relative flex justify-center">
                        <span onClick={sidebarControl} className="group absolute left-[-78px] rounded-lg bg-card   px-[15px] py-[10px] text-[26px]">
                          <FaXmark className="text-white  transition-all duration-500  group-hover:rotate-90 group-hover:text-theme" />
                        </span>
                    </div>
                    <div className="my-[30px] border-t border-[#ddd] "></div>
                    <menu className=" items-center lg:hidden">
                        <ul className="grid  gap-[20px]">
                            <li className={pathname === "/" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                <Link href={"/"}>Home</Link>
                            </li>
                            <li className={pathname === "/service" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                <Link href={"/service"}>Service</Link>
                            </li>
                            <li className={pathname === "/about" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                <Link href={"/about"}>About</Link>
                            </li>
                            <li
                                className={pathname === "/blog" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                <Link href={"/login"}>login</Link>
                            </li>
                            <li className={pathname === "/registration" ? "navActive text-[20px]" : "navNotActive text-[20px]"}>
                                <Link href={"/registration"}>registration </Link>
                            </li>
                        </ul>
                    </menu>
                </div>
            </div>
        </section>
    );
};

export default NavBar;