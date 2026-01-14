import React from 'react';
import { useServices } from '../../context/ServiceContext';

const StopwatchView = () => {
    const { stopwatch, startStopwatch, stopStopwatch, resetStopwatch, lapStopwatch } = useServices();

    const formatTime = (ms) => {
        const mins = Math.floor(ms / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        const centis = Math.floor((ms % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
    };

    return (
        <div className="tool-view stopwatch-view">
            <div className="display-large">
                {formatTime(stopwatch.elapsed)}
            </div>

            <div className="controls-row">
                {!stopwatch.isRunning ? (
                    <button className="btn-primary" onClick={startStopwatch}>Start</button>
                ) : (
                    <button className="btn-warning" onClick={stopStopwatch}>Stop</button>
                )}

                <button className="btn-secondary" onClick={stopwatch.isRunning ? lapStopwatch : resetStopwatch}>
                    {stopwatch.isRunning ? 'Lap' : 'Reset'}
                </button>
            </div>

            <div className="laps-list">
                {stopwatch.laps.map((lap, i) => (
                    <div key={i} className="lap-item">
                        <span>Lap {i + 1}</span>
                        <span>{formatTime(lap)}</span>
                    </div>
                ))}
            </div>

            <style>{`
                .stopwatch-view {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    text-align: center;
                }
                .display-large {
                    font-size: 4rem;
                    font-family: monospace;
                    font-weight: bold;
                    color: #fff;
                }
                .laps-list {
                    max-height: 200px;
                    overflow-y: auto;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .lap-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
            `}</style>
        </div>
    );
};

export default StopwatchView;
