'use client'
import React, {useEffect, useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {ErrToast, IsEmpty} from "@/utility/FromHelper";
import {Create, Get, Update} from "@/utility/APIHelper";
import {ErrAlert, SuccessAlert} from "@/utility/SweetAlert";
import {useRouter} from "next/navigation";
import Link from "next/link";

const UpdateEducationComponents = ({id}) => {
    const router = useRouter();
    const [data,setData ] = useState([])
    const [submit,setSubmit] = useState(false);
    const [endDate ,setEndDate] = useState(false)
    let  school_nameRef, degreeRef, start_dateRef,end_dateRef = useRef();

    useEffect( ()=>{
        Get(`/api/my-cv/education/read?id=${id}`).then((res)=>{
            if(res?.status){
                setData(res?.data)
                if(res?.data.end_date === "Going On"){
                    setEndDate(true)
                }else {
                    setEndDate(false)
                }
            }
        })

    },[])



    const educationUpdateSubmit =async () => {
        setSubmit(true)
        const data= {
            school_name: school_nameRef.value,
            degree: degreeRef.value,
            start_date: start_dateRef.value,
            end_date:end_dateRef.value
        }
        if(IsEmpty(data.school_name)){
            setSubmit(false);
            return ErrToast("Company name is required");
        }else if(IsEmpty(data.degree)){
            setSubmit(false);
            return ErrToast("Designation is required");
        }else if(IsEmpty(data.start_date)){
            setSubmit(false);
            return ErrToast("Start date is required");
        }else if(IsEmpty(data.end_date)){
            setSubmit(false);
            return ErrToast("End date is required");
        }else{
            Update(`/api/my-cv/education/update?id=${id}`,data).then((res)=>{
                if(res?.status === true){
                    SuccessAlert("Update Success")
                    setSubmit(false);
                    router.back()
                }

            }).catch((e)=>{
                ErrAlert("Please try again");
                ErrToast(e);
                setSubmit(false);
            })
        }
    }






    return (
        <section className="bg-sky-50 h-screen w-screen">
            <div className="container mx-auto flex justify-center items-center w-full h-full">
                <div className=" flex justify-center items-center flex-col gap-y-3.5 bg-white shadow  px-2 sm:px-6 md:px-8 py-8 w-full md:max-w-[750px] border-[.1px] border-sky-200 rounded-lg">
                    <h1 className={"mt-3 capitalize text-black text-2xl  md:text-3xl mb-6 font-bold"}>update education</h1>
                    <div className="w-full">
                        <label className="inputLabel ">School Name</label>
                        <input type="text"
                               className="inputFiled capitalize"
                               defaultValue={data?.school_name}
                               ref={(input) => school_nameRef= input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel ">Degree</label>
                        <input
                            type="text"
                            className="inputFiled capitalize"
                            defaultValue={data?.degree}
                            ref={(input)=> degreeRef = input}
                        />
                    </div>
                    <div className="flex gap-x-4 gap-y-5 flex-col md:flex-row w-full">
                        <div className="">
                            <label className="inputLabel">start Data</label>
                            <input
                                type="date"
                                className="inputFiled rounded"
                                defaultValue={data?.start_date}
                                ref={(input)=> start_dateRef = input}
                            />
                        </div>

                        <div className="flex justify-start mt-4 sm:mt-9 ">
                            <input
                                type="checkbox"
                                defaultChecked={endDate}
                                className="w-6 h-6 rounded"
                                onChange={()=> setEndDate(!endDate)}
                            />
                            <label  className={endDate?"ml-2 text-lg font-medium text-blue-500":"ml-2 text-lg font-medium text-gray-700"}>Going On </label>
                        </div>

                        <div >
                            <label className="inputLabel">end Data</label>
                            <input
                                type={endDate ? "text":"date"}
                                defaultValue={endDate ? "Going On":data?.end_date}
                                disabled={endDate}
                                className={endDate ? " inputFiled border-blue-300 outline-none cursor-not-allowed rounded-lg":"inputFiled rounded-lg capitalize"}
                                ref={(input)=> end_dateRef = input}
                            />
                        </div>

                    </div>

                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"Add Education"} submit={submit} onClick={educationUpdateSubmit} />
                        <Link href="/my-cv/education"  className={"btnBG px-5 md:px-10 "}>Cancel</Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default UpdateEducationComponents;