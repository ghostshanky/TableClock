import React, { useState, useEffect } from 'react';
import ClockEngine from './ClockEngine';
import QuickControls from './QuickControls';
import ToolsPanel from './tools/ToolsPanel';
import { getNextFaceId, faces } from './faces';
import { useWakeLock } from '../hooks/useWakeLock';
import { useNativeUI } from '../hooks/useNativeUI';
import { ServiceProvider, useServices } from '../context/ServiceContext';
import { IconGear, IconTools, IconBell } from './Icons';

// Internal component to consume context
const MainContent = () => {
    // Helper to generic load from local storage
    const loadState = (key, fallback) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : fallback;
        } catch (e) {
            return fallback;
        }
    };

    // Global States with Persistence
    const [isNightMode, setIsNightMode] = useState(() => loadState('tableClock_nightMode', false));
    const [activeFace, setActiveFace] = useState(() => loadState('tableClock_activeFace', faces[0].id));
    const [scale, setScale] = useState(() => loadState('tableClock_scale', 1));

    // UI State
    const [showControls, setShowControls] = useState(false);
    const [showTools, setShowTools] = useState(false);

    // Context Hooks
    const { activeAlarm, dismissAlarm, snoozeAlarm } = useServices();

    // Hooks
    useWakeLock();
    useNativeUI();

    // Persist Effects
    useEffect(() => localStorage.setItem('tableClock_nightMode', JSON.stringify(isNightMode)), [isNightMode]);
    useEffect(() => localStorage.setItem('tableClock_activeFace', JSON.stringify(activeFace)), [activeFace]);
    useEffect(() => localStorage.setItem('tableClock_scale', JSON.stringify(scale)), [scale]);

    // Toggle Night Mode Class on Body
    useEffect(() => {
        if (isNightMode) {
            document.body.classList.add('night-mode');
        } else {
            document.body.classList.remove('night-mode');
        }
    }, [isNightMode]);

    return (
        <div className="app-container" onClick={() => { setShowControls(false); setShowTools(false); }}>
            {/* Main Clock Area */}
            <main className="clock-viewport">
                <ClockEngine type={activeFace} scale={scale} />
            </main>

            {/* ALARM OVERLAY */}
            {activeAlarm && (
                <div className="alarm-overlay">
                    <div className="alarm-card">
                        <h1><IconBell className="icon-large" /> {activeAlarm.label}</h1>
                        <div className="alarm-time">
                            {activeAlarm.hours}:{activeAlarm.minutes.toString().padStart(2, '0')}
                        </div>
                        <div className="alarm-actions">
                            <button className="btn-snooze" onClick={snoozeAlarm}>Snooze</button>
                            <button className="btn-dismiss" onClick={dismissAlarm}>Dismiss</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Buttons */}
            <div className="fab-container">
                <button
                    className="fab tools-fab"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowTools(true);
                        setShowControls(false);
                    }}
                >
                    <IconTools className="icon" />
                </button>
                <button
                    className="fab settings-fab"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowControls(true);
                        setShowTools(false);
                    }}
                >
                    <IconGear className="icon" />
                </button>
            </div>

            {/* Tools Panel */}
            {showTools && (
                <div onClick={(e) => e.stopPropagation()}>
                    <ToolsPanel onClose={() => setShowTools(false)} />
                </div>
            )}

            {/* Quick Controls Overlay */}
            <div className={`controls-overlay ${showControls ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="glass-panel">
                    <QuickControls
                        isNightMode={isNightMode}
                        setIsNightMode={setIsNightMode}
                        show={showControls}
                        onNextFace={() => setActiveFace(prev => getNextFaceId(prev))}
                        scale={scale}
                        setScale={setScale}
                        onClose={() => setShowControls(false)}
                    />
                </div>
            </div>

            <style>{`
        .app-container {
            width: 100vw;
            height: 100vh;
            position: relative;
            background: var(--color-bg);
            color: var(--color-text-primary);
            transition: background 0.5s ease;
            overflow: hidden;
        }
        
        .clock-viewport {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .fab-container {
            position: absolute;
            top: 2rem;
            right: 2rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            z-index: 5;
        }

        .fab {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            opacity: 0.5;
            padding: 0;
        }
        .fab .icon { width: 1.5rem; height: 1.5rem; }
        .fab:hover {
            opacity: 1;
            background: rgba(255,255,255,0.2);
        }

        .alarm-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse-bg 2s infinite;
        }
        .alarm-card {
            background: #222;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            border: 2px solid #ff4444;
        }
        .alarm-card h1 { display: flex; align-items: center; justify-content: center; gap: 1rem; }
        .icon-large { width: 2.5rem; height: 2.5rem; }
        .alarm-time { font-size: 5rem; font-weight: bold; margin: 1rem 0; }
        .alarm-actions { display: flex; gap: 1rem; justify-content: center; }
        .btn-dismiss { padding: 1rem 3rem; font-size: 1.5rem; background: #ff4444; border: none; color: white; border-radius: 10px; cursor: pointer; }
        .btn-snooze { padding: 1rem 3rem; font-size: 1.5rem; background: #444; border: none; color: white; border-radius: 10px; cursor: pointer; }
        @keyframes pulse-bg { 0% { background: rgba(50,0,0,0.8); } 50% { background: rgba(100,0,0,0.9); } 100% { background: rgba(50,0,0,0.8); } }

        .controls-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: var(--space-md);
            transform: translateY(100%);
            transition: transform 0.3s var(--ease-spring);
            display: flex;
            justify-content: center;
            pointer-events: none; /* Let clicks pass when hidden */
            z-index: 10;
        }
        
        .controls-overlay.visible {
            transform: translateY(0);
            pointer-events: auto;
        }

        .glass-panel {
            background: var(--glass-bg);
            backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--glass-border);
            box-shadow: var(--glass-shadow);
            border-radius: 20px;
            padding: var(--space-md);
            width: 90%;
            max-width: 500px;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        /* Night Mode Specifics */
        body.night-mode {
            background: #000000;
        }
        body.night-mode .clock-viewport {
            color: #ff0000; /* Deep Red for night */
        } 
      `}</style>
        </div>
    );
};

const MainLayout = () => (
    <ServiceProvider>
        <MainContent />
    </ServiceProvider>
);

export default MainLayout;
