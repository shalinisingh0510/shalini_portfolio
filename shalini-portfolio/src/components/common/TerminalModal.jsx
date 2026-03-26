import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const initialHistory = [
    { type: "system", content: "Initializing Shalini OS Kernel v.3.1.4 [AURORA]" },
    { type: "system", content: "Connection Established. Protocol secured." },
    { type: "system", content: " " },
    { type: "system", content: "Execute 'help' to bypass encryption and view commands." },
]

const TerminalModal = ({ isOpen, onClose }) => {
    const [history, setHistory] = useState(initialHistory)
    const [input, setInput] = useState("")
    const bottomRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [history, isOpen])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100)
        }
    }, [isOpen])

    const processCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase()
        setHistory(prev => [...prev, { type: "command", content: `SYS:\\Guest> ${cmd}` }])

        let response = []

        switch (trimmed) {
            case "help":
                response = [
                    { type: "info", content: "Available Kernel Commands:" },
                    { type: "info", content: "  [about]    - Extract bio-data" },
                    { type: "info", content: "  [skills]   - Compile technical metrics" },
                    { type: "info", content: "  [name]     - Decode primary identity" },
                    { type: "info", content: "  [email]    - Expose secure communication link" },
                    { type: "info", content: "  [clear]    - Purge log data" },
                    { type: "info", content: "  [exit]     - Terminate session" },
                ]
                break
            case "about":
                response = [
                    { type: "output", content: "Ident: Shalini Kumari" },
                    { type: "output", content: "Origin: Alard University" },
                    { type: "output", content: "Objective: Architecting logic at scale. Merging ultra-optimized backend infrastructure with stunning, fluid UI constructs." },
                ]
                break
            case "skills":
                response = [
                    { type: "info", content: "Loading Technical Arsenal..." },
                    { type: "output", content: "-> [Frontend]: React, Redux, Tailwind, Framer Motion, GSAP" },
                    { type: "output", content: "-> [Backend]: Node.js, Express, Microservices" },
                    { type: "output", content: "-> [Database]: MongoDB, MySQL, Supabase, Postgres" },
                    { type: "output", content: "-> [Algorithms]: Java, Next-Gen DSA Problem Solving" },
                ]
                break
            case "name":
                response = [{ type: "output", content: "SHALINI KUMARI" }]
                break
            case "email":
                response = [{ type: "output", content: "imshalini.cse@gmail.com" }]
                break
            case "clear":
                setHistory([])
                return
            case "exit":
                onClose()
                return
            case "":
                return
            default:
                response = [{ type: "error", content: `ERR: '${cmd}' unrecognized. Execution halted.` }]
        }

        setHistory(prev => [...prev, ...response])
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            processCommand(input)
            setInput("")
        } else if (e.key === "c" && e.ctrlKey) {
            setHistory(prev => [...prev, { type: "command", content: `SYS:\\Guest> ${input}^C` }])
            setInput("")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark, heavy frosted backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-[#0A0B1A]/70 backdrop-blur-2xl"
                    />

                    {/* Highly rounded 3D Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -30, rotateX: -10 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
                        className="fixed inset-x-4 md:inset-x-auto md:w-[650px] md:left-1/2 md:-translate-x-1/2 top-24 z-[70] flex flex-col max-h-[70vh] p-[1px] rounded-[3rem] bg-gradient-to-br from-highlight/40 via-border/20 to-accent/40 shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
                    >
                        <div className="flex flex-col flex-1 h-full w-full rounded-[3rem] glass !bg-surface-lowest/90 overflow-hidden relative border border-white/5 backdrop-blur-3xl">
                            {/* Aurora Terminal Glare */}
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-highlight/20 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

                            {/* Header / Deep 3D Mac-style Title Bar */}
                            <div className="bg-surface-bright/40 px-6 py-4 flex items-center justify-between border-b border-white/10 select-none relative z-10">
                                <div className="flex gap-3">
                                    <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-highlight shadow-[0_0_10px_rgba(244,114,182,0.8)] hover:scale-110 transition-transform focus:outline-none" aria-label="Close Terminal" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 opacity-60" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-accent opacity-60" />
                                </div>
                                <div className="text-white/40 font-mono text-xs font-black tracking-widest uppercase">
                                    Shalini_OS : ~
                                </div>
                                <div className="w-14 h-4" />
                            </div>

                            {/* Terminal Body */}
                            <div
                                className="p-8 flex-1 overflow-y-auto text-white/70 font-mono text-sm relative z-10"
                                onClick={() => inputRef.current?.focus()}
                            >
                                <div className="space-y-1.5 leading-relaxed tracking-wide">
                                    {history.map((line, i) => (
                                        <div key={i} className={`whitespace-pre-wrap ${
                                            line.type === 'error' ? 'text-highlight drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] font-bold' 
                                            : line.type === 'output' ? 'text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' 
                                            : line.type === 'command' ? 'text-white font-bold opacity-80' 
                                            : 'text-accent drop-shadow-[0_0_5px_rgba(56,189,248,0.5)] font-bold'
                                        }`}>
                                            {line.content}
                                        </div>
                                    ))}
                                </div>

                                {/* Active Input Line */}
                                <div className="flex items-center mt-3 text-white">
                                    <span className="text-accent font-black tracking-widest mr-3 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]">SYS:\Guest&gt;</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent border-none outline-none text-white font-bold caret-highlight w-full"
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                </div>

                                <div ref={bottomRef} className="h-4" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TerminalModal
