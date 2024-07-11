"use client"
import { useState } from 'react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleLogin = () => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData.username === username && userData.password === password) {
            alert('Login successful!');
            setIsLoggedIn(true); // Set the login state to true
        } else {
            alert('Invalid username or password.');
        }
    };

    if (isLoggedIn) {
        return <div>Welcome, {username}!</div>; // Display welcome message or dashboard content
    }

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
