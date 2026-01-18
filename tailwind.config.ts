import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Background colors (YouTube dark theme)
                'bg-primary': '#0f0f0f',
                'bg-secondary': '#1a1a1a',
                'bg-elevated': '#212121',
                'bg-card': '#181818',

                // Accent colors (YouTube Red theme)
                'accent-primary': '#ff0000',
                'accent-secondary': '#cc0000',
                'accent-glow': '#ff4444',
                'accent-light': '#ff6b6b',

                // Neural colors (subtle red tones)
                'neural-line': 'rgba(255, 0, 0, 0.2)',
                'neural-node': 'rgba(255, 68, 68, 0.5)',

                // Text colors
                'text-primary': '#ffffff',
                'text-secondary': '#aaaaaa',
                'text-muted': '#717171',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'hero': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
                'display': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
                'heading': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'subheading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-up': 'fadeUp 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.6s ease-out forwards',
                'glow-pulse': 'glowPulse 4s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'grain': 'grain 8s steps(10) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -10%)' },
                    '20%': { transform: 'translate(-15%, 5%)' },
                    '30%': { transform: 'translate(7%, -25%)' },
                    '40%': { transform: 'translate(-5%, 25%)' },
                    '50%': { transform: 'translate(-15%, 10%)' },
                    '60%': { transform: 'translate(15%, 0%)' },
                    '70%': { transform: 'translate(0%, 15%)' },
                    '80%': { transform: 'translate(3%, 35%)' },
                    '90%': { transform: 'translate(-10%, 10%)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-glow': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
                'gradient-neural': 'linear-gradient(135deg, #ff0000 0%, #cc0000 50%, #ff4444 100%)',
            },
            boxShadow: {
                'glow-sm': '0 0 20px rgba(255, 0, 0, 0.3)',
                'glow-md': '0 0 40px rgba(255, 0, 0, 0.4)',
                'glow-lg': '0 0 80px rgba(255, 0, 0, 0.5)',
                'glow-red': '0 0 60px rgba(255, 68, 68, 0.4)',
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
}

export default config
