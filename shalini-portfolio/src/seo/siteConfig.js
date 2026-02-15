export const siteConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || "https://www.shalinikumari.in",
  defaultTitle: "Software Developer Portfolio",
  titleTemplate: "%s | Shalini Kumari",
  description:
    "Shalini Kumari software developer portfolio focused on DSA, problem solving, and modern web development.",
  keywords: [
    "Shalini Kumari",
    "Shalini Kumari Alard",
    "Shalini Shreya Singh",
    "SSG",
    "Shalini Developer",
    "Shalini DSA",
    "Shalini Kumari portfolio",
    "React developer portfolio",
    "Software developer portfolio",
  ],
  author: "Shalini Kumari",
  locale: "en_US",
  themeColor: "#0b1120",
  image: "/og-image.png",
  person: {
    name: "Shalini Kumari",
    alternateName: [
      "Shalini Kumari Alard",
      "Shalini Shreya Singh",
      "SSG",
      "Shalini developer",
      "Shalini DSA",
      "Shalini Kumari portfolio",
    ],
    jobTitle: "Software Developer",
    description:
      "Software developer specializing in DSA and web development.",
    sameAs: [
      "https://github.com/your-username",
      "https://www.linkedin.com/in/your-profile",
      "https://leetcode.com/u/your-username",
      "https://codeforces.com/profile/your-handle",
      "https://www.instagram.com/your-handle/",
    ],
    alumniOf: "Your College Name",
    knowsAbout: ["Data Structures", "Algorithms", "React", "Node.js", "Problem Solving"],
    nationality: "Indian",
    gender: "Female",
  },
}

export const pageMetaByHash = {
  "#about": {
    title: "About",
    description:
      "Know more about Shalini Kumari, engineering mindset, and software development journey.",
  },
  "#skills": {
    title: "Skills",
    description:
      "Technical skills of Shalini Kumari across React, Node.js, JavaScript, and DSA.",
  },
  "#projects": {
    title: "Projects",
    description:
      "Projects by Shalini Kumari showcasing scalable full-stack development and problem solving.",
  },
  "#resume": {
    title: "Resume",
    description:
      "Download Shalini Kumari's resume with software engineering, DSA, and open-source experience.",
  },
  "#contact": {
    title: "Contact",
    description:
      "Get in touch with Shalini Kumari for software engineering opportunities and collaborations.",
  },
}
