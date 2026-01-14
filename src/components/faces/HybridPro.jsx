import React, { useState, useEffect } from 'react';
import { useClock } from '../../hooks/useClock';
import { useTimeSync } from '../../hooks/useTimeSync';
import { useWeather } from '../../hooks/useWeather';

const HybridPro = () => {
    // 1. Core Time & Data
    const { dateObj, hours12, hours24, minutes, seconds, amPm, pad } = useClock(true); // default true for 24h, we'll manually handle format
    const { isSynced } = useTimeSync();
    const { temp, humidity } = useWeather();

    // 2. Local UI State
    const [isSkeletal, setIsSkeletal] = useState(false);
    const [use24Hour, setUse24Hour] = useState(false); // Local toggle for this face

    // 3. Hands Calculation
    const secDeg = seconds * 6;
    const minDeg = minutes * 6 + seconds * 0.1;
    const hrDeg = (use24Hour ? hours24 % 12 : hours12) * 30 + minutes * 0.5;

    return (
        <div className={`hybrid-pro-container ${isSkeletal ? 'skeletal-mode' : ''}`}>

            {/* --- CONTROLS OVERLAY --- */}
            <div className="face-controls">
                <button
                    className={`ctrl-btn ${isSkeletal ? 'active' : ''}`}
                    onClick={() => setIsSkeletal(!isSkeletal)}
                    title="Toggle Mechanical View"
                >
                    ⚙️ Case
                </button>
                <button
                    className="ctrl-btn"
                    onClick={() => setUse24Hour(!use24Hour)}
                >
                    {use24Hour ? '24H' : '12H'}
                </button>
            </div>

            {/* --- LEFT: ANALOG DIAL --- */}
            <div className="analog-section">
                <div className="dial-plate">
                    {/* Tick Marks (Generated via CSS/Gradient for performance) */}
                    <div className="ticks"></div>

                    {/* Mechanical Internals (Visible in Skeletal Mode) */}
                    <div className="mechanism-layer">
                        <div className="gear big-gear"></div>
                        <div className="gear small-gear"></div>
                        <div className="oscillator">
                            <div className="quartz-crystal"></div>
                        </div>
                    </div>

                    {/* Hands */}
                    <div className="hand hour-hand" style={{ transform: `rotate(${hrDeg}deg)` }}></div>
                    <div className="hand minute-hand" style={{ transform: `rotate(${minDeg}deg)` }}></div>
                    <div className="hand second-hand" style={{ transform: `rotate(${secDeg}deg)` }}></div>

                    {/* Center Cap */}
                    <div className="center-cap"></div>

                    {/* Glass Reflection */}
                    <div className="crystal-glass"></div>
                </div>
            </div>

            {/* --- RIGHT: DIGITAL DASHBOARD --- */}
            <div className="digital-section">
                <div className="digital-time-group">
                    <div className="lcd-time">
                        {pad(use24Hour ? hours24 : hours12)}
                        <span className="colon">:</span>
                        {pad(minutes)}
                        <span className="seconds-small">{pad(seconds)}</span>
                    </div>
                    {!use24Hour && <div className="am-pm">{amPm}</div>}
                </div>

                <div className="widgets-grid">
                    <div className="widget">
                        <span className="label">TEMP</span>
                        <span className="value">{temp}<small>°C</small></span>
                    </div>
                    <div className="widget">
                        <span className="label">HUM</span>
                        <span className="value">{humidity}<small>%</small></span>
                    </div>
                </div>

                <div className="status-row">
                    <div className={`status-item ${isSynced ? 'synced' : 'seeking'}`}>
                        <span className="icon">📡</span>
                        <span className="text">{isSynced ? 'ATOMIC SYNC' : 'SEEKING...'}</span>
                    </div>
                    <div className="status-item date-display">
                        {dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
                    </div>
                </div>
            </div>

            <style>{`
                /* --- CONTAINER --- */
                .hybrid-pro-container {
                    width: 90vmin;
                    height: 50vmin;
                    background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
                    border-radius: 4vmin;
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    padding: 2vmin;
                    box-shadow: 
                        0 2vmin 5vmin rgba(0,0,0,0.8),
                        inset 0 0 0 2px #333;
                    position: relative;
                    font-family: 'Outfit', 'Roboto', sans-serif;
                    color: #e0e0e0;
                    overflow: hidden;
                    transition: all 0.5s ease;
                }
                
                /* --- CONTROLS --- */
                .face-controls {
                    position: absolute;
                    top: 2vmin;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 20;
                    display: flex;
                    gap: 1vmin;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .hybrid-pro-container:hover .face-controls { opacity: 1; }
                
                .ctrl-btn {
                    background: rgba(0,0,0,0.6);
                    border: 1px solid #444;
                    color: #888;
                    padding: 0.5vmin 1.5vmin;
                    font-size: 1.5vmin;
                    border-radius: 2vmin;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .ctrl-btn:hover { color: white; border-color: white; }
                .ctrl-btn.active { background: #333; color: #00ffcc; border-color: #00ffcc; }

                /* --- ANALOG SECTION --- */
                .analog-section {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .dial-plate {
                    width: 40vmin;
                    height: 40vmin;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, #2a2a2a, #111);
                    position: relative;
                    box-shadow: 
                        inset 0 0 5vmin #000,
                        0 0 2vmin rgba(0,0,0,0.5);
                    border: 1px solid #333;
                }

                .ticks {
                    position: absolute;
                    inset: 2vmin;
                    border-radius: 50%;
                    background: 
                        repeating-conic-gradient(
                            from 0deg,
                            rgba(255,255,255,0.8) 0deg 0.5deg,
                            transparent 0.5deg 30deg
                        ),
                        repeating-conic-gradient(
                            from 0deg,
                            rgba(255,255,255,0.3) 0deg 0.2deg,
                            transparent 0.2deg 6deg
                        );
                    pointer-events: none;
                }

                /* HANDS */
                .hand {
                    position: absolute;
                    bottom: 50%;
                    left: 50%;
                    transform-origin: 50% 100%;
                    border-radius: 1vmin;
                    box-shadow: 0 0 1vmin rgba(0,0,0,0.5);
                }
                .hour-hand {
                    width: 1.2vmin;
                    height: 10vmin;
                    background: #fff;
                    margin-left: -0.6vmin;
                    z-index: 5;
                }
                .minute-hand {
                    width: 0.8vmin;
                    height: 16vmin;
                    background: #ccc;
                    margin-left: -0.4vmin;
                    z-index: 6;
                }
                .second-hand {
                    width: 0.3vmin;
                    height: 18vmin;
                    background: #ff3333;
                    margin-left: -0.15vmin;
                    z-index: 7;
                    box-shadow: 0 0 1.5vmin #ff3333;
                }
                .center-cap {
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 2vmin; height: 2vmin;
                    background: #ddd;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 8;
                    box-shadow: 0 0.5vmin 1vmin rgba(0,0,0,0.5);
                }

                /* GLASS */
                .crystal-glass {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: linear-gradient(
                        135deg,
                        rgba(255,255,255,0.1) 0%,
                        rgba(255,255,255,0) 40%,
                        rgba(255,255,255,0) 60%,
                        rgba(255,255,255,0.05) 100%
                    );
                    z-index: 10;
                    pointer-events: none;
                }

                /* --- SKELETAL MECHANISM --- */
                .mechanism-layer {
                    position: absolute;
                    inset: 5vmin;
                    opacity: 0;
                    transition: opacity 1s ease;
                    pointer-events: none;
                }
                .skeletal-mode .mechanism-layer { opacity: 0.6; }
                .skeletal-mode .dial-plate { background: radial-gradient(circle, rgba(0,0,0,0.8), rgba(0,0,0,0.9)); }
                
                .gear {
                    position: absolute;
                    border: 4px dashed #555;
                    border-radius: 50%;
                    animation: spin linear infinite;
                }
                .big-gear {
                    width: 20vmin; height: 20vmin;
                    top: 50%; left: 50%;
                    margin: -10vmin 0 0 -10vmin;
                    border-width: 3vmin;
                    animation-duration: 10s;
                }
                .small-gear {
                    width: 12vmin; height: 12vmin;
                    top: 20%; left: 60%;
                    border: 2px dotted #777;
                    border-width: 2vmin;
                    animation-duration: 4s;
                    animation-direction: reverse;
                }
                
                @keyframes spin { 100% { transform: rotate(360deg); } }

                .oscillator {
                    position: absolute;
                    bottom: 20%; left: 30%;
                }
                .quartz-crystal {
                    width: 6vmin; height: 2vmin;
                    background: #333;
                    border: 1px solid #555;
                    animation: pulse 1s infinite alternate;
                }
                @keyframes pulse { to { box-shadow: 0 0 1vmin #00ffcc; border-color: #00ffcc; } }

                /* --- DIGITAL SECTION --- */
                .digital-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 4vmin;
                    border-left: 1px solid #333;
                }

                .digital-time-group {
                    margin-bottom: 4vmin;
                }
                .lcd-time {
                    font-family: 'Courier New', monospace;
                    font-size: 12vmin;
                    font-weight: bold;
                    color: #fff;
                    line-height: 1;
                    letter-spacing: -0.5vmin;
                    text-shadow: 0 0 2vmin rgba(255,255,255,0.5);
                }
                .seconds-small {
                    font-size: 5vmin;
                    color: #888;
                    margin-left: 1vmin;
                }
                .am-pm {
                    font-size: 3vmin;
                    font-weight: bold;
                    color: #ff3333;
                    margin-top: 1vmin;
                    letter-spacing: 0.5vmin;
                }

                /* WIDGETS */
                .widgets-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2vmin;
                    margin-bottom: 4vmin;
                }
                .widget {
                    background: #222;
                    padding: 1.5vmin;
                    border-radius: 1vmin;
                    border-left: 0.5vmin solid #00ffcc;
                }
                .widget .label {
                    display: block;
                    font-size: 1.5vmin;
                    color: #666;
                    margin-bottom: 0.5vmin;
                }
                .widget .value {
                    font-size: 3.5vmin;
                    color: #eee;
                }
                .widget small { font-size: 2vmin; color: #999; }

                /* STATUS */
                .status-row {
                    font-size: 2vmin;
                    color: #555;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid #222;
                    padding-top: 2vmin;
                }
                .status-item { display: flex; align-items: center; gap: 1vmin; }
                .status-item.synced { color: #00cc00; }
                .status-item.seeking { animation: blink 2s infinite; }
                
                @keyframes blink { 50% { opacity: 0.5; } }

                /* Night Mode overrides */
                body.night-mode .hybrid-pro-container {
                    background: #000;
                    border-color: #330000;
                }
                body.night-mode .lcd-time { color: #ff0000; text-shadow: 0 0 2vmin rgba(255,0,0,0.6); }
                body.night-mode .second-hand { background: #aa0000; box-shadow: none; }
                body.night-mode .widget { border-left-color: #aa0000; background: #110000; }
                body.night-mode .widget .value { color: #ff5555; }
                body.night-mode .status-item.synced { color: #880000; }
                body.night-mode .quartz-crystal { animation: none; border-color: #330000; }

            `}</style>
        </div>
    );
};

export default HybridPro;
