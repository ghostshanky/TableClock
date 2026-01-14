export const DesignerFaceConfig = {
    id: 'designer_v1',
    name: 'JSON Engine Test',
    background: {
        type: 'solid',
        colors: ['#050510'],
    },
    layers: [
        {
            id: 'time_main',
            type: 'time',
            x: 50,
            y: 45,
            fontSize: 25,
            fontFamily: 'monospace',
            color: '#00ffcc',
            glow: { color: '#00ffcc', radius: 20 },
            letterSpacing: 0.05,
            textAlign: 'center',
            rotation: 0
        },
        {
            id: 'date_sub',
            type: 'date',
            x: 50,
            y: 65,
            fontSize: 5,
            fontFamily: 'sans-serif',
            color: '#ffffff',
            opacity: 0.7,
            letterSpacing: 0.2,
            textAlign: 'center',
            rotation: 0
        },
        {
            id: 'seconds_floating',
            type: 'seconds',
            x: 82,
            y: 38,
            fontSize: 6,
            fontFamily: 'monospace',
            color: '#ff00aa',
            glow: { color: '#ff00aa', radius: 10 },
            rotation: -10
        },
        {
            id: 'label_top',
            type: 'custom',
            text: 'ENGINE MODE',
            x: 50,
            y: 15,
            fontSize: 3,
            color: '#444',
            letterSpacing: 0.5,
            textAlign: 'center'
        }
    ]
};
