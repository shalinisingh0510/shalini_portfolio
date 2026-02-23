import nodemailer from "nodemailer"
import { createClient } from "@supabase/supabase-js"

const normalizeBody = (body) => {
  if (!body) return {}
  if (typeof body === "string") {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return body
}

const getSupabaseAdminClient = () => {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey)
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { name, email, message, website } = normalizeBody(req.body)

  // Honeypot check
  if (website) {
    return res.status(200).json({ ok: true })
  }

  const safeName = String(name || "").trim()
  const safeEmail = String(email || "").trim().toLowerCase()
  const safeMessage = String(message || "").trim()

  if (safeName.length < 2 || safeName.length > 120) {
    return res.status(400).json({ error: "Invalid name" })
  }
  if (!safeEmail.includes("@") || safeEmail.length > 160) {
    return res.status(400).json({ error: "Invalid email" })
  }
  if (safeMessage.length < 10 || safeMessage.length > 5000) {
    return res.status(400).json({ error: "Invalid message length" })
  }

  const gmailUser = process.env.GMAIL_USER || "shalinishareyasingh@gmail.com"
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const toEmail = process.env.CONTACT_TO_EMAIL || "shalinishareyasingh@gmail.com"

  if (!gmailAppPassword) {
    return res.status(500).json({
      error: "Email service is not configured. Missing GMAIL_APP_PASSWORD.",
    })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })

  const submittedAt = new Date().toISOString()

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: toEmail,
      replyTo: safeEmail,
      subject: `New Portfolio Message from ${safeName}`,
      text: [
        "You received a new message from your portfolio contact form.",
        "",
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Time: ${submittedAt}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Time:</strong> ${submittedAt}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, "<br/>")}</p>
      `,
    })

    // Auto-reply to sender (non-blocking for your primary inbox notification).
    try {
      await transporter.sendMail({
        from: `"Shalini Kumari" <${gmailUser}>`,
        to: safeEmail,
        subject: "Thanks for contacting Shalini Kumari",
        text: [
          `Hi ${safeName},`,
          "",
          "Thanks for reaching out through my portfolio website.",
          "I have received your message and will get back to you soon.",
          "",
          "Your message summary:",
          safeMessage,
          "",
          "Best regards,",
          "Shalini Kumari",
        ].join("\n"),
        html: `
          <p>Hi ${safeName},</p>
          <p>Thanks for reaching out through my portfolio website.</p>
          <p>I have received your message and will get back to you soon.</p>
          <p><strong>Your message summary:</strong></p>
          <p>${safeMessage.replace(/\n/g, "<br/>")}</p>
          <p>Best regards,<br/>Shalini Kumari</p>
        `,
      })
    } catch {
      // Intentionally ignored so sender mail issues do not fail contact submission.
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "Failed to send message",
    })
  }
}
