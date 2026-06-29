import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Resource'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/* ─── Editorial feature card — full-bleed, text-on-image ─────────────────── */
export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden rounded-3xl ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-8 sm:p-10 lg:min-h-[620px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-[1.04]"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,9,0.08)_0%,rgba(9,10,9,0.82)_100%)]" />
        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <span className="text-[11px] font-bold uppercase tracking-[0.36em] text-[var(--slot4-accent)]">
            {label}
          </span>
          <h3 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h3>
          <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/70 sm:text-[15px]">
            {getEditableExcerpt(post, 190)}
          </p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition group-hover:bg-white/15">
            Open resource <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─── Rail post card — vertical card for horizontal scroll rails ─────────── */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.28)]`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-dark-bg)]/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
          {getEditableCategory(post)}
        </p>
        <h3 className={`mt-2 line-clamp-3 text-[15px] font-bold leading-snug tracking-[-0.02em] ${pal.panelText}`}>
          {post.title}
        </h3>
        <p className={`mt-2 line-clamp-2 text-[12px] leading-[1.6] ${pal.softMutedText}`}>
          {getEditableExcerpt(post, 100)}
        </p>
      </div>
    </Link>
  )
}

/* ─── Compact index card — numbered list item ────────────────────────────── */
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 rounded-2xl border ${pal.border} ${pal.panelBg} p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]`}>
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[13px] font-bold text-[var(--slot4-accent)]">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] ${pal.accentText}`}>
            <Clock3 className="h-3 w-3" />
            {getEditableCategory(post)}
          </p>
          <h3 className={`mt-2 line-clamp-2 text-[16px] font-bold leading-snug tracking-[-0.03em] ${pal.panelText}`}>
            {post.title}
          </h3>
          <p className={`mt-2 line-clamp-2 text-[12px] leading-[1.65] ${pal.softMutedText}`}>
            {getEditableExcerpt(post, 105)}
          </p>
        </div>
      </div>
    </Link>
  )
}

/* ─── Article list card — horizontal layout ──────────────────────────────── */
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group grid min-w-0 gap-5 overflow-hidden rounded-2xl border ${pal.border} ${pal.surfaceBg} p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)] sm:grid-cols-[200px_minmax(0,1fr)]`}
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[180px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="min-w-0 py-1 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
          No. {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className={`mt-3 line-clamp-3 text-2xl font-bold leading-snug tracking-[-0.04em] ${pal.panelText} sm:text-[1.65rem]`}>
          {post.title}
        </h2>
        <p className={`mt-3 line-clamp-3 text-[13px] leading-7 ${pal.softMutedText}`}>
          {getEditableExcerpt(post, 180)}
        </p>
        <span className={`mt-5 inline-flex items-center gap-2 text-[13px] font-bold ${pal.panelText} opacity-70 transition group-hover:opacity-100`}>
          Open resource <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
