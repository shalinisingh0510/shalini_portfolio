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

    // Subscription State
    const [subEmail, setSubEmail] = useState("")
    const [subLoading, setSubLoading] = useState(false)
    const [subMessage, setSubMessage] = useState("")
    const [subStatus, setSubStatus] = useState(null) // "success" | "error"

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
        <section id="blog" aria-label="Blog section" className="py-28">
            <SectionHeader
                title="Blog"
                subtitle="Technical insights on DSA, System Design, MERN Stack, and Cloud — written from real learning experiences."
            />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`category-pill ${!activeCategory ? "category-pill--active" : ""}`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`category-pill ${activeCategory === cat.slug ? "category-pill--active" : ""}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                </div>
            )}

            {/* Blog Cards Grid */}
            {!loading && posts.length > 0 && (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {posts.map((post) => (
                        <motion.article key={post.id} variants={fadeUp}>
                            <a
                                href={`/blog/${post.slug}`}
                                onClick={(e) => navigateToBlog(e, post.slug)}
                                className="blog-card block h-full"
                            >
                                <div className="blog-card__gradient" />
                                <div className="p-6">
                                    {/* Category Badge */}
                                    {post.category && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/25 mb-3">
                                            {post.category.name}
                                        </span>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="mt-2 text-sm text-muted line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta Row */}
                                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                                        <div className="flex items-center gap-3">
                                            <span>{formatDate(post.published_at)}</span>
                                            <span className="h-1 w-1 rounded-full bg-muted/40" />
                                            <span>{estimateReadTime(post.excerpt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="h-3.5 w-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            <span>{post.likeCount}</span>
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted">
                                        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-[9px] font-bold">
                                            S
                                        </span>
                                        <span>{post.author_name} | {post.college_name}</span>
                                    </div>
                                </div>
                            </a>
                        </motion.article>
                    ))}
                </motion.div>
            )}

            {/* Empty State */}
            {!loading && posts.length === 0 && (
                <div className="text-center py-20 text-muted">
                    <p className="text-lg">No blog posts found.</p>
                    <p className="text-sm mt-2">Check back soon for new articles!</p>
                </div>
            )}

            {/* Newsletter Subscribe */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 max-w-2xl mx-auto text-center p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 border border-border/70 backdrop-blur-sm relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

                <h3 className="text-2xl font-bold mb-3">Subscribe to my Newsletter</h3>
                <p className="text-muted text-sm mb-6">
                    Get notified when I publish new articles about web development, system design, and competitive programming.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto relative z-10">
                    <input
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/80 focus:outline-none focus:ring-2 focus:ring-accent/50 transition text-sm"
                    />
                    <button
                        type="submit"
                        disabled={subLoading}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-highlight text-white text-sm font-semibold shadow-glow hover:opacity-95 transition disabled:opacity-70 whitespace-nowrap"
                    >
                        {subLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {subMessage && (
                    <p className={`mt-4 text-sm font-medium ${subStatus === "success" ? "text-emerald-500" : "text-rose-500"}`}>
                        {subMessage}
                    </p>
                )}
            </motion.div>
        </section>
    )
}

export default Blog
