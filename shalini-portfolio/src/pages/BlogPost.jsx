import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { fetchBlogPost, likeBlogPost, isPostLiked, addComment } from "../services/blogService"
import Card from "../components/ui/Card"

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

    const handleShareTwitter = () => {
        const url = encodeURIComponent(window.location.href)
        const text = encodeURIComponent(post?.title || "")
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
    }

    const handleShareLinkedIn = () => {
        const url = encodeURIComponent(window.location.href)
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
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

    // Render markdown-like content as basic HTML
    const renderContent = (content) => {
        if (!content) return ""

        let html = content
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                return `<pre class="blog-code-block"><code class="language-${lang || ""}">${escapeHtml(code.trim())}</code></pre>`
            })
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="blog-inline-code">$1</code>')
            // Headers
            .replace(/^### (.+)$/gm, '<h4 class="blog-h4">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
            .replace(/^# (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            // Italic
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")
            // HR
            .replace(/^---$/gm, '<hr class="blog-hr" />')
            // Tables
            .replace(/^\|(.+)\|$/gm, (match) => {
                const cells = match.split("|").filter(Boolean).map((c) => c.trim())
                if (cells.every((c) => /^[-:]+$/.test(c))) return "" // separator row
                const tag = "td"
                return `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join("")}</tr>`
            })
            // Unordered lists
            .replace(/^- (.+)$/gm, '<li class="blog-li">$1</li>')
            // Ordered lists
            .replace(/^\d+\. (.+)$/gm, '<li class="blog-li">$1</li>')
            // Paragraphs (lines not already wrapped)
            .replace(/^(?!<[htuplroi]|$)(.+)$/gm, "<p>$1</p>")

        // Wrap consecutive <tr> in <table>
        html = html.replace(/((<tr>.*?<\/tr>\s*)+)/g, '<table class="blog-table">$1</table>')
        // Wrap consecutive <li> in <ul>
        html = html.replace(/((<li.*?<\/li>\s*)+)/g, '<ul class="blog-ul">$1</ul>')

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
            <div className="flex items-center justify-center py-32">
                <div className="h-8 w-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-32">
                <h2 className="text-2xl font-bold">Post Not Found</h2>
                <p className="text-muted mt-2">This blog post doesn't exist or has been removed.</p>
                <a href="/blog" onClick={goBack} className="inline-flex items-center gap-2 mt-4 text-accent hover:underline">
                    ← Back to Blog
                </a>
            </div>
        )
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
        >
            {/* Back Button */}
            <a
                href="/blog"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition mb-8"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
            </a>

            {/* Category + Date */}
            <div className="flex items-center gap-3 mb-4">
                {post.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
                        {post.category.name}
                    </span>
                )}
                <span className="text-xs text-muted">{formatDate(post.published_at)}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="text-gradient">{post.title}</span>
            </h1>

            {/* Author Badge */}
            <div className="mt-4 flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-sm font-bold shadow-glow">
                    S
                </span>
                <div>
                    <p className="text-sm font-semibold">{post.author_name}</p>
                    <p className="text-xs text-muted">{post.college_name}</p>
                </div>
            </div>

            {/* Content */}
            <div
                className="mt-8 blog-content"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
            />

            {/* Interactions Bar */}
            <div className="mt-10 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        className={`like-btn ${liked ? "like-btn--active" : ""}`}
                    >
                        <svg className="h-5 w-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                    </button>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-2">
                        <button onClick={handleCopyLink} className="share-btn">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            {copied ? "Copied!" : "Copy Link"}
                        </button>
                        <button onClick={handleShareTwitter} className="share-btn">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter
                        </button>
                        <button onClick={handleShareLinkedIn} className="share-btn">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-6">
                    Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                <Card className="mb-8">
                    <form onSubmit={handleComment} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            minLength={2}
                            maxLength={100}
                            value={commentForm.name}
                            onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                            className="comment-input"
                        />
                        <textarea
                            placeholder="Write a comment..."
                            required
                            minLength={2}
                            maxLength={2000}
                            rows={3}
                            value={commentForm.text}
                            onChange={(e) => setCommentForm((f) => ({ ...f, text: e.target.value }))}
                            className="comment-input"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-accent to-highlight text-white shadow-glow hover:opacity-95 transition disabled:opacity-60"
                        >
                            {submitting ? "Posting..." : "Post Comment"}
                        </button>
                    </form>
                </Card>

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl border border-border/70 bg-card/65 backdrop-blur p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="h-7 w-7 rounded-full bg-gradient-to-br from-accent/60 to-highlight/60 flex items-center justify-center text-white text-[10px] font-bold">
                                        {comment.commenter_name?.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-sm font-semibold">{comment.commenter_name}</span>
                                </div>
                                <span className="text-xs text-muted">{timeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-sm text-muted leading-relaxed">{comment.comment_text}</p>
                        </motion.div>
                    ))}

                    {comments.length === 0 && (
                        <p className="text-center text-muted py-8">No comments yet. Be the first to share your thoughts!</p>
                    )}
                </div>
            </div>
        </motion.article>
    )
}

export default BlogPost
