import React, { useState } from 'react';
import { useServices } from '../../context/ServiceContext';

const TimerView = () => {
    const { timer, startTimer, pauseTimer, resumeTimer, resetTimer } = useServices();
    const [inputMin, setInputMin] = useState(5);

    const formatTime = (totalSecs) => {
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (timer.isRunning || timer.remaining > 0 || timer.isFinished) {
        return (
            <div className="tool-view timer-active">
                <div className={`display-large ${timer.isFinished ? 'blink' : ''}`}>
                    {timer.isFinished ? "DONE" : formatTime(timer.remaining)}
                </div>

                <div className="controls-row">
                    {timer.isFinished ? (
                        <button className="btn-secondary" onClick={resetTimer}>Dismiss</button>
                    ) : (
                        <>
                            {timer.isRunning ? (
                                <button className="btn-warning" onClick={pauseTimer}>Pause</button>
                            ) : (
                                <button className="btn-primary" onClick={resumeTimer}>Resume</button>
                            )}
                            <button className="btn-secondary" onClick={resetTimer}>Cancel</button>
                        </>
                    )}
                </div>
                <style>{`
                    .blink { animation: blink 1s infinite; color: red; }
                    @keyframes blink { 50% { opacity: 0; } }
                `}</style>
            </div>
        );
    }

    return (
        <div className="tool-view timer-setup">
            <h3>Set Timer</h3>
            <div className="input-group">
                <input
                    type="number"
                    value={inputMin}
                    onChange={(e) => setInputMin(parseInt(e.target.value) || 0)}
                    className="time-input"
                />
                <span className="unit">min</span>
            </div>

            <div className="controls-row">
                <button className="btn-primary" onClick={() => startTimer(inputMin * 60)}>Start</button>
                <div className="quick-presets">
                    <button className="chip" onClick={() => startTimer(60)}>1m</button>
                    <button className="chip" onClick={() => startTimer(300)}>5m</button>
                    <button className="chip" onClick={() => startTimer(600)}>10m</button>
                </div>
            </div>

            <style>{`
                .timer-setup { display: flex; flex-direction: column; gap: 2rem; align-items: center; }
                .input-group { display: flex; align-items: baseline; gap: 0.5rem; }
                .time-input { 
                    font-size: 3rem; 
                    background: transparent; 
                    border: none; 
                    border-bottom: 2px solid #555; 
                    color: white; 
                    width: 120px; 
                    text-align: center; 
                }
                .quick-presets { display: flex; gap: 0.5rem; margin-top: 1rem; }
                .chip { background: #333; border: none; padding: 0.5rem 1rem; border-radius: 20px; color: #fff; cursor: pointer; }
            `}</style>
        </div>
    );
};

export default TimerView;
