import { isSupabaseConfigured } from "./supabaseClient"

const LIKE_KEY_PREFIX = "blog_liked_"

/**
 * Fetch all published blog posts with like counts and category info
 */
export async function fetchBlogPosts(categorySlug = null, page = 1, pageSize = 6) {
    if (!isSupabaseConfigured) return { posts: [], total: 0 }

    const { supabase } = await import("./supabaseClient")

    let categoryId = null
    if (categorySlug) {
        const { data: catData, error: catError } = await supabase
            .from("blog_categories")
            .select("id")
            .eq("slug", categorySlug)
            .single()

        if (catError || !catData) {
            console.error("Error fetching category for blog posts:", catError)
            return { posts: [], total: 0 }
        }

        categoryId = catData.id
    }

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let postsQuery = supabase
        .from("blog_posts")
        .select(`
      id, slug, title, excerpt, author_name, college_name,
      published_at, created_at,
      blog_categories ( slug, name ),
      blog_likes ( id )
    `)
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .range(from, to)

    if (categoryId) {
        postsQuery = postsQuery.eq("category_id", categoryId)
    }

    const { data: fetchData, error: fetchError } = await postsQuery

    if (fetchError) {
        console.error("Error fetching blog posts:", fetchError)
        return { posts: [], total: 0 }
    }

    let countQuery = supabase
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true)

    if (categoryId) {
        countQuery = countQuery.eq("category_id", categoryId)
    }

    const { count, error: countError } = await countQuery
    if (countError) {
        console.error("Error fetching blog posts count:", countError)
    }

    const posts = (fetchData || []).map((post) => ({
        ...post,
        category: post.blog_categories,
        likeCount: post.blog_likes?.length || 0,
        blog_categories: undefined,
        blog_likes: undefined,
    }))

    return {
        posts,
        total: Number(count || posts.length || 0),
    }
}


/**
 * Fetch a single blog post by slug with full content, comments, and like count
 */
export async function fetchBlogPost(slug) {
    if (!isSupabaseConfigured) return null

    const { supabase } = await import("./supabaseClient")

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
    if (!isSupabaseConfigured) return []

    const { supabase } = await import("./supabaseClient")

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
    if (!isSupabaseConfigured) return { liked: false }

    const { supabase } = await import("./supabaseClient")

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
    if (!isSupabaseConfigured) return null

    const { supabase } = await import("./supabaseClient")

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
    if (!isSupabaseConfigured) return { success: false, error: "Service unavailable" }

    const { supabase } = await import("./supabaseClient")

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
