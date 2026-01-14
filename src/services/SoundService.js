/**
 * SoundService.js
 * 
 * Uses Web Audio API to generate accurate, pleasant alarm sounds 
 * without relying on external assets.
 */
class SoundService {
    constructor() {
        this.ctx = null;
        this.oscillator = null;
        this.gainNode = null;
        this.isPlaying = false;
    }

    _init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playAlarm() {
        this._init();
        if (this.isPlaying) return;

        // Resume context if suspended (browser autopilot policy)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Create oscillator for a "Digital Alarm" sound
        this.oscillator = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();

        this.oscillator.type = 'square';
        this.oscillator.frequency.setValueAtTime(440, this.ctx.currentTime); // A4

        // Pattern: Beep Beep Beep
        // Envelope for Volume
        const t = this.ctx.currentTime;
        const volume = 0.1;

        this.gainNode.gain.setValueAtTime(0, t);

        // Beep 1
        this.gainNode.gain.linearRampToValueAtTime(volume, t + 0.1);
        this.gainNode.gain.linearRampToValueAtTime(0, t + 0.4);

        // Beep 2
        this.gainNode.gain.linearRampToValueAtTime(volume, t + 0.5);
        this.gainNode.gain.linearRampToValueAtTime(0, t + 0.8);

        // Beep 3
        this.gainNode.gain.linearRampToValueAtTime(volume, t + 0.9);
        this.gainNode.gain.linearRampToValueAtTime(0, t + 1.2);

        // Loop functionality would require a more complex node graph or setInterval wrapper
        // For simplicity in this "Tone", we'll rely on the interval calling this repeatedly or just loop the osc source node if purely constant.
        // Actually, let's make a continuous "Ringing" loop using an LFO or just scheduling ahead.
        // Better: Just start a simple repeating loop using setInterval here to re-trigger notes? 
        // Or keep it simple: A pulsating sine wave.

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        // Pulse Effect LFO
        const lfo = this.ctx.createOscillator();
        lfo.type = 'square';
        lfo.frequency.value = 2; // 2Hz pulse
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 500;
        lfo.connect(lfoGain);
        // lfoGain.connect(this.gainNode.gain); // Simple AM modulation

        // Let's stick to a simple persistent Sound that we start/stop
        this.oscillator.start();
        this.isPlaying = true;

        // Create a rhythmic pulse manually via gain
        this._pulseInterval = setInterval(() => {
            if (!this.gainNode) return;
            const now = this.ctx.currentTime;
            this.gainNode.gain.cancelScheduledValues(now);
            this.gainNode.gain.setValueAtTime(0, now);
            this.gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
            this.gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
        }, 1000);
    }

    stopAlarm() {
        if (this.oscillator) {
            try {
                this.oscillator.stop();
                this.oscillator.disconnect();
            } catch (e) { }
            this.oscillator = null;
        }
        if (this._pulseInterval) {
            clearInterval(this._pulseInterval);
        }
        this.isPlaying = false;
    }
}

export const soundService = new SoundService();
