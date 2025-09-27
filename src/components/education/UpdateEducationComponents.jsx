'use client'
import React, { useEffect, useRef, useState } from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import { ErrToast, IsEmpty } from "@/utility/FromHelper";
import { Get, Update } from "@/utility/APIHelper";
import { ErrAlert, SuccessAlert } from "@/utility/SweetAlert";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UpdateEducationComponents = ({ id }) => {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [endDate, setEndDate] = useState(false); // checkbox state

    // Refs for inputs
    const school_nameRef = useRef(null);
    const degreeRef = useRef(null);
    const start_dateRef = useRef(null);
    const end_dateRef = useRef(null);

    // Ref for the checkbox
    const endDateCheckRef = useRef(null);

    // Fetch data and populate refs
    useEffect(() => {
        const GetEducationData = async () => {
            try {
                const res = await Get(`/api/my-cv/education/read?id=${id}`);
                if (res.status === true) {
                    const data = res.data;

                    // Populate input fields via refs
                    if (school_nameRef.current) school_nameRef.current.value = data.school_name || "";
                    if (degreeRef.current) degreeRef.current.value = data.degree || "";
                    if (start_dateRef.current) start_dateRef.current.value = data.start_date || "";

                    // Handle end date / "Going On"
                    if (data.end_date === "Going On") {
                        setEndDate(true);
                        if (end_dateRef.current) end_dateRef.current.value = "Going On";
                        if (endDateCheckRef.current) endDateCheckRef.current.checked = true;
                    } else {
                        setEndDate(false);
                        if (end_dateRef.current) end_dateRef.current.value = data.end_date || "";
                        if (endDateCheckRef.current) endDateCheckRef.current.checked = false;
                    }
                }
            } catch (e) {
                ErrToast("Something went wrong");
            }
        };
        GetEducationData();
    }, [id]);

    // Submit function
    const educationUpdateSubmit = async () => {
        setSubmit(true);

        const updatedData = {
            school_name: school_nameRef.current.value,
            degree: degreeRef.current.value,
            start_date: start_dateRef.current.value,
            end_date: endDateCheckRef.current.checked ? "Going On" : end_dateRef.current.value,
        };

        // Validation
        if (IsEmpty(updatedData.school_name)) {
            setSubmit(false);
            return ErrToast("School name is required");
        } else if (IsEmpty(updatedData.degree)) {
            setSubmit(false);
            return ErrToast("Degree is required");
        } else if (IsEmpty(updatedData.start_date)) {
            setSubmit(false);
            return ErrToast("Start date is required");
        } else if (!updatedData.end_date || (!endDateCheckRef.current.checked && updatedData.end_date === "")) {
            setSubmit(false);
            return ErrToast("End date is required");
        } else if (
            !endDateCheckRef.current.checked &&
            new Date(updatedData.end_date) < new Date(updatedData.start_date)
        ) {
            setSubmit(false);
            return ErrToast("End date cannot be before start date");
        }

        try {
            const res = await Update(`/api/my-cv/education/update?id=${id}`, updatedData);
            if (res.status === true) {
                await SuccessAlert("Update Success");
                router.back();
            } else {
                await ErrAlert(res.message || "Please try again");
            }
        } catch (e) {
            await ErrAlert("Please try again");
        } finally {
            setSubmit(false);
        }
    };

    return (
        <section className="bg-sky-50 h-screen w-screen">
            <div className="container mx-auto flex justify-center items-center w-full h-full">
                <div className="flex justify-center items-center flex-col gap-y-3.5 bg-white shadow px-2 sm:px-6 md:px-8 py-8 w-full md:max-w-[750px] border-[.1px] border-sky-200 rounded-lg">
                    <h1 className="mt-3 capitalize text-black text-2xl md:text-3xl mb-6 font-bold">Update Education</h1>

                    {/* School Name */}
                    <div className="w-full">
                        <label className="inputLabel">School Name</label>
                        <input
                            type="text"
                            className="inputFiled capitalize"
                            ref={school_nameRef}
                        />
                    </div>

                    {/* Degree */}
                    <div className="w-full">
                        <label className="inputLabel">Degree</label>
                        <input
                            type="text"
                            className="inputFiled capitalize"
                            ref={degreeRef}
                        />
                    </div>

                    {/* Start Date & End Date */}
                    <div className="flex gap-x-4 gap-y-5 flex-col md:flex-row w-full">
                        {/* Start Date */}
                        <div>
                            <label className="inputLabel">Start Date</label>
                            <input
                                type="date"
                                className="inputFiled rounded"
                                ref={start_dateRef}
                            />
                        </div>

                        {/* Checkbox "Going On" */}
                        <div className="flex justify-start mt-4 sm:mt-9">
                            <input
                                type="checkbox"
                                className="w-6 h-6 rounded"
                                ref={endDateCheckRef}
                                checked={endDate}
                                onChange={() => {
                                    setEndDate(!endDate);
                                    if (!endDate) {
                                        // Checkbox checked → set end date input to "Going On"
                                        if (end_dateRef.current) end_dateRef.current.value = "Going On";
                                    } else {
                                        // Checkbox unchecked → clear end date input
                                        if (end_dateRef.current) end_dateRef.current.value = "";
                                    }
                                }}
                            />
                            <label className={endDate ? "ml-2 text-lg font-medium text-blue-500" : "ml-2 text-lg font-medium text-gray-700"}>
                                Going On
                            </label>
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="inputLabel">End Date</label>
                            <input
                                type={endDate ? "text" : "date"}
                                disabled={endDate}
                                className={endDate ? "inputFiled border-blue-300 outline-none cursor-not-allowed rounded-lg" : "inputFiled rounded-lg capitalize"}
                                ref={end_dateRef}
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="w-full mt-4 flex justify-between">
                        <SubmitButton text={"Update Education"} submit={submit} onClick={educationUpdateSubmit} />
                        <Link href={"/my-cv/education"} className="btnBG px-5 md:px-10">Cancel</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateEducationComponents;
