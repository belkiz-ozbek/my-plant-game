"use client"
import React from 'react';
import LoginForm from "@/app/components/LoginForm";
import Signup from "@/app/components/Signup";


const Page: React.FC = () => {

    return (
        <div>
            <Signup />
            <LoginForm />

        </div>
    );
};

export default Page;
