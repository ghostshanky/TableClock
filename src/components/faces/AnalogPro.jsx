import React from 'react';
import { useClock } from '../../hooks/useClock';

const AnalogPro = () => {
    const { hours12, minutes, seconds, dateObj } = useClock(true);

    // Calculate degrees
    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6;
    const hourDeg = hours12 * 30 + minutes * 0.5;

    // Date info
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const dateNum = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    // Generate ticks
    const ticks = [];
    for (let i = 0; i < 60; i++) {
        const isHour = i % 5 === 0;
        const deg = i * 6;
        ticks.push(
            <div
                key={i}
                className={`tick ${isHour ? 'hour-tick' : ''}`}
                style={{ transform: `rotate(${deg}deg)` }}
            />
        );
    }

    // Generate numbers
    const infoNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <div className="face-container analog-pro">
            <div className="pro-dial">
                {/* Ticks */}
                <div className="ticks-layer">{ticks}</div>

                {/* Numbers */}
                {infoNumbers.map((num, i) => {
                    const angle = i * 30; // 0=12, 1=1...
                    // Trigonometry to place numbers properly inside the ring
                    // But simple rotation is easier for the container, then counter-rotate text
                    return (
                        <div key={num} className="number-pos" style={{ transform: `rotate(${angle}deg)` }}>
                            <span className="num-text" style={{ transform: `rotate(-${angle}deg)` }}>{num}</span>
                        </div>
                    );
                })}

                {/* Info Text */}
                <div className="info-text top">STYLESEVEN</div>

                <div className="info-dashboard">
                    <span className="blue-text">{dayName}</span>
                    <span className="blue-text">{year}</span>
                    <span className="blue-text">{monthName}</span>
                    <span className="date-box">{dateNum}</span>
                </div>

                {/* Hands */}
                <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
                <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
                <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
                <div className="center-dot" />
            </div>

            <style>{`
        .analog-pro {
            background: #000;
            color: #fff;
            font-family: sans-serif;
        }
        .pro-dial {
            width: 90vmin;
            height: 90vmin;
            position: relative;
            border-radius: 50%;
        }

        /* TICKS */
        .tick {
            position: absolute;
            left: 50%;
            top: 0;
            width: 0.5vmin;
            height: 2vmin;
            background: #666;
            margin-left: -0.25vmin;
            transform-origin: 50% 45vmin; /* Rotate around center of 90vmin circle */
        }
        .hour-tick {
            background: #fff;
            height: 4vmin;
            width: 0.8vmin;
        }
        
        /* NUMBERS */
        .number-pos {
            position: absolute;
            left: 50%;
            top: 6vmin; /* pushed down from top */
            bottom: 6vmin;
            width: 0;
            margin-left: 0;
            /* transform-origin is complicated for text placement without wrapper.
               Alternative approach: Absolute position numbers.
               Let's stick to the rotation wrapper, ensuring origin is correct.
             */
             height: 100%;
             transform-origin: 50% 39vmin; /* Adjusted for top offset */
             display: none; /* Just using ticks is cleaner, but user image has numbers. */
        }
        /* Better number placement: Absolute % based on known circle */
        .number-pos {
            display: block;
            height: 78vmin; /* 90 - 6 - 6 */
            top: 6vmin;
            transform-origin: center;
        }
        .num-text {
            display: block;
            font-size: 8vmin;
            font-weight: bold;
            text-align: center;
            width: 10vmin;
            margin-left: -5vmin;
        }
        
        /* INFO */
        .info-text.top {
            position: absolute;
            top: 25%;
            width: 100%;
            text-align: center;
            color: #0033cc;
            font-weight: bold;
            font-size: 3vmin;
            letter-spacing: 0.1em;
        }
        .info-dashboard {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: 0 10vmin;
            box-sizing: border-box;
            transform: translateY(-50%);
        }
        .blue-text {
            color: #0033cc;
            font-size: 5vmin;
            font-weight: bold;
        }
        .date-box {
            border: 0.3vmin solid #0033cc;
            color: #fff; /* Image has white text in box? or blue? Assume blue outline white text or blue text. Image: Blue text. */
            color: #0033cc;
            padding: 0.5vmin 1vmin;
            font-size: 5vmin;
            font-weight: bold;
            background: rgba(0,0,50,0.5);
        }

        /* HANDS */
        .hand {
            position: absolute;
            left: 50%;
            bottom: 50%;
            transform-origin: bottom center;
            border-radius: 1vmin;
            z-index: 10;
        }
        .hour-hand {
            width: 2vmin;
            height: 25vmin;
            background: #fff;
            margin-left: -1vmin;
        }
        .minute-hand {
            width: 1.5vmin;
            height: 35vmin;
            background: #e0e0e0; /* light blue hue in image */
            box-shadow: 0 0 10px rgba(0,100,255,0.5);
            margin-left: -0.75vmin;
        }
        .second-hand {
            width: 0.6vmin;
            height: 40vmin;
            background: #ff0000;
            margin-left: -0.3vmin;
            z-index: 11;
        }
        .center-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3vmin;
            height: 3vmin;
            background: #ff0000;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            border: 0.5vmin solid #ccc;
            z-index: 12;
        }
      `}</style>
        </div>
    );
};

export default AnalogPro;
