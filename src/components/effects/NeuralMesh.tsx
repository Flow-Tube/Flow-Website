import { useCallback, useEffect, useState, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

interface NeuralMeshProps {
    className?: string
}

export function NeuralMesh({ className }: NeuralMeshProps) {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    const particlesLoaded = useCallback(async () => {
        // Particles loaded
    }, [])

    const options = useMemo(() => ({
        fullScreen: { enable: false },
        background: {
            color: {
                value: 'transparent',
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'grab' as const,
                },
                resize: {
                    enable: true,
                },
            },
            modes: {
                grab: {
                    distance: 150,
                    links: {
                        opacity: 0.5,
                        color: '#ff4444',
                    },
                },
            },
        },
        particles: {
            color: {
                // YouTube red tones
                value: ['#ff0000', '#cc0000', '#ff4444', '#ff6b6b'],
            },
            links: {
                color: '#ff0000',
                distance: 180,
                enable: true,
                opacity: 0.12,
                width: 1,
                triangles: {
                    enable: true,
                    opacity: 0.015,
                },
            },
            move: {
                direction: 'none' as const,
                enable: true,
                outModes: {
                    default: 'bounce' as const,
                },
                random: true,
                speed: 0.5,
                straight: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080,
                },
                value: 50,
            },
            opacity: {
                value: { min: 0.2, max: 0.6 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                },
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 3 },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false,
                },
            },
        },
        detectRetina: true,
    }), [])

    if (!init) return null

    return (
        <Particles
            id="neural-mesh"
            className={className}
            particlesLoaded={particlesLoaded}
            options={options}
        />
    )
}

export default NeuralMesh
