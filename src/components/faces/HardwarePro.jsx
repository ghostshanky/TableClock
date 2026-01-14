import React from 'react';
import { useClock } from '../../hooks/useClock';

const HardwarePro = () => {
    const { hours12, minutes, amPm, dateObj, pad } = useClock(true);

    // Mock data for the "Hardware" feel
    const temp = "24°C";
    const humidity = "45%";

    // Format date like the reference: MON 12-25-2023
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dateStr = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');

    return (
        <div className="face-container hardware-pro">
            <div className="hardware-bezel">
                <div className="screen-content">
                    {/* Main Time Area */}
                    <div className="main-display">
                        <div className="time-group">
                            <span className="digit">{pad(hours12)}</span>
                            <span className="colon">:</span>
                            <span className="digit">{pad(minutes)}</span>
                        </div>
                        <div className="dst-indicator">DST</div>
                    </div>

                    {/* Bottom Info Row */}
                    <div className="info-row">
                        <div className="date-group">
                            <div className="day-label">{dayName}</div>
                            <div className="date-val">{dateStr}</div>
                        </div>

                        <div className="environment-group">
                            <span className="val">{temp}</span>
                            <span className="val small">{humidity} RH</span>
                        </div>
                    </div>

                    {/* Side Indicators (Alarms) */}
                    <div className="side-panel">
                        <div className="alarm-row active">
                            <span className="icon">⏰1</span> Mon - Sun
                        </div>
                        <div className="alarm-row">
                            <span className="icon">⏰2</span> Mon - Fri
                        </div>
                    </div>
                </div>

                {/* Glass Reflection Overlay */}
                <div className="glass-glare"></div>
            </div>

            <style>{`
                .hardware-pro {
                    background: #111;
                    color: #ff0000;
                    font-family: 'Courier New', monospace; /* Monospaced fallback */
                }
                
                .hardware-bezel {
                    background: #1a0505;
                    width: 90vmin;
                    height: 50vmin;
                    border-radius: 4vmin;
                    position: relative;
                    box-shadow: 
                        0 0 0 1vmin #333,
                        0 2vmin 4vmin rgba(0,0,0,0.8),
                        inset 0 0 5vmin #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .screen-content {
                    width: 85%;
                    height: 80%;
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    grid-template-rows: 3fr 1fr;
                    z-index: 2;
                }

                /* TIME DISPLAY */
                .main-display {
                    grid-column: 1 / 2;
                    grid-row: 1 / 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .time-group {
                    font-size: 22vmin;
                    font-weight: bold;
                    display: flex;
                    align-items: baseline;
                    letter-spacing: -0.05em;
                    transform: skewX(-5deg); /* Italic/LCD look */
                    text-shadow: 0 0 2vmin rgba(255, 0, 0, 0.6);
                }
                .dst-indicator {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, 8vmin);
                    font-size: 2vmin;
                    border: 1px solid #ff0000;
                    padding: 0 0.5vmin;
                    opacity: 0.8;
                }

                /* INFO ROW */
                .info-row {
                    grid-column: 1 / 3;
                    grid-row: 2 / 3;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    padding: 0 2vmin;
                    font-size: 6vmin;
                    border-top: 1px dashed rgba(255,0,0,0.2);
                    padding-top: 1vmin;
                }
                .date-group {
                    text-align: left;
                }
                .day-label {
                    font-size: 2.5vmin;
                    opacity: 0.8;
                }
                .date-val {
                    font-family: monospace; /* Segment-like */
                    letter-spacing: 0.1em;
                }
                .environment-group {
                    display: flex;
                    gap: 3vmin;
                }
                .val.small { font-size: 4vmin; align-self: center; }

                /* SIDE PANEL */
                .side-panel {
                    grid-column: 2 / 3;
                    grid-row: 1 / 2;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: 2.5vmin;
                    gap: 2vmin;
                    border-left: 1px solid rgba(255,0,0,0.2);
                    padding-left: 2vmin;
                    color: rgba(255,0,0,0.8);
                }
                .alarm-row { display: flex; align-items: center; gap: 1vmin; }
                .alarm-row.active { color: #ff5555; text-shadow: 0 0 5px red; }

                /* GLASS REFLECTION */
                .glass-glare {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        135deg,
                        rgba(255,255,255,0.05) 0%,
                        rgba(255,255,255,0) 40%,
                        rgba(255,255,255,0) 100%
                    );
                    pointer-events: none;
                }

                /* Night Mode Adjustment */
                body.night-mode .hardware-bezel {
                    box-shadow: none;
                    border: 1px solid #333;
                }
            `}</style>
        </div>
    );
};

export default HardwarePro;
