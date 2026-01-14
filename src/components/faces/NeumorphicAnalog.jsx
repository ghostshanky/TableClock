import React from 'react';
import { useClock } from '../../hooks/useClock';

const NeumorphicAnalog = () => {
    const { hours12, minutes, seconds, amPm, dateString, pad, hours24 } = useClock(true);

    // Calculate degrees
    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6;
    const hourDeg = hours12 * 30 + minutes * 0.5;

    return (
        <div className="face-container neumorphic-analog">
            {/* Analog Section */}
            <div className="analog-dial">
                <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
                <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
                <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
                <div className="center-cap" />

                {/* Simple markers */}
                <div className="marker m-12" />
                <div className="marker m-3" />
                <div className="marker m-6" />
                <div className="marker m-9" />
            </div>

            {/* Digital Section */}
            <div className="digital-readout">
                <div className="time-row">
                    <span className="time-big">{pad(hours12)}:{pad(minutes)}</span>
                    <span className="time-ampm">{amPm}</span>
                </div>
                <div className="date-row">{dateString}</div>
            </div>

            <style>{`
        .neumorphic-analog {
            flex-direction: column;
            background: #eef2f5;
            color: #333;
            gap: 5vmin;
            transition: all 0.5s ease;
        }
        
        /* THE DIAL */
        .analog-dial {
            width: 60vmin;
            height: 60vmin;
            border-radius: 50%;
            background: #eef2f5;
            position: relative;
            box-shadow: 
                2vmin 2vmin 5vmin #ced1d6,
                -2vmin -2vmin 5vmin #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        /* Convex/Concave inner ring for depth */
        .analog-dial::after {
            content: '';
            position: absolute;
            width: 85%;
            height: 85%;
            border-radius: 50%;
            background: #eef2f5;
            box-shadow: inset 1vmin 1vmin 2vmin #ced1d6, inset -1vmin -1vmin 2vmin #ffffff;
        }

        /* HANDS */
        .hand {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform-origin: bottom center;
            border-radius: 50px;
            z-index: 10;
        }
        .hour-hand {
            width: 1.5vmin;
            height: 18vmin;
            margin-left: -0.75vmin;
            background: #2d3436;
        }
        .minute-hand {
            width: 1vmin;
            height: 24vmin;
            margin-left: -0.5vmin;
            background: #636e72;
        }
        .second-hand {
            width: 0.5vmin;
            height: 26vmin;
            margin-left: -0.25vmin;
            background: #2980b9; /* Blue accent */
        }
        .center-cap {
            position: absolute;
            width: 3vmin;
            height: 3vmin;
            background: #2980b9;
            border-radius: 50%;
            z-index: 11;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        /* MARKERS */
        .marker {
            position: absolute;
            background: #b2b6b9;
            z-index: 5;
        }
        .m-12 { top: 10%; width: 0.5vmin; height: 3vmin; }
        .m-6  { bottom: 10%; width: 0.5vmin; height: 3vmin; }
        .m-3  { right: 10%; width: 3vmin; height: 0.5vmin; }
        .m-9  { left: 10%; width: 3vmin; height: 0.5vmin; }

        /* DIGITAL READOUT */
        .digital-readout {
            text-align: center;
            font-family: 'Segoe UI', sans-serif;
            z-index: 2;
        }
        .time-row {
            display: flex;
            align-items: baseline;
            justify-content: center;
            line-height: 1;
        }
        .time-big {
            font-size: 15vmin;
            font-weight: 700;
            color: #2d3436;
        }
        .time-ampm {
            font-size: 4vmin;
            font-weight: 600;
            margin-left: 2vmin;
            color: #b2b6b9;
        }
        .date-row {
            font-size: 4vmin;
            font-weight: 500;
            color: #636e72;
            margin-top: 1vmin;
        }

        /* NIGHT MODE */
        body.night-mode .neumorphic-analog { background: #212529; color: #f1f2f6; }
        body.night-mode .analog-dial {
            background: #212529;
            box-shadow: 
                2vmin 2vmin 5vmin #181b1e,
                -2vmin -2vmin 5vmin #2a2f34;
        }
        body.night-mode .analog-dial::after {
            background: #212529;
            box-shadow: inset 1vmin 1vmin 2vmin #181b1e, inset -1vmin -1vmin 2vmin #2a2f34;
        }
        body.night-mode .hour-hand { background: #f1f2f6; }
        body.night-mode .minute-hand { background: #ced4da; }
        body.night-mode .second-hand { background: #3498db; }
        body.night-mode .center-cap { background: #3498db; }
        body.night-mode .time-big { color: #f1f2f6; }
        body.night-mode .date-row { color: #adb5bd; }
        body.night-mode .marker { background: #495057; }

      `}</style>
        </div>
    );
};

export default NeumorphicAnalog;
