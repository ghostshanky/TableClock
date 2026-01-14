import React from 'react';
import { useClock } from '../../hooks/useClock';

const ZenScenery = () => {
    const { hours12, minutes, pad, dateString } = useClock(true);

    return (
        <div className="face-container zen-scenery">
            {/* Sky & Sun */}
            <div className="sky-gradient"></div>
            <div className="sun"></div>

            {/* Mountains */}
            <div className="mountain back"></div>
            <div className="mountain mid"></div>
            <div className="mountain front"></div>

            {/* Water/Reflection */}
            <div className="water">
                <div className="reflection"></div>
            </div>

            {/* Content Overlay */}
            <div className="content-layer">
                <div className="time-large">
                    {pad(hours12)}:{pad(minutes)}
                </div>
                <div className="date-pill">
                    {dateString}
                </div>

                <div className="stats-row">
                    <span className="stat">🌤️ 24°</span>
                    <span className="stat">👣 4,200</span>
                </div>
            </div>

            <style>{`
        .zen-scenery {
            position: relative;
            background: #ff9966;
            overflow: hidden;
            font-family: 'Nunito', 'Verdana', sans-serif;
            color: #fff;
        }

        /* SCENERY LAYERS */
        .sky-gradient {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 40%;
            background: linear-gradient(to bottom, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
            background: linear-gradient(to bottom, #F3904F 0%, #3B4371 100%); /* Sunset */
        }
        .sun {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            width: 40vmin;
            height: 40vmin;
            background: #ffdd00;
            border-radius: 50%;
            box-shadow: 0 0 50px rgba(255, 221, 0, 0.5);
            background: linear-gradient(to bottom, #ffe259, #ffa751);
        }

        .mountain {
            position: absolute;
            bottom: 40%; 
            width: 0; 
            height: 0; 
        }
        .mountain.back {
            left: -20%;
            border-left: 60vmin solid transparent;
            border-right: 60vmin solid transparent;
            border-bottom: 35vmin solid #564366;
        }
        .mountain.mid {
            right: -10%;
            border-left: 50vmin solid transparent;
            border-right: 50vmin solid transparent;
            border-bottom: 25vmin solid #745679;
        }
        .mountain.front {
            left: 20%;
            border-left: 40vmin solid transparent;
            border-right: 40vmin solid transparent;
            border-bottom: 20vmin solid #2E2938;
        }

        .water {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40%;
            background: #2E2938;
            background: linear-gradient(to bottom, #2E2938 0%, #1a1521 100%);
        }
        
        /* CONTENT */
        .content-layer {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: 15vmin;
        }
        .time-large {
            font-size: 22vmin;
            font-weight: 800;
            line-height: 1;
            text-shadow: 0 5px 15px rgba(0,0,0,0.3);
            font-variant-numeric: tabular-nums;
        }
        .date-pill {
            margin-top: 2vmin;
            font-size: 5vmin;
            font-weight: 600;
            background: rgba(255,255,255,0.2);
            padding: 1vmin 4vmin;
            border-radius: 50px;
            backdrop-filter: blur(5px);
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .stats-row {
            display: flex;
            gap: 4vmin;
            margin-top: 3vmin;
            font-size: 4vmin;
            opacity: 0.9;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        /* Night Mode - Moonlit */
        body.night-mode .sky-gradient {
            background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
        }
        body.night-mode .sun {
            background: #f0f0f0;
            box-shadow: 0 0 30px rgba(255,255,255,0.3);
        }
        body.night-mode .mountain.back { border-bottom-color: #0b1016; }
        body.night-mode .mountain.mid { border-bottom-color: #16222A; }
        body.night-mode .mountain.front { border-bottom-color: #000; }
        body.night-mode .water { background: #000; }
      `}</style>
        </div>
    );
};

export default ZenScenery;
