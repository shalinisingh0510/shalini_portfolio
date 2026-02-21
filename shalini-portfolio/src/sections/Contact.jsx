import { useState } from "react"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import AnimatedSection from "../components/common/AnimatedSection"
import Button from "../components/common/Button"

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.")
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
    <section id="contact" aria-label="Contact section" className="py-28">
      <AnimatedSection>
        <SectionHeader
          title="Contact"
          subtitle="Have an opportunity or want to connect? Send a message."
        />

        <Card>
          <form onSubmit={handleSubmit} aria-label="Contact form" className="space-y-4 max-w-xl">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              aria-label="Your name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-card/70 border border-border/70 focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              aria-label="Your email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-card/70 border border-border/70 focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              aria-label="Your message"
              required
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-card/70 border border-border/70 focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
            />

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

            <Button type="submit" disabled={loading} className="disabled:opacity-60">
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {success && (
              <p className="text-emerald-500 text-sm">
                Message sent successfully!
              </p>
            )}

            {error && (
              <p className="text-rose-500 text-sm">
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
