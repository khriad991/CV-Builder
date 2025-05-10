'use client'
import React, {useEffect, useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrToast, IsEmpty} from "@/utility/FromHelper";
import {ErrAlert, SuccessAlert} from "@/utility/SweetAlert";
import {Get, Update} from "@/utility/APIHelper";
import Link from "next/link";

const WorkExperianceUpdateComponent = ({id}) => {
    const router = useRouter();
    const [data,setData] = useState([]);
    const [submit,setSubmit] = useState(false);
    const [endDate,setEndDate] = useState(false);
    let cumpany_nameRef, designationRef, start_dateRef, end_dateRef = useRef();


    useEffect(()=>{
        Get(`/api/my-cv/work/read?id=${id}`).then((res)=>{
            if(res?.status === true){
                setData(res?.data)
                res?.data?.end_date === "Going On" ? setEndDate(true) : setEndDate(false)
            }
        })

    },[])
    const workSubmit =async () => {
        setSubmit(true)
        const data= {
            company_name: cumpany_nameRef.value,
            designation: designationRef.value,
            start_date: start_dateRef.value,
            end_date: end_dateRef.value
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
        }else if( IsEmpty(data.end_date)){
            setSubmit(false);
            return ErrToast("End date is required");
        }else{
            Update(`/api/my-cv/work/update?id=${id}`,data).then((res)=>{
                if(res?.status === true){
                   router.back();
                    SuccessAlert("Update Success")
                    setSubmit(false);
                }
            }).catch((e)=>{
                ErrAlert("Please try again");
                setSubmit(false)
            })
        }
    }

    return (
        <section className="bg-sky-50 py-8 w-screen h-screen">
           <div className="container mx-auto mt-8">
               <div className={"mx-auto flex justify-center items-center flex-col gap-y-3.5 bg-white shadow px-2 sm:px-6 md:px-8 py-8 w-full md:max-w-[800px] border-[.1px] border-sky-200 rounded-lg"}>
                   <h1 className={"mt-3 capitalize text-black text-2xl md:text-3xl mb-6 font-bold"}>Add work Experiance</h1>
                   <div className="w-full">
                       <label className="inputLabel capitalize">Cumpany Name</label>
                       <input type="text"
                              className="inputFiled capitalize"
                              defaultValue={data?.company_name}
                              ref={(input) => cumpany_nameRef = input}
                       />
                   </div>
                   <div className="w-full">
                       <label className="inputLabel ">Designation</label>
                       <input
                           type="text"
                           className="inputFiled capitalize"
                           defaultValue={data?.designation}
                           ref={(input)=> designationRef = input}
                       />
                   </div>
                   <div className="flex gap-x-4 gap-y-5 flex-col md:flex-row w-full">
                       <div>
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
                               checked={endDate}
                               className="w-6 h-6 rounded"
                               onClick={()=> setEndDate(!endDate)}
                           />
                           <label  className={endDate?"ml-2 text-lg font-medium text-blue-500":"ml-2 text-lg font-medium text-gray-700"}>Going On </label>
                       </div>

                       <div>
                           <label className="inputLabel">end Data</label>
                           <input
                               type={endDate === true ? "text":"date"}
                               defaultValue={endDate ? "Going On":data?.end_date}
                               disabled={endDate}
                               className={endDate ? "inputFiled border-blue-300 text-blue-400 font-medium outline-none cursor-not-allowed rounded":"inputFiled rounded-lg capitalize"}
                               ref={(input)=> end_dateRef = input}
                           />
                       </div>

                   </div>

                   <div className="w-full mt-4 flex justify-between ">
                       <SubmitButton text={"update work"} submit={submit} onClick={workSubmit} />
                       <Link href="/my-cv/work" className={"btnBG px-5 md:px-10 "} >Cancel</Link>
                   </div>
               </div>
           </div>
        </section>
    );
};

export default WorkExperianceUpdateComponent;