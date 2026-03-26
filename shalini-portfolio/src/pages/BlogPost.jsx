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
                return `<pre className="p-4 my-6 bg-surface-lowest/50 rounded-xl border border-border/50 overflow-x-auto"><code className="text-sm font-mono text-foreground">${escapeHtml(code.trim())}</code></pre>`
            })
            .replace(/`([^`]+)`/g, '<code className="px-1.5 py-0.5 rounded-md bg-surface-bright/50 border border-border/50 text-accent font-mono text-sm">$1</code>')
            .replace(/^### (.+)$/gm, '<h4 className="text-xl font-bold mt-8 mb-4 tracking-tight">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 className="text-2xl font-bold mt-10 mb-5 tracking-tight">$1</h3>')
            .replace(/^# (.+)$/gm, '<h2 className="text-3xl font-extrabold mt-12 mb-6 tracking-tight">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong className="font-bold text-foreground">$1</strong>')
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em className="text-foreground/80 italic">$1</em>')
            .replace(/^---$/gm, '<hr className="my-10 border-border/50" />')
            .replace(/^\|(.+)\|$/gm, (match) => {
                const cells = match.split("|").filter(Boolean).map((c) => c.trim())
                if (cells.every((c) => /^[-:]+$/.test(c))) return ""
                const tag = "td"
                return `<tr>${cells.map((c) => `<${tag} className="border border-border/50 p-3">${c}</${tag}>`).join("")}</tr>`
            })
            .replace(/^- (.+)$/gm, '<li className="flex items-start gap-2 my-1"><span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0 text-transparent">.</span><span className="text-muted leading-relaxed">$1</span></li>')
            .replace(/^\d+\. (.+)$/gm, '<li className="flex items-start gap-2 my-1"><span className="mt-0.5 text-accent text-sm font-bold shrink-0">#</span><span className="text-muted leading-relaxed">$1</span></li>')
            .replace(/^(?!<[htuplroi]|$)(.+)$/gm, '<p className="text-muted leading-relaxed my-5">$1</p>')

        html = html.replace(/((<tr>.*?<\/tr>\s*)+)/g, '<div className="overflow-x-auto my-8"><table className="w-full text-left border-collapse border border-border/50 rounded-lg">$1</table></div>')
        html = html.replace(/((<li.*?<\/li>\s*)+)/g, '<ul className="my-4 space-y-1">$1</ul>')
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
                <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-32">
                <h2 className="text-3xl font-bold text-foreground">Post Not Found</h2>
                <p className="text-muted mt-2">This article doesn't exist.</p>
                <a href="/blog" onClick={goBack} className="inline-flex items-center gap-2 mt-8 text-accent font-medium hover:underline">
                    ← Back to Blog
                </a>
            </div>
        )
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto py-16 px-6 relative"
        >
            <a
                href="/blog"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-10"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Articles
            </a>

            <div className="liquid-3d-card p-8 md:p-14 relative overflow-hidden group">
                {/* Physical Glass Inset Overlay for Depth */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute -inset-10 bg-gradient-to-br from-[#38bdf8]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
                <div className="flex items-center gap-4 mb-6">
                    {post.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-widest bg-surface-bright text-accent border border-border/50">
                            {post.category.name}
                        </span>
                    )}
                    <span className="text-sm font-medium text-muted">{formatDate(post.published_at)}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8 text-foreground">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 py-4 border-y border-border/50 mb-8">
                    <span className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white text-lg font-bold">
                        S
                    </span>
                    <div>
                        <p className="text-base font-semibold text-foreground">{post.author_name}</p>
                        <p className="text-sm text-muted">{post.college_name}</p>
                    </div>
                </div>

                <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                />

                <div className="mt-12 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={handleLike}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${liked ? "bg-accent/20 text-accent border border-accent/30" : "bg-surface-bright/50 border border-border/50 text-muted hover:text-foreground hover:bg-surface-bright"}`}
                    >
                        <svg className={`h-5 w-5 ${liked ? "fill-accent" : "fill-none"}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                    </button>

                    <button onClick={handleCopyLink} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/50 bg-surface-bright/50 text-sm font-medium text-muted hover:text-foreground hover:bg-surface-bright transition-colors">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        {copied ? "Link Copied" : "Copy Link"}
                    </button>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-display font-bold text-white mb-8">
                    Comments ({comments.length})
                </h3>

                <form onSubmit={handleComment} className="mb-12 p-8 liquid-3d-card space-y-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        minLength={2}
                        maxLength={100}
                        value={commentForm.name}
                        onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#0f172a]/50 border border-white/10 focus:border-[#38bdf8]/50 rounded-xl px-5 py-4 text-sm text-[#f8fafc] placeholder-[#94a3b8]/50 transition-all focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/50"

                    />
                    <textarea
                        placeholder="Write a comment..."
                        required
                        minLength={2}
                        maxLength={2000}
                        rows={3}
                        value={commentForm.text}
                        onChange={(e) => setCommentForm((f) => ({ ...f, text: e.target.value }))}
                        className="w-full bg-[#0f172a]/50 border border-white/10 focus:border-[#38bdf8]/50 rounded-xl px-5 py-4 text-sm text-[#f8fafc] placeholder-[#94a3b8]/50 transition-all focus:outline-none resize-none focus:ring-1 focus:ring-[#38bdf8]/50"

                    />
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="liquid-btn-primary px-8 py-3.5 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {submitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-6 liquid-3d-card"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="h-7 w-7 rounded-sm bg-accent/20 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                                        {comment.commenter_name?.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-sm font-bold text-foreground">{comment.commenter_name}</span>
                                </div>
                                <span className="text-xs text-muted">{timeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-sm text-muted leading-relaxed mt-2">{comment.comment_text}</p>
                        </motion.div>
                    ))}

                    {comments.length === 0 && (
                        <div className="text-center py-10 bg-surface-lowest/20 rounded-xl border border-dashed border-border/50">
                            <p className="text-muted text-sm">No comments yet. Start the conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    )
}

export default BlogPost
