import React from 'react';

const game: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    console.log("jdshf");

    return (
        <div>
            <h2>Welcome to the Plant Game</h2>

        </div>
    );
};

export default game;
