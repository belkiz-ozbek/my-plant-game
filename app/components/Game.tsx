const Game: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div>
            <h2>Welcome to the Plant Game</h2>
            <button onClick={handleLogout}>Logout</button>
            {



            }
        </div>
    );
};

export default Game;
