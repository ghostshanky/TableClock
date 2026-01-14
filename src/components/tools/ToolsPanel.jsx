import React, { useState } from 'react';
import AlarmView from './AlarmView';
import TimerView from './TimerView';
import StopwatchView from './StopwatchView';
import { IconClose } from '../Icons';

const ToolsPanel = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('alarm');

    return (
        <div className="tools-panel">
            <div className="tools-header">
                <div className="tabs">
                    <button className={activeTab === 'alarm' ? 'active' : ''} onClick={() => setActiveTab('alarm')}>Alarms</button>
                    <button className={activeTab === 'timer' ? 'active' : ''} onClick={() => setActiveTab('timer')}>Timer</button>
                    <button className={activeTab === 'stopwatch' ? 'active' : ''} onClick={() => setActiveTab('stopwatch')}>Stopwatch</button>
                </div>
                <button className="close-btn" onClick={onClose}>
                    <IconClose className="icon" />
                </button>
            </div>

            <div className="tools-content">
                {activeTab === 'alarm' && <AlarmView />}
                {activeTab === 'timer' && <TimerView />}
                {activeTab === 'stopwatch' && <StopwatchView />}
            </div>

            <style>{`
                .tools-panel {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 60vh;
                    background: #111;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    box-shadow: 0 -5px 20px rgba(0,0,0,0.5);
                    z-index: 50;
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                    color: white;
                    transform: translateY(0);
                    transition: transform 0.3s ease;
                }
                
                .tools-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid #333;
                    padding-bottom: 0.5rem;
                }
                
                .tabs {
                    display: flex;
                    gap: 1rem;
                }
                
                .tabs button {
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 1.1rem;
                    font-weight: bold;
                    padding: 0.5rem;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: color 0.2s;
                }
                
                .tabs button.active {
                    color: var(--color-accent-primary);
                    border-bottom: 2px solid var(--color-accent-primary);
                }

                .close-btn {
                    background: #222;
                    border: none;
                    color: white;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }
                .close-btn .icon { width: 1.2rem; height: 1.2rem; }

                .tools-content {
                    flex: 1;
                    overflow: hidden;
                }
                
                /* Shared Button Styles for children */
                .btn-primary { background: var(--color-accent-primary); color: white; border: none; padding: 0.8rem 2rem; border-radius: 8px; font-weight: bold; cursor: pointer; }
                .btn-secondary { background: #333; color: white; border: none; padding: 0.8rem 2rem; border-radius: 8px; font-weight: bold; cursor: pointer; }
                .btn-warning { background: #ff4444; color: white; border: none; padding: 0.8rem 2rem; border-radius: 8px; font-weight: bold; cursor: pointer; }
            `}</style>
        </div>
    );
};

export default ToolsPanel;
