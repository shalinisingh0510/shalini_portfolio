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
    <section id="contact" aria-label="Contact section" className="py-24 relative overflow-hidden bg-[#0a0f18]">
      <div className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] bg-[#38bdf8]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <SectionHeader
            title="Get in Touch"
            subtitle="I'm currently available for professional opportunities. Feel free to reach out if you'd like to collaborate."
          />

          <motion.div 
            className="mt-12 liquid-3d-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -inset-10 bg-gradient-to-br from-[#38bdf8]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
              <form onSubmit={handleSubmit} aria-label="Contact form" className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#94a3b8] ml-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      aria-label="Your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#1f2937]/50 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#94a3b8] ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      aria-label="Your email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#1f2937]/50 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#94a3b8] ml-1">Message</label>
                  <textarea
                    name="message"
                    placeholder="How can I help you?"
                    aria-label="Your message"
                    required
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-[#1f2937]/50 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/50 resize-none"
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

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full sm:w-auto liquid-btn-primary px-10 py-4 disabled:opacity-70"
                  >
                    {loading ? "Sending Status..." : "Send Message"}
                  </button>

                  {success && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-500 font-medium text-sm">
                      Message sent successfully! I'll get back to you soon.
                    </motion.p>
                  )}

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-500 font-medium text-sm">
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
