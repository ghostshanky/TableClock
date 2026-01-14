import React from 'react';
import { IconSun, IconMoon, IconRefresh, IconClose } from './Icons';

const QuickControls = ({ isNightMode, setIsNightMode, onNextFace, show, scale, setScale, onClose }) => {
    // Prevent click propagation to avoid closing the overlay immediately
    const handleContainerClick = (e) => {
        e.stopPropagation();
    };

    if (!show) return null;

    return (
        <div className="quick-controls-content" onClick={handleContainerClick}>
            <div className="header-row">
                <h3>TableClock Settings</h3>
                <button className="close-btn" onClick={onClose}>
                    <IconClose className="icon" />
                </button>
            </div>

            <div className="control-group">
                <label>Brightness (Simulated)</label>
                <input type="range" min="20" max="100" defaultValue="100"
                    onChange={(e) => document.body.style.opacity = e.target.value / 100} />
            </div>

            <div className="control-group">
                <label>Clock Size: {scale.toFixed(1)}x</label>
                <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                />
            </div>

            <div className="control-group row">
                <button className={isNightMode ? 'active' : ''} onClick={() => setIsNightMode(!isNightMode)}>
                    {isNightMode ? (
                        <span className="btn-content"><IconMoon className="icon-sm" /> Night</span>
                    ) : (
                        <span className="btn-content"><IconSun className="icon-sm" /> Day</span>
                    )}
                </button>

                <button onClick={onNextFace}>
                    <span className="btn-content">Face <IconRefresh className="icon-sm" /></span>
                </button>
            </div>

            <div className="control-group">
                <small className="hint">Tap background or use 'X' to close</small>
            </div>

            <style>{`
        .quick-controls-content {
           /* Inherits glass styles from parent in MainLayout */
           width: 100%;
        }
        
        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--glass-border);
            padding-bottom: 0.5rem;
            margin-bottom: var(--space-sm);
        }

        h3 {
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 0;
        }

        .close-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 1.2rem;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            flex: 0 0 auto;
            margin: 0;
        }
        .close-btn:hover {
            background: rgba(255, 0, 0, 0.4);
        }
        .close-btn .icon { width: 1.2rem; height: 1.2rem; }

        .control-group {
            margin-bottom: var(--space-md);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .control-group.row {
            flex-direction: row;
            justify-content: space-between;
        }

        button {
            padding: 1rem 1.5rem;
            border: 1px solid var(--glass-border);
            background: rgba(255,255,255,0.05);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.2s ease;
            flex: 1;
            margin: 0 0.5rem;
        }
        
        button:first-child { margin-left: 0; }
        button:last-child { margin-right: 0; }

        button:active {
            transform: scale(0.95);
        }

        button.active {
            background: var(--color-accent-secondary);
            border-color: var(--color-accent-secondary);
            color: white;
            box-shadow: 0 0 15px var(--color-accent-secondary);
        }
        
        .btn-content { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .icon-sm { width: 1rem; height: 1rem; }

        input[type=range] {
            width: 100%;
            accent-color: var(--color-accent-primary);
        }
        
        .hint {
            opacity: 0.5;
            font-size: 0.8rem;
            text-align: center;
            display: block;
        }
      `}</style>
        </div>
    );
};

export default QuickControls;
