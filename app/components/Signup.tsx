import React, { useState } from 'react';

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [farmName, setFarmName] = useState<string>('');

    const handleSignup = () => {
        if (password.length >= 6) {
            const userData = { username, password, farmName };
            localStorage.setItem('user', JSON.stringify(userData));
            alert('Signup successful!');
        } else {
            alert('Password must be at least 6 characters long.');
        }
    };

    return (
        <div>
            <h2>Sign-up</h2>
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
            <input
                type="text"
                placeholder="Farm Name"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;
