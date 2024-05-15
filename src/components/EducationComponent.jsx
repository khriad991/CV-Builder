'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Create, Get} from "@/utility/APIHelper";
import {Toaster} from "react-hot-toast";
import {MdAdd, MdDelete} from "react-icons/md";
import Link from "next/link";
import {FaRegEdit} from "react-icons/fa";
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import { ErrToast, IsEmpty, SuccSweetAlert} from "@/utility/FromHelper";
import { SweetAlert} from "@/utility/SweetAlert";
import NextStep from "@/components/ChildComponents/NextStep";
import {BiSolidMessageSquareAdd} from "react-icons/bi";


const EducationComponent = () => {
    const [data,setData] = useState([])
    const [hidden,setHidden] = useState(false)
    const [submit,setSubmit] = useState(false);
    const [endDate ,setEndDate] = useState(false)
    let  school_nameRef, degreeRef, start_dateRef,end_dateRef = useRef(null);

    // const getData =  () => {
    //     Get("/api/my-cv/education/read-all").then((res)=>{
    //         if(res?.status === true){
    //             setData(res?.data );
    //         }})
    // }

    useEffect(  ()=>{
        const getData = async () => {
            try {
                const response = await Get('/api/my-cv/education/read-all'); // Replace with your actual API endpoint
                if (response.status === true) {
                    setData(response.data);
                } else {
                    console.error('Error fetching data:', response.message); // Handle errors
                }
            } catch (error) {
                console.error('Error fetching data:', error); // Handle errors
            }
        };

        getData();
    },[data])


    const educationSubmit =async () => {
        setSubmit(true)

        let data ={
            school_name : school_nameRef.value,
            degree : degreeRef.value,
            start_date : start_dateRef.value,
            end_date : endDate ? "Going On" : end_dateRef.value
        }

        if(IsEmpty(data.school_name)){
            setSubmit(false)
            return ErrToast("School names required!!");
        }else if(IsEmpty(data.degree)){
            setSubmit(false)
            return ErrToast("Degree is Required!!");
        }else if(IsEmpty(data.start_date)){
            setSubmit(false)
            return ErrToast("Sart date is Required!!");
        }else if(IsEmpty(data.end_date)){
            setSubmit(false)
            return ErrToast("End Date is required!!");
        }else {
            Create("/api/my-cv/education/create",data).then((res)=>{
                if(res?.status === true){
                    SuccSweetAlert("Project created success")
                   Get('/api/my-cv/education/read-all')
                       .then((res)=>{
                           if(res?.status === true){
                               setData(res?.data)
                               setSubmit(false)
                               setHidden(false)
                           }
                       })
                }}).catch(()=>{
                    setSubmit(false)
                return ErrToast("Something went wrong")
            })
            school_nameRef.value = "";
            degreeRef.value = "";
            start_dateRef.value = "";
            end_dateRef.value = "";
            setEndDate(false)
        }}




    const DeleteEducation = (id) => {
            SweetAlert(`/api/my-cv/education/delete?id=${id}`)
                .then(async (res)=>{
                    if(res){
                        Get("/api/my-cv/education/read-all").then((res)=>{
                               if(res?.status === true){
                                   SuccSweetAlert("Delete Success")
                                   setData(res?.data)
                           }})
                    }})
    }
    return (
        <section className={hidden ? "py-10 px-6 bg-gray-100 -z-20 w-full h-screen " :" w-full h-auto py-10 px-6 bg-gray-100 "}>
            <div className="container flex flex-col ">
                <Toaster position="top-center" reverseOrder={false} />
                <div className={ "flex justify-center items-center w-full flex-col gap-y-8 relative z-10"}>
                    <h1 className="text-2xl md:text-3xl border-b-2 border-b-blue-200 rounded-b-xl w-full pb-5 font-medium text-black capitalize text-center block">Your All educations </h1>
                    <div className={"flex w-full flex-col gap-y-4"}>
                        {
                            data?.map((item,id)=>(
                                <div key={id} className="flex flex-col gap-y-2 p-2 sm:p-4 md:p-6 w-full rounded-lg shadow py-3.5 border-[.2px] border-sky-200  hover:bg-gray-200 my-transition group relative">
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
                                    <div className="flex gap-x-2.5 mt-3">
                                        <button className="btn w-fit h-fit flex md:hidden justify-center items-center"
                                                type="submit"
                                                onClick={()=> setHidden(true)}>
                                            <BiSolidMessageSquareAdd  size={17} />
                                        </button>
                                        <Link href={`/my-cv/education/update?id=${item?.id}`} className="btnBG ">
                                            <FaRegEdit size={17}  />
                                        </Link>
                                        <button className="btn w-fit h-fit bg-red-500 hover:text-red-500 border-red-500 hover:bg-transparent flex justify-center items-center"
                                                onClick={()=> DeleteEducation(item?.id)} >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                    <div className={ "hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 flex-col mt-2"}>
                                        <button className="btnBG mx-auto flex px-16 justify-center items-center "
                                                type="submit"
                                                onClick={()=> setHidden(true)}>
                                            <MdAdd size={17} className="mr-2"/> Add New Education
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={hidden ? "block":" hidden"}>
                        <div className={hidden ?"z-20 flex justify-center items-center flex-col gap-y-3.5 shadow px-2 sm:px-6 md:px-8 pt-6 pb-16 w-full md:min-w-[450px] max-w-[650px] border-[.1px] border-sky-200 rounded-lg absolute top-20 left-1/2 -translate-x-1/2 cursor-auto visible bg-white bg-opacity-100":"invisible top-0 "}>
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
                                        onChange={()=> setEndDate(!endDate)}
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
                    <div className={data.length > 0 ? " hidden":"flex "}>
                        <div className="flex-col mt-2">
                            <button className="btnBG mx-auto flex px-16 justify-center items-center "
                                    type="submit"
                                    onClick={()=> setHidden(!hidden)}>
                                <MdAdd size={25} className="mr-2"/> Add New Education
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <NextStep href="/my-cv/skill" value="go to add skill" />
        </section>
    );
};

export default EducationComponent;