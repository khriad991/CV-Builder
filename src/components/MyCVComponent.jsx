
'use client'
import React, {useEffect, useState} from 'react';
import {Get} from "@/utility/APIHelper";
import Link from "next/link";
import {useRouter} from "next/navigation";
import JsPDF from "jspdf";
import {MdDelete, MdFullscreen} from "react-icons/md";
import {IoIosAddCircle, IoMdDownload} from "react-icons/io";
import {ErrToast } from '@/utility/FromHelper';
import {RiEdit2Fill} from "react-icons/ri";
import {FaRegEdit } from "react-icons/fa";
import {SuccessAlert} from "@/utility/SweetAlert";



const MyCvComponent = () => {
    const router = useRouter();
    const [hidden,setHidden] = useState(false)
    const [user ,setUser] = useState([])
    const [skill ,setSkill] = useState([])
    const [work ,setWork] = useState([])
    const [project ,setProject] = useState([])
    const [education ,setEducation] = useState([])
    
    useEffect(()=>{
        Get("/api/my-cv/cv").then((res)=>{
            if(res?.status === true){
                // user data set
                setUser(res?.data[0]?.user)
                setHidden(!hidden)

                // for Project data set
                if(res?.data[0]?.project.length >= 1){
                    setProject(res?.data[0]?.project)
                }else {
                    router.push("/my-cv/project")
                   return  SuccessAlert("Add some Project" , "info")
                }
                    
                // for Skill data set
                if(res?.data[0]?.skill.length >= 1){
                    setSkill(res?.data[0]?.skill)
                }else {
                    router.push("/my-cv/skill")
                    return ErrToast("Add some Skill");
                }

                // for work_experiance data set
                if(res?.data[0]?.work.length >= 1){
                    setWork(res?.data[0]?.work)
                }else {
                    router.push("/my-cv/work")
                    return ErrToast("add some Wrok Expreriance");
                }

                // for education data set
                if(res?.data[0]?.education.length >= 1){
                    setEducation(res?.data[0]?.education)
                }else {
                    router.push("/my-cv/education")
                    return ErrToast("add some Wrok Education");
                }
            }
        })



    },[])

    /// all vriable for jsPDF ---------------

    const doc = new JsPDF();

    // Fetch user data for PDF content
    const { full_name, email, mobile,git,linkdin,country } = user;


    let Yspace = 10;
    let Xspace =  15;
    // set font fontSize
    let title =16; // 18
    let subTitle = 14; // 16
    let normal = 12  // 13

    // for font color
    let black = "#000"
    let gray = "#454545"
    let link = "#333333"
    const generateCvPdf = () => {

        // Add User Information Section
        doc.setFont("helvetica", "normal")
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text(`${full_name}`, Xspace, Yspace );

        doc.setFont("times")
        doc.setFontSize(normal)
        doc.setTextColor(gray)
        doc.text(`Country: ${country}`, Xspace, Yspace += 7);
        doc.text(email, Xspace, Yspace += 6);
        doc.text(`|| ${mobile}`, Xspace + 44, Yspace);

        doc.setTextColor(link)
        doc.setDrawColor(link)
        doc.setLineWidth(.2);
        let linkdinLet = doc.textWithLink(`Linkedin`, Xspace, Yspace += 6, { url: linkdin});
        doc.line(Xspace, Yspace + .7, Xspace + linkdinLet, Yspace +.7  );

        let gitHubLet =  doc.textWithLink(`GitHub`, Xspace+= 20, Yspace, { url: git });
        doc.setLineWidth(0.2);
        doc.line(Xspace, Yspace +.7, Xspace + gitHubLet, Yspace +.7);

        // set work experience information
        let width = doc.internal.pageSize.getWidth();

        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("work experience", Xspace -=20, Yspace +=9 );
        doc.setLineWidth(0.05);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line

        work.forEach(function(workItem) {

            doc.setFontSize(title)
            doc.setTextColor(black)
            doc.text(workItem.company_name, Xspace, Yspace +=8  );

            doc.setFont("times", "medium")
            doc.setFontSize(subTitle)
            doc.text(workItem?.designation, Xspace, Yspace +=5 );
            // Add start date and end date
            doc.setTextColor(gray)
            doc.setFontSize(normal)
            doc.text("Start Date: " , Xspace, Yspace +=6)
            doc.text(workItem?.start_date, Xspace + 20, Yspace );
            doc.text("End Date: " , Xspace + 50, Yspace)
            doc.text( workItem?.end_date, Xspace + 70, Yspace );

        });

        // for Skil information data set -------------------------->>>
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("Skill", Xspace , Yspace +=9 );
        doc.setLineWidth(.1);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line

        // Yspace +=2
        skill?.forEach(function(item) {
            doc.setTextColor(black)
            doc.setFontSize(subTitle)
            doc.text(item?.title, Xspace, Yspace +=5.5  );
            doc.setTextColor(gray)
            doc.setFontSize(normal)
            doc.text(item?.range, Xspace + 50, Yspace);

        });

        // set for Project informetino data
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("Project", Xspace , Yspace +=9 );
        doc.setLineWidth(.1);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line ---------------


        project?.forEach(function(item) {

            doc.setFontSize(subTitle)
            doc.setTextColor(black)
            doc.text(item?.name, Xspace, Yspace +=9  );

            doc.setFontSize(normal)
            doc.setTextColor(link)
            doc.setDrawColor(link)
            doc.setLineWidth(.1);
            let LiveLink = doc.textWithLink(`Live Link`, Xspace, Yspace += 6, { url: item?.live_link});
            doc.line(Xspace, Yspace + .7, Xspace + LiveLink, Yspace +.7  );

            let SourceCode =  doc.textWithLink(`Source Code `, Xspace+= 25, Yspace, { url: item?.github_link });
            doc.setLineWidth(0.1);
            doc.line(Xspace, Yspace  + .7, Xspace + SourceCode, Yspace+.7);
            // Add start date and end date
            Xspace -=25
            // doc.text(item?.des, Xspace, Yspace +=6)
            let lines = doc.splitTextToSize(item?.des, 185)

            lines.forEach((line, index) =>{
                Yspace +=2
                doc.setFontSize(normal)
                doc.setTextColor(gray)
                doc.text(line, Xspace, Yspace +=(index + 4.5)); // Increase Yspace by the desired line height (here, 6)
                Yspace -=2
            });

        });
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("Education", Xspace , Yspace +=9 );
        doc.setLineWidth(.09);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line ---------------


        education?.forEach((item)=>{

            doc.setFontSize(subTitle)
            doc.setTextColor(black)
            doc.text(item?.school_name, Xspace, Yspace +=8  );
            doc.text(item?.degree, Xspace, Yspace +=7 );
            doc.setTextColor(gray)
            doc.setFontSize(normal)
            doc.text("start Date: " , Xspace, Yspace +=6)
            doc.text(item?.start_date, Xspace + 20, Yspace );
            doc.text("end Date: " , Xspace + 50, Yspace)
            doc.text( item?.end_date, Xspace + 70, Yspace );

        })


        doc.save(full_name +".pdf");

        // doc.save(`${full_name}.pdf`); // Set the filename for download
    };

    const generateViewPdf = () => {

        // Fetch user data for PDF content
        // const { full_name, email, mobile,git,linkdin,country } = user;
/*
        let Yspace = 10;
        let Xspace =  15;
        // set font fontSize
        let title =16; // 18
        let subTitle = 14; // 16
        let normal = 12  // 13

        // for font color
        let black = "#000"
        let gray = "#454545"
        let link = "#333333"*/

        // Add User Information Section
        doc.setFont("helvetica", "normal")
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text(`${full_name}`, Xspace, Yspace );

        doc.setFont("times")
        doc.setFontSize(normal)
        doc.setTextColor(gray)
        doc.text(`Country: ${country}`, Xspace, Yspace += 7);
        doc.text(email, Xspace, Yspace += 6);
        doc.text(`|| ${mobile}`, Xspace + 44, Yspace);

        doc.setTextColor(link)
        doc.setDrawColor(link)
        doc.setLineWidth(.2);
        let linkdinLet = doc.textWithLink(`Linkedin`, Xspace, Yspace += 6, { url: linkdin});
        doc.line(Xspace, Yspace + .7, Xspace + linkdinLet, Yspace +.7  );

        let gitHubLet =  doc.textWithLink(`GitHub`, Xspace+= 20, Yspace, { url: git });
        doc.setLineWidth(0.2);
        doc.line(Xspace, Yspace +.7, Xspace + gitHubLet, Yspace +.7);

        // set work experience information
        let width = doc.internal.pageSize.getWidth();

        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("work experience", Xspace -=20, Yspace +=9 );
        doc.setLineWidth(0.05);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line

        work.forEach(function(workItem) {

            doc.setFontSize(title)
            doc.setTextColor(black)
            doc.text(workItem.company_name, Xspace, Yspace +=8  );

            doc.setFont("times", "medium")
            doc.setFontSize(subTitle)
            doc.text(workItem?.designation, Xspace, Yspace +=5 );
            // Add start date and end date
            doc.setTextColor(gray)
            doc.setFontSize(normal)
            doc.text("Start Date: " , Xspace, Yspace +=6)
            doc.text(workItem?.start_date, Xspace + 20, Yspace );
            doc.text("End Date: " , Xspace + 50, Yspace)
            doc.text( workItem?.end_date, Xspace + 70, Yspace );

        });

        // for Skil information data set -------------------------->>>
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("Skill", Xspace , Yspace +=9 );
        doc.setLineWidth(.1);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line

        // Yspace +=2
        skill?.forEach(function(item) {
            doc.setTextColor(black)
            doc.setFontSize(subTitle)
            doc.text(item?.title, Xspace, Yspace +=5.5  );
            doc.setTextColor(gray)
            doc.setFontSize(normal)
            doc.text(item?.range, Xspace + 50, Yspace);

        });

        // set for Project informetino data
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("Project", Xspace , Yspace +=9 );
        doc.setLineWidth(.1);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line ---------------


        project?.forEach(function(item) {

            doc.setFontSize(subTitle)
            doc.setTextColor(black)
            doc.text(item?.name, Xspace, Yspace +=9  );

            doc.setFontSize(normal)
            doc.setTextColor(link)
            doc.setDrawColor(link)
            doc.setLineWidth(.1);
            let LiveLink = doc.textWithLink(`Live Link`, Xspace, Yspace += 6, { url: item?.live_link});
            doc.line(Xspace, Yspace + .7, Xspace + LiveLink, Yspace +.7  );

            let SourceCode =  doc.textWithLink(`Source Code `, Xspace+= 25, Yspace, { url: item?.github_link });
            doc.setLineWidth(0.1);
            doc.line(Xspace, Yspace  + .7, Xspace + SourceCode, Yspace+.7);
            // Add start date and end date
        Xspace -=25
            // doc.text(item?.des, Xspace, Yspace +=6)
            let lines = doc.splitTextToSize(item?.des, 185)

            lines.forEach((line, index) =>{
                Yspace +=2
                doc.setFontSize(normal)
                doc.setTextColor(gray)
                doc.text(line, Xspace, Yspace +=(index + 4.5)); // Increase Yspace by the desired line height (here, 6)
                Yspace -=2
            });

        });
        doc.setFontSize(title)
        doc.setTextColor(black)
        doc.text("Education", Xspace , Yspace +=9 );
        doc.setLineWidth(.09);
        doc.line(Xspace, Yspace +=3 , width  , Yspace); // full width draw line ---------------


        education?.forEach((item)=>{

            doc.setFontSize(subTitle)
            doc.setTextColor(black)
            doc.text(item?.school_name, Xspace, Yspace +=8  );
            doc.text(item?.degree, Xspace, Yspace +=7 );
            doc.setTextColor(gray)
            doc.setFontSize(normal)
            doc.text("start Date: " , Xspace, Yspace +=6)
            doc.text(item?.start_date, Xspace + 20, Yspace );
            doc.text("end Date: " , Xspace + 50, Yspace)
            doc.text( item?.end_date, Xspace + 70, Yspace );

        })


        window.open(doc.output('bloburl'), '_blank');

    }

    return (
        <section className={hidden ? "bg-sky-50 bg-opacity-25 py-8":"hidden"}>
            <div className="container bg-gray-300 p-3 ">
                <div className="flex justify-between py-2 my-3">
                    <button type="submit" className="btn flex justify-center items-center gap-x-4" onClick={generateCvPdf}><IoMdDownload size={25} /> Download CV</button>
                    <button type="submit" className="btnBG flex justify-center items-center gap-x-4" onClick={generateViewPdf}><MdFullscreen size={25}/> View CV</button>
                </div>
                <div className=" flex flex-col p-6 w-[850px] bg-white  ">

                    <div className={"hover:bg-gray-100 my-transition p-3 relative flex flex-col border-[1px] border-transparent hover:border-blue-200 rounded-lg"}>
                        <h1 className="cv-title font-bold mb-2 ">{user?.full_name}</h1>
                        <div className="flex items-center gap-2">
                            <span className="cv-subTitle">Email :</span>
                            <p className="text-sm"> {user?.email}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="cv-subTitle">Phone :</span>
                            <p className="text-sm"> {user?.mobile}</p>
                        </div>

                        <div className="flex gap-x-4">
                            <Link className="cursor-pointer underline capitalize text-black text-sm" target="_blank" href={`${user?.linkdin}`}> Linkdin </Link>
                            <Link className="cursor-pointer underline capitalize text-black text-sm" target="_blank" href={`${user?.git}`}> github </Link>
                        </div>
                        <Link className="cvlink btn w-fit absolute top-[35%] !right-4 " href={"/my-cv/profile"}><RiEdit2Fill /> </Link>
                    </div>
                    <div className={"p-3 "}>
                        <div className="py-1 w-full border-b-[.5px] border-b-gray-300">
                            <h1 className="cv-title">skill</h1>
                        </div>
                        <div className=" flex flex-col  gap-y-1 mt-2">
                            {
                                skill?.map((item)=>(
                                    <div className="flex justify-start gap-x-1.5 group relative hover:bg-gray-200 py-2 px-3 -mx-3 rounded  " key={item?.id}>
                                        <h1 className="cv-subTitle mr-2.5 -my-2" >{item?.title}</h1>
                                        <p className="-my-2">{item?.range}</p>

                                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-row  gap-y-5 group-my-transtion gap-x-2 absolute right-3 top-1/2 -translate-y-1/2">
                                            <button className="text-red-500 cursor-pointer" >
                                                <title>Delete Skill</title>
                                                <MdDelete size={20} />
                                            </button>
                                            <Link href={`/my-cv/skill`} className=" text-green-400">
                                                <IoIosAddCircle   size={20}  />
                                            </Link>
                                            <Link href={`/my-cv/skill/update?id=${item?.id}`} className="text-blue-500 ">
                                                <FaRegEdit size={20}  />
                                            </Link>

                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className="work">
                        <div className="py-1.5 w-full border-b-[.5px] border-b-gray-300">
                            <h1 className="cv-title px-3">Work Experiance</h1>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {
                                work?.map((item)=>(
                                    <div className="flex flex-col group relative px-3 hover:bg-gray-100 hover:shadow my-transition rounded py-1.5 last:-mt-2" key={item?.id}>
                                        <h1 className="cv-subTitle">{item?.company_name}</h1>
                                        <h1 className="text-black font-medium mr-2">{item?.designation}</h1>
                                        <div className="flex flex-row gap-x-3">
                                            <p className="text-sm">Start At : {item?.start_date}</p>
                                            <p className="text-sm">End : {item?.end_date}</p>
                                        </div>
                                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col gap-y-auto  group-my-transtion gap-x-2 absolute right-3 top-1/2 -translate-y-1/2">
                                            <button className="text-red-500 cursor-pointer hover:text-red-700">
                                                <MdDelete size={20} />
                                            </button>
                                            <Link href={`/my-cv/work`} className="text-sky-500 cursor-pointer hover:text-sky-700 my-transition ">
                                                <IoIosAddCircle   size={20}  />
                                            </Link>
                                            <Link href={`/my-cv/work/update?id=${item?.id}`} className="text-blue-400 cursor-pointer hover:text-blue-700 my-transition ">
                                                <FaRegEdit size={20}  />
                                            </Link>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={"project"}>
                        <div className="py-1.5 w-full border-b-[.5px] border-b-gray-300">
                            <h1 className="cv-title px-3">project</h1>
                        </div>
                        <div className="flex flex-col gap-y-2 mt-1">
                            {
                                project?.slice(0, 3).map((item)=>(
                                    <div className="flex flex-col px-3 relative group " key={item?.id}>
                                        <h1 className="cv-subTitle">{item?.name}</h1>
                                        <div className="flex gap-x-4">
                                            <Link className="text-base cursor-pointer underline capitalize text-black" target="_blank" href={`${user?.live_link}`}> live Link </Link>
                                            <Link className="text-base cursor-pointer underline capitalize text-black" target="_blank" href={`${user?.github_link}`}> Source Code </Link>
                                        </div>
                                        <p className="text-sm pr-6 text-justify mt-1 md:pr-12">{item?.des}</p>
                                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col gap-y-5 group-my-transtion gap-x-2 absolute right-3 top-1/2 -translate-y-1/2">
                                            <button className="bg-red-500 text-white p-1.5 w-fit h-fit hover:text-red-500 border-[1px] rounded border-red-500 hover:bg-transparent my-transition flex justify-center items-center">
                                                <MdDelete size={12} />
                                            </button>
                                            <Link href={`/my-cv/project/update?id=${item?.id}`} className="bg-transparent text-blue-500 hover:text-white p-1.5 w-fit h-fit hover:bg-blue-500 border-[1px] rounded border-blue-500 hover:border-transparent  hover:bg-transparent my-transition flex justify-center items-center">
                                                <FaRegEdit size={12}  />
                                            </Link>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* education section*/}
                    <div className={"education "} >
                        <div className="py-1.5 w-full border-b-[.5px] border-b-gray-300 mb-1.5">
                            <h1 className="cv-title px-3">Education</h1>
                        </div>
                        <div className="flex flex-col gap-y-2 mt-2">
                            {
                                education?.slice(0, 2).map((item)=>(
                                    <div className="flex flex-col relative group px-3 py-3 rounded-md hover:bg-gray-200 last:-mt-5" key={item?.id}>
                                        <h1 className="cv-subTitle">{item?.school_name}</h1>
                                        <h1 className="cv-subTitle uppercase">{item?.degree}</h1>
                                        <div className="flex gap-x-6">
                                            <div className="flex gap-x-4 ">
                                                <p className="text-sm">Start Date</p>
                                                <p className="text-sm" >{item?.start_date}</p>
                                            </div>
                                            <div className="flex gap-x-4 ">
                                                <p  className="text-sm">End Date</p>
                                                <p  className="text-sm">{item?.end_date}</p>
                                            </div>
                                        </div>

                                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col gap-y-auto  group-my-transtion gap-x-2 absolute right-3 top-1/2 -translate-y-1/2">
                                            <button className="text-red-500 cursor-pointer hover:text-red-700">
                                                <MdDelete size={20} />
                                            </button>
                                            <Link href={`/my-cv/education`} className="text-sky-500 cursor-pointer hover:text-sky-700 my-transition ">
                                                <IoIosAddCircle   size={20}  />
                                            </Link>
                                            <Link href={`/my-cv/education/update?id=${item?.id}`} className="text-blue-400 cursor-pointer hover:text-blue-700 my-transition ">
                                                <FaRegEdit size={20}  />
                                            </Link>

                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyCvComponent;