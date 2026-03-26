import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import SectionHeader from "../components/common/SectionHeader"
import { fetchBlogPosts, fetchCategories, subscribeToNewsletter } from "../services/blogService"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const Blog = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [activeCategory])

    const [subEmail, setSubEmail] = useState("")
    const [subLoading, setSubLoading] = useState(false)
    const [subMessage, setSubMessage] = useState("")
    const [subStatus, setSubStatus] = useState(null)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!subEmail) return

        setSubLoading(true)
        setSubMessage("")
        setSubStatus(null)

        const result = await subscribeToNewsletter(subEmail)

        if (result.success) {
            setSubStatus("success")
            setSubMessage("Thanks for subscribing! You'll be notified of new posts.")
            setSubEmail("")
        } else {
            setSubStatus("error")
            setSubMessage(result.error)
        }

        setSubLoading(false)
    }

    const loadData = async () => {
        setLoading(true)
        const [postsData, catsData] = await Promise.all([
            fetchBlogPosts(activeCategory),
            categories.length ? Promise.resolve(categories) : fetchCategories(),
        ])
        setPosts(postsData)
        if (!categories.length) setCategories(catsData)
        setLoading(false)
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const estimateReadTime = (excerpt) => {
        const words = (excerpt || "").split(/\s+/).length
        return Math.max(3, Math.ceil(words / 40)) + " min read"
    }

    const navigateToBlog = (e, slug) => {
        e.preventDefault()
        window.history.pushState({}, "", `/blog/${slug}`)
        window.dispatchEvent(new PopStateEvent("popstate"))
    }

    return (
        <section id="blog" aria-label="Blog section" className="py-32 relative">
            <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-accent-dim/10 blur-[150px] rounded-fluid pointer-events-none animate-aurora mix-blend-screen" />
            <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-highlight/10 blur-[150px] rounded-fluid pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader
                    title="Engineers' Nexus"
                    subtitle="Technical insights on System Design, Data Structures, and scalable architectures."
                />

                <div className="flex flex-wrap gap-3 mb-16 justify-center">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-2 rounded-full text-sm font-bold backdrop-blur-md transition-all duration-300 ${!activeCategory ? "bg-accent/20 border border-accent/50 text-accent shadow-[0_0_15px_rgba(56,189,248,0.3)]" : "bg-white/5 border border-white/10 text-muted hover:bg-white/10"}`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`px-6 py-2 rounded-full text-sm font-bold backdrop-blur-md transition-all duration-300 ${activeCategory === cat.slug ? "bg-highlight/20 border border-highlight/50 text-highlight shadow-[0_0_15px_rgba(244,114,182,0.3)]" : "bg-white/5 border border-white/10 text-muted hover:bg-white/10"}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-32">
                        <div className="h-12 w-12 rounded-full border-4 border-accent/30 border-t-accent shadow-[0_0_30px_rgba(56,189,248,0.5)] animate-spin" />
                    </div>
                )}

                {!loading && posts.length > 0 && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000"
                    >
                        {posts.map((post, idx) => (
                            <motion.article key={post.id} variants={fadeUp} className="group relative transform-style-3d hover:z-20">
                                <a
                                    href={`/blog/${post.slug}`}
                                    onClick={(e) => navigateToBlog(e, post.slug)}
                                    className="block h-full p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 via-border/10 to-transparent hover:from-accent/50 hover:to-highlight/30 transition-all duration-700 w-full hover:scale-105 hover:rotate-y-[5deg] hover:rotate-x-[5deg]"
                                >
                                    <div className="h-full w-full glass-card !bg-surface-bright/20 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group-hover:bg-surface-bright/40 transition-colors">
                                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 blur-[60px] rounded-full group-hover:bg-accent/40 transition-colors duration-700" />
                                        
                                        {post.category && (
                                            <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-accent-dim/15 text-accent-dim border border-accent-dim/30 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)] mb-5">
                                                {post.category.name}
                                            </span>
                                        )}

                                        <h3 className="text-xl font-bold bg-clip-text text-white leading-snug mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r from-accent to-highlight transition-all">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-white/70 line-clamp-3 mb-6 font-light leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-5 border-t border-white/10">
                                            <div className="flex items-center justify-between text-xs text-muted font-medium mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                                                    <span>{estimateReadTime(post.excerpt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 group-hover:text-highlight transition-all">
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{post.likeCount}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-[10px] font-bold shadow-[0_0_10px_rgba(244,114,182,0.4)]">
                                                    S
                                                </span>
                                                <span>{post.author_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-32 text-muted">
                        <div className="text-6xl mb-4 opacity-50">📡</div>
                        <p className="text-2xl font-bold text-white mb-2">Systems Output Empty</p>
                        <p className="text-sm">Check back soon for new architectural insights.</p>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-32 max-w-3xl mx-auto p-[1px] rounded-[3rem] bg-gradient-to-br from-accent-dim/30 via-highlight/10 to-transparent relative z-10"
                >
                    <div className="p-10 md:p-14 rounded-[3rem] glass !bg-surface-bright/20 backdrop-blur-3xl text-center relative overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-highlight/10 to-transparent pointer-events-none blur-3xl" />
                        
                        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Architecture Updates</h3>
                        <p className="text-muted/90 text-sm md:text-base font-light mb-8 max-w-lg mx-auto leading-relaxed">
                            Subscribe to receive my latest technical deep-dives on Data Structures, Cloud Networking, and scalable software design.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="sysadmin@example.com"
                                required
                                value={subEmail}
                                onChange={(e) => setSubEmail(e.target.value)}
                                className="w-full sm:flex-1 bg-surface-lowest/50 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all font-mono"
                            />
                            <button
                                type="submit"
                                disabled={subLoading}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent to-highlight text-white text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(244,114,182,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {subLoading ? "Initializing..." : "Subscribe"}
                            </button>
                        </form>

                        {subMessage && (
                            <p className={`mt-6 text-sm font-bold tracking-wide ${subStatus === "success" ? "text-accent drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" : "text-highlight drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]"}`}>
                                {subMessage}
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Blog
