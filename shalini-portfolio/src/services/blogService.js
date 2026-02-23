import { supabase } from "./supabaseClient"

const LIKE_KEY_PREFIX = "blog_liked_"

/**
 * Fetch all published blog posts with like counts and category info
 */
export async function fetchBlogPosts(categorySlug = null) {
    let query = supabase
        .from("blog_posts")
        .select(`
      id, slug, title, excerpt, author_name, college_name,
      published_at, created_at,
      blog_categories ( slug, name ),
      blog_likes ( id )
    `)
        .eq("is_published", true)
        .order("published_at", { ascending: false })

    if (categorySlug) {
        query = query.eq("blog_categories.slug", categorySlug)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error fetching blog posts:", error)
        return []
    }

    // Filter out posts that don't match category (supabase returns nulls for the join)
    let posts = data || []
    if (categorySlug) {
        posts = posts.filter((p) => p.blog_categories?.slug === categorySlug)
    }

    return posts.map((post) => ({
        ...post,
        category: post.blog_categories,
        likeCount: post.blog_likes?.length || 0,
        blog_categories: undefined,
        blog_likes: undefined,
    }))
}

/**
 * Fetch a single blog post by slug with full content, comments, and like count
 */
export async function fetchBlogPost(slug) {
    const { data, error } = await supabase
        .from("blog_posts")
        .select(`
      id, slug, title, excerpt, content, author_name, college_name,
      published_at, created_at, seo_title, seo_description,
      blog_categories ( slug, name ),
      blog_likes ( id ),
      blog_comments ( id, commenter_name, comment_text, created_at )
    `)
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

    if (error || !data) {
        console.error("Error fetching blog post:", error)
        return null
    }

    return {
        ...data,
        category: data.blog_categories,
        likeCount: data.blog_likes?.length || 0,
        comments: (data.blog_comments || []).sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
        blog_categories: undefined,
        blog_likes: undefined,
        blog_comments: undefined,
    }
}

/**
 * Fetch all blog categories
 */
export async function fetchCategories() {
    const { data, error } = await supabase
        .from("blog_categories")
        .select("id, slug, name")
        .order("name")

    if (error) {
        console.error("Error fetching categories:", error)
        return []
    }
    return data || []
}

/**
 * Like a blog post (deduplicated by localStorage fingerprint)
 */
export async function likeBlogPost(postId) {
    const fingerprint = getFingerprint()
    const storageKey = LIKE_KEY_PREFIX + postId

    // Check if already liked via localStorage
    if (localStorage.getItem(storageKey)) {
        // Unlike: remove
        await supabase
            .from("blog_likes")
            .delete()
            .eq("post_id", postId)
            .eq("fingerprint", fingerprint)

        localStorage.removeItem(storageKey)
        return { liked: false }
    }

    // Like
    const { error } = await supabase
        .from("blog_likes")
        .insert({ post_id: postId, fingerprint })

    if (error) {
        console.error("Error liking post:", error)
        return { liked: false }
    }

    localStorage.setItem(storageKey, "1")
    return { liked: true }
}

/**
 * Check if user has liked a post
 */
export function isPostLiked(postId) {
    return !!localStorage.getItem(LIKE_KEY_PREFIX + postId)
}

/**
 * Add a comment to a blog post
 */
export async function addComment(postId, commenterName, commentText) {
    const { data, error } = await supabase
        .from("blog_comments")
        .insert({
            post_id: postId,
            commenter_name: commenterName.trim(),
            comment_text: commentText.trim(),
        })
        .select()
        .single()

    if (error) {
        console.error("Error adding comment:", error)
        return null
    }
    return data
}

/**
 * Simple fingerprint based on browser info
 */
function getFingerprint() {
    const nav = window.navigator
    const raw = [
        nav.userAgent,
        nav.language,
        screen.width,
        screen.height,
        new Date().getTimezoneOffset(),
    ].join("|")

    // Simple hash
    let hash = 0
    for (let i = 0; i < raw.length; i++) {
        const char = raw.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return "fp_" + Math.abs(hash).toString(36)
}

/**
 * Subscribe to the blog newsletter
 */
export async function subscribeToNewsletter(email) {
    const safeEmail = String(email || "").trim().toLowerCase()
    if (!safeEmail || !safeEmail.includes("@")) {
        return { success: false, error: "Invalid email address" }
    }

    const { error } = await supabase
        .from("blog_subscribers")
        .insert([{ email: safeEmail }])

    if (error) {
        // Check for unique constraint violation (code 23505)
        if (error.code === "23505") {
            return { success: false, error: "This email is already subscribed!" }
        }
        console.error("Error subscribing:", error)
        return { success: false, error: "Failed to subscribe. Please try again." }
    }

    return { success: true }
}
