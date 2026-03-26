import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const initialHistory = [
    { type: "system", content: "Shalini OS [Version 1.0.0]" },
    { type: "system", content: "(c) 2024 Shalini Kumari. All rights reserved." },
    { type: "system", content: " " },
    { type: "system", content: "Type 'help' for a list of available commands." },
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

        setHistory(prev => [...prev, { type: "command", content: `C:\\Users\\Guest> ${cmd}` }])

        let response = []

        switch (trimmed) {
            case "help":
                response = [
                    { type: "info", content: "Available commands:" },
                    { type: "info", content: "  about   - Read a short bio" },
                    { type: "info", content: "  skills  - List of technical skills" },
                    { type: "info", content: "  name    - Display full name" },
                    { type: "info", content: "  email   - Display contact email" },
                    { type: "info", content: "  clear   - Clear the terminal screen" },
                    { type: "info", content: "  exit    - Close the terminal" },
                ]
                break
            case "about":
                response = [
                    { type: "info", content: "Hi! I am Shalini Kumari, a Software Developer from Alard University." },
                    { type: "info", content: "I am passionate about building scalable web applications, Data Structures & Algorithms, and open-source contributions." },
                ]
                break
            case "skills":
                response = [
                    { type: "info", content: "Technical Arsenal:" },
                    { type: "info", content: "-> Frontend: React, Redux, HTML/CSS, Tailwind, DaisyUI" },
                    { type: "info", content: "-> Backend: Node.js, Express, RESTful APIs" },
                    { type: "info", content: "-> Database: MongoDB, MySQL, Postgres, Supabase" },
                    { type: "info", content: "-> Core: Java (DSA), JavaScript" },
                ]
                break
            case "name":
                response = [{ type: "output", content: "Shalini Kumari" }]
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
                response = [{ type: "error", content: `'${cmd}' is not recognized as an internal or external command.` }]
        }

        setHistory(prev => [...prev, ...response])
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            processCommand(input)
            setInput("")
        } else if (e.key === "c" && e.ctrlKey) {
            setHistory(prev => [...prev, { type: "command", content: `C:\\Users\\Guest> ${input}^C` }])
            setInput("")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-surface-lowest/60 backdrop-blur-sm"
                    />

                    {/* Terminal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-x-4 md:inset-x-auto md:w-[600px] md:left-1/2 md:-translate-x-1/2 top-24 z-[70] rounded-xl overflow-hidden bg-surface-lowest border border-border/50 shadow-2xl font-mono text-sm md:text-base flex flex-col max-h-[70vh]"
                    >
                        {/* Header / Mac-style Title Bar */}
                        <div className="bg-surface-bright/50 px-4 py-3 flex items-center justify-between border-b border-border/50 select-none">
                            <div className="flex gap-2">
                                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors focus:outline-none" aria-label="Close Terminal" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="text-muted text-xs font-medium tracking-wider">
                                guest@shalini-os:~
                            </div>
                            <div className="w-12 h-4" /> {/* Spacer to balance flex layout */}
                        </div>

                        {/* Terminal Body */}
                        <div
                            className="p-4 flex-1 overflow-y-auto bg-[#0d1117] text-gray-300"
                            onClick={() => inputRef.current?.focus()}
                        >
                            <div className="space-y-1">
                                {history.map((line, i) => (
                                    <div key={i} className={`whitespace-pre-wrap ${line.type === 'error' ? 'text-red-400' : line.type === 'output' ? 'text-accent' : line.type === 'command' ? 'text-white' : 'text-gray-400'}`}>
                                        {line.content}
                                    </div>
                                ))}
                            </div>

                            {/* Active Input Line */}
                            <div className="flex items-center mt-1 text-white">
                                <span className="text-green-400 font-semibold mr-2">C:\Users\Guest&gt;</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent border-none outline-none text-white caret-white w-full"
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                            </div>

                            <div ref={bottomRef} className="h-4" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TerminalModal
