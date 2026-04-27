import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Background colors
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-elevated': 'var(--bg-elevated)',
                'bg-card': 'var(--bg-card)',

                // Accent colors
                'accent-primary': 'var(--accent-primary)',
                'accent-hover': 'var(--accent-hover)',

                // Text colors
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-muted': 'var(--text-muted)',
                
                // Border colors
                'border-subtle': 'var(--border-subtle)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
                'display': ['clamp(2rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
                'heading': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'subheading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-up': 'fadeUp 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
}

export default config

