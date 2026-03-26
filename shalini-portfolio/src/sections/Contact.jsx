import { useState } from "react"
import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import AnimatedSection from "../components/common/AnimatedSection"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [website, setWebsite] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      message: form.message.trim(),
      website,
    }

    try {
      if (website) {
        setSuccess(true)
        setLoading(false)
        return
      }

      const { supabase } = await import("../services/supabaseClient")
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([{
          name: payload.name,
          email: payload.email,
          message: payload.message
        }])

      if (dbError) throw new Error("Could not save your message. Please try again.")

      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } catch (emailError) {
        console.warn("Email notification failed, but message was saved:", emailError)
      }

      setSuccess(true)
      setWebsite("")
      setForm({ name: "", email: "", message: "" })
    } catch (requestError) {
      setError(requestError?.message || "Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <section id="contact" aria-label="Contact section" className="py-32 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vw] bg-accent/5 blur-[120px] rounded-fluid pointer-events-none animate-float3D" />
      <div className="absolute top-[10%] right-[0%] w-[40vw] h-[40vw] bg-accent-dim/10 blur-[150px] rounded-fluid pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <SectionHeader
            title="Secure Comm Link"
            subtitle="Initiate contact to discuss projects, scale solutions, or systems engineering."
          />

          <motion.div 
            className="mt-16 p-[1px] bg-gradient-to-br from-highlight/30 via-border/10 to-accent/30 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div className="glass !bg-surface-bright/20 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-accent/10 to-transparent blur-2xl" />
              
              <form onSubmit={handleSubmit} aria-label="Contact form" className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-4">Initiator Identity</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      aria-label="Your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-surface-lowest/40 border border-white/5 focus:border-accent/40 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-4">Return Protocol (Email)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Protocol"
                      aria-label="Your email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-surface-lowest/40 border border-white/5 focus:border-highlight/40 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] focus:shadow-[0_0_15px_rgba(244,114,182,0.2)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-4">Encrypted Payload</label>
                  <textarea
                    name="message"
                    placeholder="Enter message..."
                    aria-label="Your message"
                    required
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-surface-lowest/40 border border-white/5 focus:border-accent-dim/40 rounded-3xl px-6 py-5 text-sm text-white placeholder-white/20 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] focus:outline-none resize-none"
                  />
                </div>

                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="pt-4 flex flex-col items-center">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="group relative w-full md:w-auto overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-accent via-accent-dim to-highlight px-12 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative">{loading ? "Transmitting..." : "Send Payload"}</span>
                  </button>

                  {success && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-accent font-bold drop-shadow-[0_0_5px_rgba(56,189,248,0.8)]">
                      Transmission Successful. Secure connection closed.
                    </motion.p>
                  )}

                  {error && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-highlight font-bold drop-shadow-[0_0_5px_rgba(244,114,182,0.8)]">
                      {error}
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default Contact
