import React from 'react';
import { useClock } from '../../hooks/useClock';

const RetroFlip = () => {
    const { hours12, minutes, seconds, amPm, pad } = useClock(true);

    const renderCard = (value, label) => (
        <div className="flip-group">
            <div className="flip-card">
                <span className="value">{pad(value)}</span>
                <div className="split-line"></div>
            </div>
            <span className="label">{label}</span>
        </div>
    );

    return (
        <div className="face-container retro-flip">
            <div className="flip-display">
                {renderCard(hours12, 'Hours')}
                {renderCard(minutes, 'Minutes')}
                {renderCard(seconds, 'Seconds')}
            </div>

            <div className="ampm-badge">{amPm}</div>

            <style>{`
        .retro-flip {
            flex-direction: column;
            background: #f0f0f0;
            color: #333;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            transition: all 0.5s ease;
        }
        
        .flip-display {
            display: flex;
            gap: 3vmin;
            align-items: flex-start;
        }

        .flip-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .flip-card {
            background: #2c2c2c;
            width: 28vmin;
            height: 22vmin;
            border-radius: 2vmin;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 1vmin 2vmin rgba(0,0,0,0.2);
        }

        .flip-card .value {
            font-size: 16vmin;
            font-weight: 700;
            color: #ffffff;
            line-height: 1;
            z-index: 2;
        }

        /* The Split Line */
        .split-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 0.5vmin;
            background: rgba(0,0,0,0.4);
            z-index: 3;
            transform: translateY(-50%);
            box-shadow: 0 1px 0 rgba(255,255,255,0.1);
        }

        .label {
            margin-top: 2vmin;
            font-size: 3.5vmin;
            font-weight: 600;
            color: #555;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .ampm-badge {
            position: absolute;
            top: 10vmin;
            right: 10vmin;
            background: #2c2c2c;
            color: #fff;
            padding: 1vmin 2vmin;
            border-radius: 1vmin;
            font-weight: bold;
            font-size: 3vmin;
        }

        /* Night Mode */
        body.night-mode .retro-flip {
            background: #121212;
        }
        body.night-mode .flip-card {
            background: #222;
            box-shadow: 0 1vmin 2vmin rgba(0,0,0,0.5);
        }
        body.night-mode .label {
            color: #888;
        }
        body.night-mode .flip-card .value {
            color: #e0e0e0;
        }
      `}</style>
        </div>
    );
};

export default RetroFlip;
