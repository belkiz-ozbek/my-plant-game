"use client"
import React, { useState, useEffect } from 'react';

const initialGrid = Array(5).fill(null).map(() => Array(5).fill(0));
const initialAnimatingGrid = Array(5).fill(null).map(() => Array(5).fill(false));
const initialTimerGrid = Array(5).fill(null).map(() => Array(5).fill(-1));

const images = [
    '/images/img-1.jpeg', // Stage 1
    '/images/img-2.jpeg', // Stage 2
    '/images/img-3.jpeg', // Stage 3
    '/images/img-5.jpeg', // Stage 5
    '/images/img-6.jpeg', // Stage 6
    '/images/img-7.jpeg', // Stage 7
    '/images/img-4.jpeg'  // Stage 4 (rotten stage)
];

const Game: React.FC = () => {
    const [grid, setGrid] = useState<number[][]>(initialGrid);
    const [animatingGrid, setAnimatingGrid] = useState<boolean[][]>(initialAnimatingGrid);
    const [timerGrid, setTimerGrid] = useState<number[][]>(initialTimerGrid);
    const [money, setMoney] = useState<number>(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerGrid(prevGrid => {
                const newGrid = prevGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        if (cell >= 0) {
                            if (cell > 0) {
                                return cell - 1;
                            } else {
                                // Handle transitions based on current stage
                                setGrid(prevGrid => {
                                    const newGrid = prevGrid.map((r, rIndex) =>
                                        r.map((c, cIndex) => {
                                            if (rIndex === rowIndex && cIndex === colIndex) {
                                                if (c === 6) {
                                                    return 7; // Change to rotten stage
                                                } else if (c === 7) {
                                                    return 0; // Change to stage 1 after rotten
                                                }
                                            }
                                            return c;
                                        })
                                    );
                                    return newGrid;
                                });
                                return grid[rowIndex][colIndex] === 6 ? 2 : -1; // Set timer for 2 seconds if just turned rotten, otherwise reset
                            }
                        }
                        return cell;
                    })
                );
                return newGrid;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [grid]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const handleClick = (row: number, col: number) => {
        if (animatingGrid[row][col]) return; // Prevent clicking on an animating cell

        if (grid[row][col] === 7) {
            // If the cell is at rotten stage, reset it to stage 1
            setGrid(prevGrid => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return 0;
                        }
                        return cell;
                    })
                );
                return newGrid;
            });
            setTimerGrid(prevGrid => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return -1;
                        }
                        return cell;
                    })
                );
                return newGrid;
            });
            return;
        }

        if (grid[row][col] === 6) {
            // If the cell is at stage 7, reset it to stage 1 and increase money
            setGrid(prevGrid => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return 0;
                        }
                        return cell;
                    })
                );
                return newGrid;
            });
            setMoney(prevMoney => prevMoney + 5); // Increase money by 5
            setTimerGrid(prevGrid => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return -1;
                        }
                        return cell;
                    })
                );
                return newGrid;
            });
            return;
        }

        // Decrease money by 5 for each click that progresses the stage
        setMoney(prevMoney => prevMoney - 5);

        let currentStage = grid[row][col];
        setAnimatingGrid(prevGrid => {
            const newGrid = [...prevGrid];
            newGrid[row][col] = true;
            return newGrid;
        });

        const animateStages = () => {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return currentStage;
                        }
                        return cell;
                    })
                );
                return newGrid;
            });

            if (currentStage < 6) { // Skip stage 4 and go to stage 5, stage 6 and stage 7
                currentStage = currentStage === 3 ? 5 : currentStage + 1;
                setTimeout(animateStages, 2000); // Wait for 2 seconds before next stage
            } else {
                setAnimatingGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[row][col] = false;
                    return newGrid;
                });
                // Set a timer for 2 seconds to change stage 7 to rotten stage
                setTimerGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[row][col] = 2;
                    return newGrid;
                });
            }
        };

        animateStages();
    };

    return (
        <div>
            <h2>Welcome to the Plant Game</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3>Money: ${money}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                {grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{ width: '100px', height: '100px', border: '1px solid green' }}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            <img src={images[cell]} alt={`Plant stage ${cell}`} style={{ width: '100%', height: '100%' }} />
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
};

export default Game;
