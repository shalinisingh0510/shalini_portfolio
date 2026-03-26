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

        // MUST USE `class="..."` instead of `className` for raw HTML parsing
        let html = content
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                return `<pre class="p-6 my-8 bg-[#0a0f18] rounded-2xl border border-white/10 shadow-inner overflow-x-auto"><code class="text-sm font-mono text-[#f8fafc] leading-relaxed">${escapeHtml(code.trim())}</code></pre>`
            })
            .replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded-lg bg-[#1e293b] border border-white/10 text-[#38bdf8] font-mono text-sm shadow-sm">$1</code>')
            .replace(/^### (.+)$/gm, '<h4 class="text-2xl font-display font-bold mt-10 mb-5 text-white tracking-tight">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 class="text-3xl font-display font-bold mt-12 mb-6 text-white tracking-tight">$1</h3>')
            .replace(/^# (.+)$/gm, '<h2 class="text-4xl lg:text-5xl font-display font-extrabold mt-16 mb-8 text-white tracking-tight leading-tight">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="text-white/80 italic">$1</em>')
            .replace(/^---$/gm, '<hr class="my-12 border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.05)]" />')
            .replace(/^\|(.+)\|$/gm, (match) => {
                const cells = match.split("|").filter(Boolean).map((c) => c.trim())
                if (cells.every((c) => /^[-:]+$/.test(c))) return ""
                const tag = "td"
                return `<tr>${cells.map((c) => `<${tag} class="border border-white/10 p-4 text-[#94a3b8] font-light">${c}</${tag}>`).join("")}</tr>`
            })
            .replace(/^- (.+)$/gm, '<li class="flex items-start gap-4 my-3 text-[#94a3b8] leading-relaxed font-light"><span class="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)] shrink-0"></span><span>$1</span></li>')
            .replace(/^\d+\. (.+)$/gm, '<li class="flex items-start gap-3 my-3 text-[#94a3b8] leading-relaxed font-light"><span class="mt-0.5 text-[#38bdf8] font-bold shrink-0">#</span><span>$1</span></li>')
            .replace(/^(?!<[htuplroidv]|tr|$)(.+)$/gm, '<p class="text-[#94a3b8] leading-[1.8] my-6 font-light text-lg">$1</p>')


        html = html.replace(/((<tr>.*?<\/tr>\s*)+)/g, '<div class="overflow-x-auto my-10"><table class="w-full text-left border-collapse border border-white/10 bg-[#0f172a] rounded-2xl shadow-inner">$1</table></div>')
        html = html.replace(/((<li.*?<\/li>\s*)+)/g, '<ul class="my-6 space-y-2">$1</ul>')
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
                <div className="h-10 w-10 rounded-full border-4 border-[#38bdf8] border-t-transparent animate-spin drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-32 liquid-3d-card m-6">
                <h2 className="text-3xl font-display font-bold text-white">Post Not Found</h2>
                <p className="text-[#94a3b8] mt-4 font-light">This article doesn't exist.</p>
                <a href="/blog" onClick={goBack} className="inline-flex items-center gap-2 mt-8 text-[#38bdf8] font-bold tracking-widest uppercase text-sm hover:underline">
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
            className="max-w-4xl mx-auto py-16 px-6 relative font-sans"
        >
            <a
                href="/blog"
                onClick={goBack}
                className="inline-flex items-center gap-3 text-sm font-semibold text-[#94a3b8] hover:text-white transition-colors mb-10 group"
            >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e293b] border border-white/10 group-hover:border-[#38bdf8]/50 shadow-inner group-hover:bg-[#38bdf8]/10 transition-all">
                  <svg className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                Back to Articles
            </a>

            <div className="liquid-3d-card p-10 md:p-16 relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute -inset-10 bg-gradient-to-br from-[#38bdf8]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    {post.category && (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#0f172a] text-[#38bdf8] border border-white/10 shadow-inner">
                            {post.category.name}
                        </span>
                    )}
                    <span className="text-sm font-medium text-[#64748b]">{formatDate(post.published_at)}</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] mb-10 text-white drop-shadow-md relative z-10">
                    {post.title}
                </h1>

                <div className="flex items-center gap-5 py-6 border-y border-white/10 mb-12 relative z-10">
                    <span className="h-12 w-12 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-white text-xl font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                        S
                    </span>
                    <div>
                        <p className="text-lg font-bold text-white tracking-wide">{post.author_name}</p>
                        <p className="text-sm text-[#94a3b8]">{post.college_name}</p>
                    </div>
                </div>

                <div
                    className="relative z-10 markdown-body"
                    dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                />

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 relative z-10">
                    <button
                        onClick={handleLike}
                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] ${liked ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]" : "bg-[#0f172a] border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20"}`}
                    >
                        <svg className={`h-6 w-6 ${liked ? "fill-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" : "fill-none"}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm uppercase tracking-widest">{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                    </button>

                    <button onClick={handleCopyLink} className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 bg-[#0f172a] text-sm font-bold uppercase tracking-widest text-[#94a3b8] hover:text-white hover:border-white/20 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] transition-all">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        {copied ? "Link Copied" : "Share"}
                    </button>
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-3xl font-display font-bold text-white mb-10">
                    Comments ({comments.length})
                </h3>

                <form onSubmit={handleComment} className="mb-12 p-8 md:p-12 liquid-3d-card space-y-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        minLength={2}
                        maxLength={100}
                        value={commentForm.name}
                        onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#0a0f18] border border-white/10 focus:border-[#38bdf8]/50 shadow-inner rounded-xl px-6 py-4 text-base text-white placeholder-[#64748b] transition-all focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/30"
                    />
                    <textarea
                        placeholder="Write your thoughts..."
                        required
                        minLength={2}
                        maxLength={2000}
                        rows={4}
                        value={commentForm.text}
                        onChange={(e) => setCommentForm((f) => ({ ...f, text: e.target.value }))}
                        className="w-full bg-[#0a0f18] border border-white/10 focus:border-[#38bdf8]/50 shadow-inner rounded-xl px-6 py-4 text-base text-white placeholder-[#64748b] transition-all focus:outline-none resize-none focus:ring-1 focus:ring-[#38bdf8]/30"
                    />
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="liquid-btn-primary px-10 py-4 text-sm font-bold tracking-widest uppercase disabled:opacity-70"
                        >
                            {submitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </form>

                <div className="space-y-6">
                    {comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-8 liquid-3d-card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="h-10 w-10 rounded-xl bg-[#0f172a] shadow-inner border border-white/10 flex items-center justify-center text-[#38bdf8] text-sm font-bold">
                                        {comment.commenter_name?.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-base font-bold text-white tracking-wide">{comment.commenter_name}</span>
                                </div>
                                <span className="text-sm font-medium text-[#64748b]">{timeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-base text-[#94a3b8] leading-relaxed mt-2 font-light">{comment.comment_text}</p>
                        </motion.div>
                    ))}

                    {comments.length === 0 && (
                        <div className="text-center py-12 liquid-3d-card">
                            <p className="text-[#94a3b8] text-lg font-light">No comments yet. Start the conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    )
}

export default BlogPost
