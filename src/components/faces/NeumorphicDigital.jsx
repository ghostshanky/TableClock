import React from 'react';
import { useClock } from '../../hooks/useClock';

const NeumorphicDigital = () => {
    const { hours12, minutes, seconds, amPm, pad } = useClock(true);

    return (
        <div className="face-container neumorphic-digital">
            <div className="clock-card-group">
                {/* Hours */}
                <div className="neu-card">
                    <span className="value">{pad(hours12)}</span>
                    <span className="label">HOURS</span>
                </div>

                <div className="colon">:</div>

                {/* Minutes */}
                <div className="neu-card">
                    <span className="value">{pad(minutes)}</span>
                    <span className="label">MINUTES</span>
                </div>

                <div className="colon">:</div>

                {/* Seconds */}
                <div className="neu-card">
                    <span className="value">{pad(seconds)}</span>
                    <span className="label">SECONDS</span>
                </div>
            </div>

            <div className="ampm">{amPm}</div>

            <style>{`
        .neumorphic-digital {
            flex-direction: column;
            background: #eef2f5;
            color: #333;
            transition: all 0.5s ease;
        }
        .clock-card-group {
            display: flex;
            align-items: center;
            gap: 2vmin;
        }
        .neu-card {
            background: #eef2f5;
            border-radius: 3vmin;
            width: 28vmin;
            height: 28vmin;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 
                1vmin 1vmin 2vmin #ced1d6,
                -1vmin -1vmin 2vmin #ffffff;
            transition: all 0.5s ease;
        }
        .neu-card .value {
            font-size: 14vmin;
            font-weight: 700;
            font-family: 'Segoe UI', sans-serif;
            color: #2d3436;
        }
        .neu-card .label {
            font-size: 2.5vmin;
            font-weight: 600;
            color: #b2b6b9;
            letter-spacing: 0.1em;
            margin-top: -1vmin;
        }
        .colon {
            font-size: 10vmin;
            font-weight: bold;
            color: #2d3436;
            margin-top: -4vmin;
        }
        .ampm {
            position: absolute;
            top: 25%;
            right: 15%;
            font-size: 4vmin;
            font-weight: 800;
            color: #2d3436;
            letter-spacing: 0.1em;
        }

        /* Night Mode (Dark Neumorphism) */
        body.night-mode .neumorphic-digital {
            background: #212529; /* Dark grey instead of pitch black for shadows to work */
            color: #f1f2f6;
        }
        body.night-mode .neu-card {
            background: #212529;
            box-shadow: 
                1vmin 1vmin 2vmin #181b1e,
                -1vmin -1vmin 2vmin #2a2f34;
        }
        body.night-mode .neu-card .value { color: #f1f2f6; }
        body.night-mode .neu-card .label { color: #6c757d; }
        body.night-mode .colon { color: #f1f2f6; }
        body.night-mode .ampm { color: #f1f2f6; }

      `}</style>
        </div>
    );
};

export default NeumorphicDigital;
