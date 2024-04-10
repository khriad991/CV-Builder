"use client"
import React, {useEffect, useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrToast, IsEmpty,} from "@/utility/FromHelper";
import {MdAdd} from "react-icons/md";

const ProjectComponents = ({data}) => {

    const router= useRouter();
    const [hidden,setHidden] = useState(true)
    const [submit,setSubmit] = useState(false);
    let nameRef, linkRef, desRef = useRef()

    useEffect(()=>{
            if (data.length > 0 ){
                setHidden(false);
            }else {
                setHidden(true);
            }
    },[])

    const ProjextSubmit =async () => {
        setSubmit(true)
        const ObjectArray = [
            {
                name:nameRef.value,
                link:linkRef.value,
                des:desRef.value
            }
            ]
        if(IsEmpty(ObjectArray.name)){
            ErrToast("Project name is required");
            setSubmit(false)
        }else if(IsEmpty(ObjectArray.link)){
            ErrToast("Website link is required");
            setSubmit(false)
        }else if(IsEmpty(ObjectArray.des)){
            ErrToast("Project description is required");
            setSubmit(false)
        }else {
            setHidden(true)
        }
    }

    const newProjectAdd = () => {
        setHidden(false)
    }
    return (
        <section className="py-10 px-6 bg-gray-50">
            <div className="container flex justify-center items-center w-full flex-col gap-y-10">
                <div className={hidden ? "hidden":"flex flex-col gap-y-4"}>
                    {
                        data.map((item,id)=>(
                            <div key={id}>
                                <h1 className="text-base text-black capitalize">{item.name}</h1>
                                <h1 className="text-base text-black capitalize">{item.link}</h1>
                                <h1 className="text-base text-black capitalize">{item.des}</h1>
                            </div>
                        ))
                    }
                    <div className={hidden ?"hidden flex-col gap-y-4":"flex flex-col gap-y-4"}>
                        <button className="btnBG flex justify-center items-center gap-x-4 " type="submit" onClick={newProjectAdd}>
                            <MdAdd size={25}/>
                            Add new project
                        </button>
                    </div>
                </div>
                <div className={hidden ?"hidden flex-col gap-y-4 bg-white shadow-md p-4 w-full md:w-[600px] border-2 border-gray-700":"flex flex-col gap-y-4 bg-white shadow-md p-4 w-full md:w-[600px] border-2 border-gray-700"}>
                    <h1 className={"capitalize text-black text-2xl md:text-4xl font-bold"}>Add your projects</h1>
                    <div className="w-full">
                        <label className="inputLabel my-5">Project Name</label>
                        <input type="text"
                               className="inputFiled"
                               ref={(input) => nameRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel my-5">website Link</label>
                        <input
                            type="text"
                            className="inputFiled"
                            ref={(input)=> linkRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel my-5">Project Description</label>
                        <input
                            type="text"
                            className="inputFiled"
                            ref={(input)=> desRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <SubmitButton text={"Add project"} type={"submit"} submit={submit} onClick={ProjextSubmit} />
                    </div>

                </div>
                <div className={hidden ? "flex flex-col gap-y-4":"hidden"}>
                    <button className="btnBG flex justify-center items-center gap-x-4 " type="submit" onClick={newProjectAdd}>
                        <MdAdd size={25}/>
                        Add new project
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectComponents;