'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Create, Get} from "@/utility/APIHelper";
import {Toaster} from "react-hot-toast";
import {MdAdd, MdDelete} from "react-icons/md";
import Link from "next/link";
import {FaRegEdit} from "react-icons/fa";
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {ErrToast, IsEmpty, Successtoast} from "@/utility/FromHelper";
import {ErrAlert, SuccessAlert, SweetAlert} from "@/utility/SweetAlert";
import NextStep from "@/components/ChildComponents/NextStep";


const EducationComponent = () => {
    const [data,setData] = useState([])
    const [hidden,setHidden] = useState(false)
    const [submit,setSubmit] = useState(false);
    const [endDate ,setEndDate] = useState(false)
    let  school_nameRef, degreeRef, start_dateRef,end_dateRef = useRef();

    const getData =async () => {
        Get("/api/my-cv/education/read-all").then((res)=>{
            if(res?.status === true){
                setData(res?.data );
            }})
    }

    useEffect( ()=>{
         getData()
    },[])


    const educationSubmit =async () => {
        setSubmit(true)
        const data= {
            school_name: school_nameRef.value,
            degree: degreeRef.value,
            start_date: start_dateRef.value,
            end_date: end_dateRef.value
        }
        if(IsEmpty(data.school_name)){
            ErrToast("Company name is required");
            setSubmit(false);
        }else if(IsEmpty(data.degree)){
            ErrToast("Designation is required");
            setSubmit(false);
        }else if(IsEmpty(data.start_date)){
            ErrToast("Start date is required");
            setSubmit(false);
        }else if(IsEmpty(data.end_date)){
            ErrToast("End date is required");
            setSubmit(false);
        }else{
            Create("/api/my-cv/education/create",data)
                .then((res)=>{
                    if(res?.status === true){
                        getData();
                        SuccessAlert("Created Success")
                        setSubmit(false);
                        setHidden(false);
                        school_nameRef.value = "";
                        degreeRef.value = "";
                        start_dateRef.value = "";
                        end_dateRef.value = "";
                        endDate === true ? setEndDate(false) :setEndDate(false);
                    }})
                .catch((e)=>{
                    ErrAlert("Please try again");
                    setSubmit(false)
                })}
    }


    const DeleteEducation = (id) => {
            SweetAlert(`/api/my-cv/education/delete?id=${id}`)
                .then(async (res)=>{
                    if(res){
                    await getData()
                            .then((res)=>{
                               if(res?.status === true){
                                   SuccessAlert("Delete Success")
                                   setData(res?.data)
                           }})
                    }})
    }
    return (
        <section className="py-10 px-6 bg-gray-50">
            <div className="container flex justify-center items-center w-full flex-col gap-y-10">
                <Toaster position="top-center" reverseOrder={false} />
                <h1 className="text-2xl md:text-3xl border-b-2 border-b-blue-200 rounded-b-xl w-full pb-5 font-medium text-black capitalize text-center block">Your All educations </h1>
                <div className={"flex w-full flex-col gap-y-4"}>
                    {
                        data?.map((item,id)=>(
                            <div key={id} className="flex flex-col gap-y-2 p-2 sm:p-4 md:p-6 w-full  bg-gray-100 rounded-lg shadow py-3.5 border-[.2px] border-sky-200">
                                <h1 className="text-xl font-medium capitalize">{item?.school_name} </h1>
                                <h1 className="text-lg  font-medium capitalize">{item?.degree} </h1>
                                <div className="flex items-center gap-x-4 flex-wrap gap-y-4">
                                    <p className="text-base text-gray-800">
                                        <span className="font-medium capitalize text-gray-900">start</span> : {item?.start_date}
                                    </p>
                                    <p className="text-base text-gray-800">
                                        <span className="font-medium capitalize text-gray-900">end</span> : {item?.end_date}
                                    </p>
                                </div>
                                <p className="text-base text-gray-600  text-blac">{item?.des}</p>
                                <div className="flex gap-x-2 mt-3">
                                    <button className="btn w-fit h-fit bg-red-500 hover:text-red-500 border-red-500 hover:bg-transparent  flex justify-center items-center"
                                            onClick={()=> DeleteEducation(item?.id)} >
                                        <MdDelete size={18} />
                                    </button>
                                    <Link href={`/my-cv/education/update?id=${item?.id}`} className="btn w-fit h-fit p-3.5 flex justify-center items-center ml-8">
                                        <FaRegEdit size={15}  />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                    <div className={hidden ?"hidden ":"flex flex-col mt-2"}>
                        <button className="btnBG mx-auto flex px-16 justify-center items-center " type="submit" onClick={()=> setHidden(true)}>
                            <MdAdd size={25} className="mr-2"/>
                            add new education
                        </button>
                    </div>
                </div>
                <div className={hidden ?" flex justify-center items-center flex-col gap-y-3.5 bg-white shadow  px-2 sm:px-6 md:px-8 py-8 w-full md:min-w-[800px] border-[.1px] border-sky-200 rounded-lg":"hidden "}>
                    <h1 className={"mt-3 capitalize text-black text-2xl md:text-3xl mb-6 font-bold"}>Add new education</h1>
                    <div className="w-full">
                        <label className="inputLabel ">School Name</label>
                        <input type="text"
                               className="inputFiled capitalize"
                               ref={(input) => school_nameRef= input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel ">Degree</label>
                        <input
                            type="text"
                            className="inputFiled capitalize"
                            ref={(input)=> degreeRef = input}
                        />
                    </div>
                    <div className="flex gap-x-4 gap-y-5 flex-col md:flex-row w-full">
                        <div className="">
                            <label className="inputLabel">start Data</label>
                            <input
                                type="date"
                                className="inputFiled rounded"
                                ref={(input)=> start_dateRef = input}
                            />
                        </div>

                        <div className="flex justify-start mt-4 sm:mt-9 ">
                            <input
                                type="checkbox"
                                checked={endDate}
                                className="w-6 h-6 rounded"
                                onClick={()=> setEndDate(!endDate)}
                            />
                            <label  className={endDate?"ml-2 text-lg font-medium text-blue-500":"ml-2 text-lg font-medium text-gray-700"}>Going On </label>
                        </div>



                        <div className={endDate ? "":""}>
                            <label className="inputLabel">end Data</label>
                            <input
                                type={endDate ? "text":"date"}
                                value={endDate ? "Going On":end_dateRef.value}
                                disabled={endDate}
                                className={endDate ? " inputFiled border-red-300 outline-none cursor-not-allowed rounded":"inputFiled rounded-lg capitalize"}
                                ref={(input)=> end_dateRef = input}
                            />
                        </div>

                    </div>

                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"Add new education"} submit={submit} onClick={educationSubmit} />
                        <button className={"btnBG px-5 md:px-10 "} onClick={()=> setHidden(false)}>Cancel</button>
                    </div>
                </div>

            </div>
            <NextStep  href="/my-cv/skill" value="go to add skill" />
        </section>
    );
};

export default EducationComponent;