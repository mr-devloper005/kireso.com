import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt } from '@/editable/cards/PostCards'
import { Ads } from '@/lib/ads'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) =>
  typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media)
    ? post.media.find((item) => typeof item?.url === 'string')?.url
    : ''
  const images = Array.isArray(content.images)
    ? content.images.find((item) => typeof item === 'string') as string | undefined
    : ''
  return (
    media ||
    compactRaw(content.featuredImage) ||
    compactRaw(content.image) ||
    compactRaw(content.thumbnail) ||
    images ||
    ''
  )
}
const compactRaw = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [
    post.title,
    post.summary,
    content.description,
    content.body,
    content.excerpt,
    content.category,
    Array.isArray(post.tags) ? post.tags.join(' ') : '',
  ].some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = getEditableExcerpt(post, 180)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Resource'
  const featured = index % 5 === 0

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.28)] ${featured ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${featured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}>
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.65))]" />
          <span className="absolute left-4 top-4 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
            {taskLabel}
          </span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? (
          <span className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]">
            {taskLabel}
          </span>
        ) : null}
        <h2 className={`line-clamp-3 font-bold leading-snug tracking-[-0.03em] text-[var(--slot4-page-text)] ${featured ? 'mt-4 text-2xl sm:text-3xl' : 'mt-3 text-xl'}`}>
          {post.title}
        </h2>
        {summary ? (
          <p className="mt-3 line-clamp-2 text-[13px] leading-7 text-[var(--slot4-muted-text)]">
            {summary}
          </p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--slot4-accent)] opacity-80 transition group-hover:opacity-100">
          Open resource <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'

  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  )
  const publicTasks = SITE_CONFIG.tasks.filter(
    (item) => item.enabled && ['sbm', 'pdf'].includes(item.key)
  )
  const publicKeys = new Set(publicTasks.map((item) => item.key))
  const sourcePosts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
      ? []
      : publicTasks.flatMap((item) => getMockPostsForTask(item.key))
  const posts = sourcePosts.filter((post) => {
    const key = getPostTaskKey(post)
    return key ? publicKeys.has(key) : false
  })
  const results = posts
    .filter((post) => matches(post, normalized, category, task))
    .slice(0, normalized ? 80 : 36)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">

        {/* ── Search header ─────────────────────────────────────────────── */}
        <section className="relative border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
          <div className="pointer-events-none absolute inset-x-0 -top-32 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,116,38,0.12),transparent_70%)]" />
          <div className="relative mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
            {/* Left copy */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
                {pagesContent.search.hero.badge}
              </p>
              <h1 className="editable-display mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl">
                {pagesContent.search.hero.title}
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.search.hero.description}
              </p>
            </div>

            {/* Right search form */}
            <form
              action="/search"
              className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 sm:p-6"
            >
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 transition focus-within:border-[var(--slot4-accent)]/50 focus-within:ring-2 focus-within:ring-[var(--slot4-accent)]/12">
                <Search className="h-4.5 w-4.5 text-[var(--slot4-muted-text)]" />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder={pagesContent.search.hero.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold outline-none placeholder:text-[var(--slot4-muted-text)]"
                />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                  <input
                    name="category"
                    defaultValue={category}
                    placeholder="Category"
                    className="min-w-0 flex-1 bg-transparent text-[13px] font-semibold outline-none placeholder:text-[var(--slot4-muted-text)]"
                  />
                </label>
                <select
                  name="task"
                  defaultValue={task}
                  className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-[13px] font-semibold text-[var(--slot4-page-text)] outline-none"
                >
                  <option value="">All content types</option>
                  {publicTasks.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] text-sm font-bold text-white shadow-[0_2px_12px_rgba(255,116,38,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,116,38,0.4)]"
              >
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>
        </section>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="mb-12">
            <Ads slot="header" showLabel eager className="mx-auto w-full" />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                {query ? `Results for "${query}"` : pagesContent.search.resultsTitle}
              </h2>
            </div>
            <Link
              href="/sbm"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-[13px] font-bold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-page-text)]"
            >
              Browse bookmarks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => (
                <SearchResultCard key={post.id || post.slug} post={post} index={index} />
              ))}
            </div>
          ) : null}

          {results.length ? (
            <div className="mt-12">
              <Ads slot="sidebar" showLabel className="mx-auto w-full" />
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-8 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)] opacity-50" />
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">No results found</h3>
              <p className="mt-3 text-[13px] leading-7 text-[var(--slot4-muted-text)]">
                Try a different keyword, content type, or category.
              </p>
              <Link
                href="/sbm"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-surface-bg)] border border-[var(--editable-border)] px-6 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]/40"
              >
                Browse all resources
              </Link>
            </div>
          )}
        </section>

      </main>
    </EditableSiteShell>
  )
}
