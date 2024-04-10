'use client'
import React from 'react';
import MainLayout from "@/components/MainLayout";
import LoginComponents from "@/components/loginComponents";

const RegisterForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <>
            <MainLayout>
                <LoginComponents/>
            </MainLayout>
        </>
    );
};

export default RegisterForm;