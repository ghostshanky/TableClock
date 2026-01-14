import DigitalClassic from './DigitalClassic';
import NeumorphicDigital from './NeumorphicDigital';
import NeumorphicAnalog from './NeumorphicAnalog';
import AnalogPro from './AnalogPro';
import TextClock from './TextClock';
import NeonCyber from './NeonCyber';
import HardwarePro from './HardwarePro';
import HybridPro from './HybridPro';
import MatrixStyle from './MatrixStyle';
import RetroFlip from './RetroFlip';
import TypeWriter from './TypeWriter';

// Map of all available faces
// The 'id' is used for persistence and selection logic
export const faces = [
    { id: 'hybrid-pro', name: 'Hybrid Pro', component: HybridPro },
    { id: 'hardware-pro', name: 'Hardware Pro', component: HardwarePro },
    { id: 'digital-classic', name: 'Digital Classic', component: DigitalClassic },
    { id: 'analog-pro', name: 'Swiss Analog', component: AnalogPro },
    { id: 'retro-flip', name: 'Retro Flip', component: RetroFlip },
    { id: 'neumorphic-analog', name: 'Soft Analog', component: NeumorphicAnalog },
    { id: 'neumorphic-digital', name: 'Soft Digital', component: NeumorphicDigital },
    { id: 'neon-cyber', name: 'Neon Cyber', component: NeonCyber },
    { id: 'matrix', name: 'The Matrix', component: MatrixStyle },
    { id: 'typewriter', name: 'Typewriter', component: TypeWriter },
    { id: 'text-clock', name: 'Human Text', component: TextClock },
];

export const getNextFaceId = (currentId) => {
    const currentIndex = faces.findIndex(f => f.id === currentId);
    if (currentIndex === -1) return faces[0].id; // Fallback
    const nextIndex = (currentIndex + 1) % faces.length;
    return faces[nextIndex].id;
};
