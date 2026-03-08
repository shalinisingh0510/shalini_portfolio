import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

const SnowEffect = ({ isActive }) => {
    const [snowflakes, setSnowflakes] = useState([])
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        if (!isActive || reduceMotion) {
            setSnowflakes([])
            return
        }

        // Generate snowflakes with random properties
        const generateSnowflakes = () => {
            const flakes = []
            const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 120

            for (let i = 0; i < particleCount; i++) {
                flakes.push({
                    id: i,
                    x: Math.random() * 100, // vw
                    y: Math.random() * -100, // Start above screen
                    size: Math.random() * 0.4 + 0.25, // vw/vh relative (larger and varied)
                    animationDuration: Math.random() * 8 + 8, // 8s-16s fall time
                    animationDelay: Math.random() * -20, // Negative delay to start mid-animation
                    opacity: Math.random() * 0.7 + 0.3, // much more visible
                    wobble: Math.random() * 20 - 10, // horizontal drift
                })
            }
            setSnowflakes(flakes)
        }

        generateSnowflakes()

        // Handle resize to adjust particle count
        let resizeTimer
        const handleResize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(generateSnowflakes, 200)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimer)
        }
    }, [isActive, reduceMotion])

    if (!isActive || reduceMotion || snowflakes.length === 0) return null

    return (
        <div
            className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
            aria-hidden="true"
        >
            <style>
                {`
          @keyframes snowfall {
            0% {
              transform: translateY(-10vh) translateX(0);
            }
            100% {
              transform: translateY(110vh) translateX(var(--wobble));
            }
          }
          .snowflake {
            position: absolute;
            background: white;
            border-radius: 50%;
            filter: blur(1px);
            animation-name: snowfall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }
          /* Subtly tint snow based on theme using standard variables */
          .dark .snowflake {
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          }
          :not(.dark) .snowflake {
            background: rgba(148, 163, 184, 0.6); 
            box-shadow: 0 0 4px rgba(148, 163, 184, 0.4);
            filter: blur(0px);
          }
        `}
            </style>
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.x}vw`,
                        top: `${flake.y}vh`,
                        width: `${flake.size}vw`,
                        height: `${flake.size}vw`,
                        minWidth: '3px',
                        minHeight: '3px',
                        opacity: flake.opacity,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        '--wobble': `${flake.wobble}vw`,
                    }}
                />
            ))}
        </div>
    )
}

export default SnowEffect
