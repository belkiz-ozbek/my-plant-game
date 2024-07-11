"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Game from '../components/game';
import LoginForm from "@/app/components/LoginForm";

const Page: React.FC = () => {
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/');
        }
    }, [router]);

    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default Page;
