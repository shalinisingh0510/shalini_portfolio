import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { fetchBlogPost, likeBlogPost, isPostLiked, addComment } from "../services/blogService"

const BlogPost = ({ slug }) => {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [comments, setComments] = useState([])
    const [commentForm, setCommentForm] = useState({ name: "", text: "" })
    const [submitting, setSubmitting] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        loadPost()
    }, [slug])

    const loadPost = async () => {
        setLoading(true)
        const data = await fetchBlogPost(slug)
        if (data) {
            setPost(data)
            setLikeCount(data.likeCount)
            setComments(data.comments || [])
            setLiked(isPostLiked(data.id))
        }
        setLoading(false)
    }

    const handleLike = async () => {
        if (!post) return
        const result = await likeBlogPost(post.id)
        setLiked(result.liked)
        setLikeCount((prev) => (result.liked ? prev + 1 : Math.max(0, prev - 1)))
    }

    const handleComment = async (e) => {
        e.preventDefault()
        if (!post || submitting) return
        setSubmitting(true)

        const newComment = await addComment(post.id, commentForm.name, commentForm.text)
        if (newComment) {
            setComments((prev) => [newComment, ...prev])
            setCommentForm({ name: "", text: "" })
        }
        setSubmitting(false)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const goBack = (e) => {
        e.preventDefault()
        window.history.pushState({}, "", "/blog")
        window.dispatchEvent(new PopStateEvent("popstate"))
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime()
        const minutes = Math.floor(diff / 60000)
        if (minutes < 60) return `${minutes}m ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        const days = Math.floor(hours / 24)
        if (days < 30) return `${days}d ago`
        return formatDate(dateStr)
    }

    const renderContent = (content) => {
        if (!content) return ""

        let html = content
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                return `<pre class="p-6 my-6 bg-surface-lowest/50 rounded-2xl border border-white/5 overflow-x-auto"><code class="text-sm font-mono text-accent/90">${escapeHtml(code.trim())}</code></pre>`
            })
            .replace(/`([^`]+)`/g, '<code class="px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-mono text-sm">$1</code>')
            .replace(/^### (.+)$/gm, '<h4 class="text-xl font-bold mt-8 mb-4 tracking-tight">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 class="text-2xl font-bold mt-10 mb-5 tracking-tight">$1</h3>')
            .replace(/^# (.+)$/gm, '<h2 class="text-3xl font-extrabold mt-12 mb-6 tracking-tight">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-extrabold text-white/90">$1</strong>')
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="text-highlight/90">$1</em>')
            .replace(/^---$/gm, '<hr class="my-10 border-white/10" />')
            .replace(/^\|(.+)\|$/gm, (match) => {
                const cells = match.split("|").filter(Boolean).map((c) => c.trim())
                if (cells.every((c) => /^[-:]+$/.test(c))) return ""
                const tag = "td"
                return `<tr>${cells.map((c) => `<${tag} class="border border-white/10 p-3">${c}</${tag}>`).join("")}</tr>`
            })
            .replace(/^- (.+)$/gm, '<li class="flex items-start gap-3 my-2"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-highlight shrink-0"></span><span class="text-muted/90 leading-relaxed">$1</span></li>')
            .replace(/^\d+\. (.+)$/gm, '<li class="flex items-start gap-3 my-2"><span class="mt-1 h-5 w-5 rounded-full bg-accent/10 border border-accent/30 text-[10px] flex items-center justify-center font-bold text-accent shrink-0 text-center">#</span><span class="text-muted/90 leading-relaxed mt-0.5">$1</span></li>')
            .replace(/^(?!<[htuplroi]|$)(.+)$/gm, '<p class="text-muted/90 leading-relaxed my-5 font-light">$1</p>')

        html = html.replace(/((<tr>.*?<\/tr>\s*)+)/g, '<div class="overflow-x-auto my-8"><table class="w-full text-left border-collapse">$1</table></div>')
        html = html.replace(/((<li.*?<\/li>\s*)+)/g, '<ul class="my-6 space-y-1">$1</ul>')
        return html
    }

    const escapeHtml = (str) => {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="h-12 w-12 rounded-full border-4 border-highlight/30 border-t-highlight shadow-[0_0_30px_rgba(244,114,182,0.5)] animate-spin" />
                <p className="text-sm font-bold tracking-widest text-highlight uppercase animate-pulse">Decrypting Payload...</p>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-32">
                <div className="text-6xl mb-4 opacity-50">⚠️</div>
                <h2 className="text-3xl font-bold bg-clip-text text-white">Node Not Found</h2>
                <p className="text-muted mt-2">This resource doesn't exist or has been relocated.</p>
                <a href="/blog" onClick={goBack} className="inline-flex items-center gap-2 mt-8 text-accent font-bold hover:text-white transition-colors">
                    ← Return to Nexus
                </a>
            </div>
        )
    }

    return (
        <motion.article
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto py-16 relative"
        >
            {/* Background Orbs */}
            <div className="absolute top-[0%] -left-[20%] w-[50vw] h-[50vw] bg-accent/10 blur-[150px] rounded-fluid pointer-events-none mix-blend-screen" />
            <div className="absolute top-[30%] -right-[20%] w-[40vw] h-[40vw] bg-highlight/10 blur-[150px] rounded-fluid pointer-events-none mix-blend-screen animate-aurora" />

            {/* Back Button */}
            <a
                href="/blog"
                onClick={goBack}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-surface-bright/30 backdrop-blur-md text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all mb-12 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 relative"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Return to Modules
            </a>

            {/* Main Post Container */}
            <div className="p-[1px] rounded-[3rem] bg-gradient-to-br from-highlight/30 via-border/10 to-accent/20 relative z-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                <div className="glass !bg-surface-bright/20 backdrop-blur-3xl rounded-[3rem] p-8 md:p-14 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Meta Row */}
                    <div className="flex items-center gap-4 mb-6">
                        {post.category && (
                            <span className="inline-flex items-center px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-highlight/10 text-highlight border border-highlight/20 shadow-[0_0_15px_rgba(244,114,182,0.3)]">
                                {post.category.name}
                            </span>
                        )}
                        <span className="text-sm font-medium text-white/50">{formatDate(post.published_at)}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                        {post.title}
                    </h1>

                    {/* Author Badge */}
                    <div className="flex items-center gap-4 py-6 border-y border-white/5 mb-10">
                        <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-lg font-black shadow-[0_0_20px_rgba(56,189,248,0.4)] transform -rotate-3">
                            S
                        </span>
                        <div>
                            <p className="text-base font-bold text-white/90">{post.author_name}</p>
                            <p className="text-sm text-accent-dim font-medium tracking-wide">{post.college_name}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div
                        className="text-lg"
                        dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                    />

                    {/* Interactions Bar */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                        <button
                            onClick={handleLike}
                            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300 ${liked ? "bg-highlight/20 border-highlight/50 text-highlight shadow-[0_0_20px_rgba(244,114,182,0.4)]" : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"} border`}
                        >
                            <svg className={`h-5 w-5 ${liked ? "fill-highlight scale-110" : "fill-none"} transition-transform group-hover:scale-110`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{likeCount} {likeCount === 1 ? "Endorsement" : "Endorsements"}</span>
                        </button>

                        <button onClick={handleCopyLink} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-surface-lowest/50 text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            {copied ? "Link Copied." : "Copy Protocol Link"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-16 relative z-10 w-full max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-2xl font-black text-white">
                        Review Signals
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="text-accent font-mono font-bold">{comments.length} packets</span>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleComment} className="mb-12 p-8 rounded-[2.5rem] bg-surface-lowest/40 border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] space-y-4">
                    <input
                        type="text"
                        placeholder="Ident (Your Name)"
                        required
                        minLength={2}
                        maxLength={100}
                        value={commentForm.name}
                        onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent/40 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    />
                    <textarea
                        placeholder="Transmit your message..."
                        required
                        minLength={2}
                        maxLength={2000}
                        rows={4}
                        value={commentForm.text}
                        onChange={(e) => setCommentForm((f) => ({ ...f, text: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 focus:border-highlight/40 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:shadow-[0_0_15px_rgba(244,114,182,0.2)] resize-none"
                    />
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest bg-gradient-to-r from-accent to-highlight text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {submitting ? "Uploading..." : "Transmit Signal"}
                        </button>
                    </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-3xl bg-surface-bright/20 border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-colors"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center justify-between mb-3 pl-3">
                                <div className="flex items-center gap-3">
                                    <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-white/90 text-xs font-bold shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                        {comment.commenter_name?.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-sm font-bold text-white/90">{comment.commenter_name}</span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-white/40 uppercase bg-black/20 px-2 py-1 rounded-md">{timeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed pl-3">{comment.comment_text}</p>
                        </motion.div>
                    ))}

                    {comments.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-[2.5rem] bg-surface-lowest/20">
                            <p className="text-white/40 font-mono text-sm">No signals detected in this sector.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    )
}

export default BlogPost
