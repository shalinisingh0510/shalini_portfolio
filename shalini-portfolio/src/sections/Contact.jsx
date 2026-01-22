import { useState } from "react"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import AnimatedSection from "../components/common/AnimatedSection"
import { supabase } from "../services/supabaseClient"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from("contact_messages")
      .insert([form])

    if (error) {
      setError("Something went wrong. Please try again.")
    } else {
      setSuccess(true)
      setForm({ name: "", email: "", message: "" })
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="py-28">
      <AnimatedSection>
        <SectionHeader
          title="Contact"
          subtitle="Have an opportunity or want to connect? Send a message."
        />

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-background border border-white/10 focus:outline-none focus:border-accent"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-background border border-white/10 focus:outline-none focus:border-accent"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-background border border-white/10 focus:outline-none focus:border-accent"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-md bg-accent text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-400 text-sm">
                Message sent successfully!
              </p>
            )}

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

          </form>
        </Card>
      </AnimatedSection>
    </section>
  )
}

export default Contact
