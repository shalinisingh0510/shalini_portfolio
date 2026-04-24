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
    const [page, setPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(0)
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        setLoading(true)

        const [catsData] = await Promise.all([
            categories.length ? Promise.resolve(categories) : fetchCategories(),
        ])

        const result = await fetchBlogPosts(activeCategory, page, 6)
        setPosts(result.posts)
        setTotalPosts(result.total)

        if (!categories.length) setCategories(catsData)
        setLoading(false)
    }

    const totalPages = Math.max(1, Math.ceil(totalPosts / 6))

    useEffect(() => {
        setPage(1)
    }, [activeCategory])

    useEffect(() => {
        loadData()
    }, [activeCategory, page])

    useEffect(() => {
        if (page > totalPages) setPage(totalPages)
    }, [page, totalPages])

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
        <section id="blog" aria-label="Blog section" className="py-24 relative font-sans">
            <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#38bdf8]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader
                    title="Latest Articles"
                    subtitle="Insights on System Design, Data Structures, and scalable architectures."
                />

                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] ${
                            !activeCategory 
                                ? "bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white hover:scale-105" 
                                : "bg-[#0f172a] border border-white/10 text-[#94a3b8] hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] ${
                                activeCategory === cat.slug 
                                    ? "bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white hover:scale-105" 
                                    : "bg-[#0f172a] border border-white/10 text-[#94a3b8] hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-24">
                        <div className="h-8 w-8 rounded-full border-2 border-[#38bdf8] border-t-transparent animate-spin" />
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
                                    className="block h-full liquid-3d-card p-6 md:p-10 hover:shadow-[0_20px_40px_-5px_rgba(56,189,248,0.2)] hover:bg-[#1e293b]/70 transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden group/card float-3d"
                                    style={{ animationDelay: `${idx * 0.2}s` }}
                                >
                                    <div className="h-full flex flex-col relative z-10">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        
                                        {post.category && (
                                            <span className="inline-flex self-start items-center px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#0f172a] text-[#38bdf8] border border-white/10 shadow-inner mb-6">
                                                {post.category.name}
                                            </span>
                                        )}

                                        <h3 className="text-xl font-display font-bold text-white leading-snug mb-4 group-hover/card:text-[#38bdf8] transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-[#94a3b8] line-clamp-3 mb-8 leading-relaxed font-light flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/10">
                                            <div className="flex items-center justify-between text-xs text-[#64748b] mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="h-1 w-1 rounded-full bg-[#64748b]/50" />
                                                    <span>{estimateReadTime(post.excerpt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 opacity-70 group-hover/card:opacity-100 group-hover/card:text-[#38bdf8] transition-colors">
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{post.likeCount}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs">
                                                <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                                                    S
                                                </span>
                                                <span className="font-semibold text-white/90">{post.author_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-24 text-[#94a3b8] bg-[#111827]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem]">
                        <div className="text-5xl mb-6 opacity-50">📝</div>
                        <p className="text-2xl font-display font-bold text-white mb-2">No Articles Found</p>
                        <p className="text-base font-light">Check back soon for new content.</p>
                    </div>
                )}

                {!loading && totalPosts > 0 && (
                    <div className="mt-10 flex flex-wrap justify-center items-center gap-2">
                        <span className="text-sm text-[#cbd5e1] mr-3">Page {page} of {totalPages}</span>
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1
                            const isActive = page === pageNum
                            if (totalPages > 7 && Math.abs(pageNum - page) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                                if (pageNum === 2 || pageNum === totalPages - 1) {
                                    return <span key={pageNum} className="mx-1 text-sm text-[#94a3b8]">...</span>
                                }
                                return null
                            }
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-1.5 rounded-md border text-sm ${isActive ? "bg-[#38bdf8] text-black" : "bg-[#0f172a] border-white/10 text-[#94a3b8] hover:bg-[#1e293b]"}`}
                                >
                                    {pageNum}
                                </button>
                            )
                        })}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-32 max-w-2xl mx-auto liquid-3d-card w-full"
                >
                    <div className="p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
                        
                        <h3 className="text-3xl font-display font-bold text-white mb-4 z-10 relative">Stay Updated</h3>
                        <p className="text-[#94a3b8] text-base mb-10 leading-relaxed font-light z-10 relative">
                            Subscribe to receive notifications when I publish new articles about technical implementations and architectural design.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                value={subEmail}
                                onChange={(e) => setSubEmail(e.target.value)}
                                className="w-full sm:flex-1 bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/50 shadow-inner transition-all"
                            />
                            <button
                                type="submit"
                                disabled={subLoading}
                                className="w-full sm:w-auto px-8 py-4 liquid-btn-primary disabled:opacity-70 text-sm tracking-widest uppercase font-bold text-white"
                            >
                                {subLoading ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>

                        {subMessage && (
                            <p className={`mt-6 text-sm font-semibold tracking-wide ${subStatus === "success" ? "text-emerald-400" : "text-rose-400"} z-10 relative`}>
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
