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
        <section id="blog" aria-label="Blog section" className="py-24 relative">
            <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader
                    title="Latest Articles"
                    subtitle="Insights on System Design, Data Structures, and scalable architectures."
                />

                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                            !activeCategory 
                                ? "bg-accent text-white shadow-md shadow-accent/20" 
                                : "bg-surface-bright/50 border border-border/50 text-muted hover:bg-surface-bright"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                activeCategory === cat.slug 
                                    ? "bg-accent text-white shadow-md shadow-accent/20" 
                                    : "bg-surface-bright/50 border border-border/50 text-muted hover:bg-surface-bright"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-24">
                        <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    </div>
                )}

                {!loading && posts.length > 0 && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {posts.map((post, idx) => (
                            <motion.article key={post.id} variants={fadeUp} className="group relative">
                                <a
                                    href={`/blog/${post.slug}`}
                                    onClick={(e) => navigateToBlog(e, post.slug)}
                                    className="block h-full liquid-3d-card p-6 border-white/10 hover:shadow-xl hover:bg-[#1e293b]/70 transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden group/card"
                                >
                                    <div className="h-full flex flex-col relative">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        
                                        {post.category && (
                                            <span className="inline-flex self-start items-center px-3 py-1 rounded-md text-xs font-semibold bg-surface-bright text-accent border border-border/50 mb-4">
                                                {post.category.name}
                                            </span>
                                        )}

                                        <h3 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-muted line-clamp-3 mb-6 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-border/50">
                                            <div className="flex items-center justify-between text-xs text-muted mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                                                    <span>{estimateReadTime(post.excerpt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 group-hover:text-accent transition-colors">
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{post.likeCount}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">
                                                    S
                                                </span>
                                                <span className="font-semibold text-foreground/80">{post.author_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-24 text-muted bg-surface-lowest/50 border border-border/50 rounded-2xl backdrop-blur-md">
                        <div className="text-4xl mb-4 opacity-50">📝</div>
                        <p className="text-xl font-bold text-foreground mb-2">No Articles Found</p>
                        <p className="text-sm">Check back soon for new content.</p>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 max-w-2xl mx-auto liquid-3d-card"
                >
                    <div className="p-10 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
                        
                        <h3 className="text-2xl font-bold text-foreground mb-3">Stay Updated</h3>
                        <p className="text-muted text-sm mb-8 leading-relaxed">
                            Subscribe to receive notifications when I publish new articles about technical implementations and architectural design.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                value={subEmail}
                                onChange={(e) => setSubEmail(e.target.value)}
                                className="w-full sm:flex-1 bg-[#0f172a]/50 border border-white/20 rounded-xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-[#38bdf8] transition-all"
                            />
                            <button
                                type="submit"
                                disabled={subLoading}
                                className="w-full sm:w-auto px-8 py-4 liquid-btn-primary disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {subLoading ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>

                        {subMessage && (
                            <p className={`mt-4 text-sm font-medium ${subStatus === "success" ? "text-green-500" : "text-red-500"}`}>
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
