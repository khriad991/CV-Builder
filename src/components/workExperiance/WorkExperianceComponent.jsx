'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Toaster} from "react-hot-toast";
import Link from "next/link";
import {MdAdd, MdDelete,} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {Create, Get} from "@/utility/APIHelper";
import { SuccessAlert, SweetAlert} from "@/utility/SweetAlert";
import {ErrToast, IsEmpty, Successtoast} from "@/utility/FromHelper";
import NextStep from "@/components/ChildComponents/NextStep";


const WorkExperianceComponent = () => {
    const [data,setData] = useState([])
    const [hidden,setHidden] = useState(false)
    const [submit,setSubmit] = useState(false);
    const [endDate ,setEndDate] = useState(false)
    let  cumpany_nameRef, designationRef, start_dateRef,end_dateRef = useRef(null);

    const getData =async () => {
        Get('/api/my-cv/work/read-all').then((res)=>{
            if(res?.status === true){
                setData(res?.data)
                res.data.length > 0 ? setHidden(false) : setHidden(true);
            }})}

    useEffect(   ()=>{
        getData()
    },[])

const workSubmit =async () => {
        // setHidden(true)
        setSubmit(true)
        const data= {
            company_name: cumpany_nameRef.value,
            designation: designationRef.value,
            start_date: start_dateRef.value,
            end_date: endDate ? "Going On" : end_dateRef.value,
        }

        if(IsEmpty(data.company_name)){
            setSubmit(false);
            return ErrToast("Company name is required");
        }else if(IsEmpty(data.designation)){
            setSubmit(false);
            return ErrToast("Designation is required");
        }else if(IsEmpty(data.start_date)){
            setSubmit(false);
            return ErrToast("Start date is required");
        }else if(IsEmpty(data.end_date)){
            setSubmit(false);
            return ErrToast("End date is required");
        } else {
            Create("/api/my-cv/work/create", data).then((res) => {
                if (res?.status === true) {
                    getData();
                    SuccessAlert("Created Success");
                    setSubmit(false);
                    setHidden(false);
                    setEndDate(false);
                }
            });
            cumpany_nameRef.value = "";
            designationRef.value = "";
            start_dateRef.value = "";
            end_dateRef.value = "";
        }
    }




    const DeleteWork = (id) => {
        SweetAlert(`/api/my-cv/work/delete?id=${id}`).then(async (res)=>{
            if(res){
                await Get('/api/my-cv/project/read-all').then((res)=>{
                    if(res?.status === true){
                        getData();
                        Successtoast("Deleted Success");
                    }
                })
            }
        })
    }

    return (
        <section className="py-10 px-6 bg-gray-50">
            <div className="container flex justify-center items-center w-full flex-col gap-y-10">
                <h1 className="text-2xl md:text-3xl border-b-2 border-b-blue-200 rounded-b-xl w-full pb-5 font-medium text-black capitalize text-center block">All Work Experiance</h1>
                <Toaster position="top-center" reverseOrder={false} />
                <div className={"flex w-full flex-col gap-y-4"}>
                    {
                        data?.map((item,id)=>(
                            <div key={id} className="flex flex-col gap-y-2 p-2 sm:p-4 md:p-6 w-full  bg-gray-100 rounded-lg shadow py-3.5 border-[.2px] border-sky-200">
                                <h1 className="text-lg font-medium capitalize">{item?.company_name} </h1>
                                <h1 className="text-lg font-medium capitalize">{item?.designation} </h1>
                                <div className="flex items-center gap-x-4">
                                   <p className="text-lg">{item?.start_date}</p>
                                   <p className="text-lg">{item?.end_date}</p>
                                </div>
                                <p className="text-base text-gray-600  text-blac">{item?.des}</p>
                                <div className="flex gap-x-2 mt-3">
                                    <button className="btn w-fit h-fit bg-red-500 hover:text-red-500 border-red-500 hover:bg-transparent  flex justify-center items-center"
                                            onClick={()=> DeleteWork(item?.id)} >
                                        <MdDelete size={18} />
                                    </button>
                                    <Link href={`/my-cv/work/update?id=${item?.id}`} className="btn w-fit h-fit p-3.5 flex justify-center items-center ml-8">
                                        <FaRegEdit size={15}  />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                    <div className={hidden ?"hidden ":"flex flex-col mt-2"}>
                        <button className="btnBG mx-auto flex px-16 justify-center items-center " type="submit" onClick={()=> setHidden(true)}>
                            <MdAdd size={25} className="mr-2"/>
                            Add new work
                        </button>
                    </div>
                </div>
                <div className={hidden ?" flex justify-center items-center flex-col gap-y-3.5 bg-white shadow  px-2 sm:px-6 md:px-8 py-8 w-full md:min-w-[800px] border-[.1px] border-sky-200 rounded-lg":"hidden "}>
                    <h1 className={"mt-3 capitalize text-black text-2xl md:text-3xl mb-6 font-bold"}>Add work Experiance</h1>
                    <div className="w-full">
                        <label className="inputLabel ">Cumpany Name</label>
                        <input type="text"
                               className="inputFiled capitalize"
                               ref={(input) => cumpany_nameRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel ">Designation</label>
                        <input
                            type="text"
                            className="inputFiled capitalize"
                            ref={(input)=> designationRef = input}
                        />
                    </div>
                    <div className="flex gap-x-4 gap-y-5 flex-col md:flex-row w-full">
                        <div className="">
                            <label className="inputLabel">start Data</label>
                            <input
                                type="date"
                                className="inputFiled"
                                ref={(input)=> start_dateRef = input}
                            />
                        </div>

                        <div className="flex justify-start mt-4 sm:mt-9 ">
                            <input
                                type="checkbox"
                                className="w-6 h-6 rounded"
                                defaultChecked={endDate}
                                onClick={()=> setEndDate(!endDate)}
                                // ref={() =>  endDate ? end_dateRef.value = "Going On": end_dateRef.value}
                            />
                            <label  className={endDate?"ml-2 text-lg font-medium text-blue-500":"ml-2 text-lg font-medium text-gray-700"}>Going On </label>
                        </div>

                        <div >
                            <label className="inputLabel">end Data</label>
                            <input
                                type={endDate ?"text":"date"}
                                className={endDate ? "inputFiled cursor-not-allowed border-red-300" :"inputFiled"}
                                defaultValue={endDate ? "Going On" : end_dateRef.value}
                                disabled={endDate}

                                ref={(input)=> end_dateRef = input}
                            />
                        </div>

                    </div>

                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"Add new work"} submit={submit} onClick={workSubmit} />
                        <button className={"btnBG px-5 md:px-10 "} onClick={()=> setHidden(false)}>Cancel</button>
                    </div>
                </div>
            </div>
            <NextStep href="/my-cv/education" value="go to add education" />
        </section>
    );
};

export default WorkExperianceComponent;