-- Additional tables for blog likes and comments
-- Run this AFTER the main schema.sql in Supabase SQL Editor

-- Add college_name to blog_posts if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'college_name'
  ) THEN
    ALTER TABLE public.blog_posts ADD COLUMN college_name text NOT NULL DEFAULT 'Alard University';
  END IF;
END $$;

-- Blog Likes (anonymous, one per device via fingerprint)
CREATE TABLE IF NOT EXISTS public.blog_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  fingerprint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(post_id, fingerprint)
);

CREATE INDEX IF NOT EXISTS idx_blog_likes_post_id ON public.blog_likes (post_id);

ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert likes" ON public.blog_likes;
CREATE POLICY "Public can insert likes"
ON public.blog_likes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read likes" ON public.blog_likes;
CREATE POLICY "Public can read likes"
ON public.blog_likes
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can delete own likes" ON public.blog_likes;
CREATE POLICY "Public can delete own likes"
ON public.blog_likes
FOR DELETE
TO anon, authenticated
USING (true);

-- Blog Comments
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  commenter_name text NOT NULL CHECK (char_length(trim(commenter_name)) BETWEEN 2 AND 100),
  comment_text text NOT NULL CHECK (char_length(trim(comment_text)) BETWEEN 2 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON public.blog_comments (post_id, created_at DESC);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert comments" ON public.blog_comments;
CREATE POLICY "Public can insert comments"
ON public.blog_comments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read comments" ON public.blog_comments;
CREATE POLICY "Public can read comments"
ON public.blog_comments
FOR SELECT
TO anon, authenticated
USING (true);
