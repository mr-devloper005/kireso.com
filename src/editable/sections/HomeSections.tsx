import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, BookMarked, Clock3,
  ExternalLink, FileText, Globe, Layers, Search, Sparkles, TrendingUp,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, getEditableExcerpt, getEditableCategory, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-10'

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

// Pull unique images from the post pool for the hero background
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   Full-height dark hero with collage background, centred headline, search
   bar, and quick category pills. Followed by a stats trust-band.
══════════════════════════════════════════════════════════════════════════ */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const heroImages = latestPostImages(pool)
  const title = pagesContent.home.hero.title
  const categories = SITE_CONFIG.tasks.filter((t) => t.enabled && ['sbm', 'pdf'].includes(t.key)).slice(0, 4)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)]">
        {/* Background collage */}
        <div className="absolute inset-0">
          <EditableHeroCollage images={heroImages} />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-[var(--slot4-dark-bg)]/60" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.75)_100%)]" />
          {/* Radial accent glow at top-centre */}
          <div className="absolute inset-x-0 -top-32 mx-auto h-96 w-[70%] bg-[radial-gradient(ellipse_at_center,rgba(255,116,38,0.18)_0%,transparent_70%)]" />
        </div>

        <div className={`relative pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pt-44 lg:pb-40 ${container}`}>
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/80">
                {pagesContent.home.hero.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-7 text-balance text-[2.8rem] font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.25rem]">
              {title[0]}{' '}
              <span className="text-[var(--slot4-accent)]">{title[1]}</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-white/75 sm:text-lg">
              {pagesContent.home.hero.description}
            </p>

            {/* Search bar */}
            <form
              action="/search"
              className="mx-auto mt-10 flex w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[var(--slot4-dark-bg)]/80 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-lg"
            >
              <div className="flex flex-1 items-center gap-3 px-5">
                <Search className="h-4.5 w-4.5 shrink-0 text-[var(--slot4-muted-text)]" />
                <input
                  name="q"
                  type="search"
                  placeholder={pagesContent.home.hero.searchPlaceholder}
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/40"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 bg-[var(--slot4-accent-fill)] px-6 text-sm font-bold text-white transition hover:brightness-95 active:brightness-90 sm:px-8"
              >
                Search
              </button>
            </form>

            {/* Category pills */}
            {categories.length > 0 ? (
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {categories.map((task) => (
                  <Link
                    key={task.key}
                    href={task.route}
                    className="rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-[13px] font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/14 hover:border-white/30"
                  >
                    {task.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  className="rounded-xl border border-[var(--slot4-accent)]/30 bg-[var(--slot4-accent-soft)] px-4 py-2 text-[13px] font-semibold text-[var(--slot4-accent)] backdrop-blur-sm transition hover:border-[var(--slot4-accent)]/60"
                >
                  Browse all
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Trust / stats band ───────────────────────────────────────────── */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className={`flex flex-wrap items-center justify-center gap-8 py-5 ${container}`}>
          {pagesContent.home.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-xl font-bold text-[var(--slot4-page-text)]">{stat.value}</span>
              <span className="text-[13px] text-[var(--slot4-muted-text)]">{stat.label}</span>
            </div>
          ))}
          <div className="h-4 w-px bg-[var(--editable-border)] hidden sm:block" />
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--slot4-accent)] transition hover:opacity-80"
          >
            Browse {taskLabel(primaryTask).toLowerCase()}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   CATEGORY BROWSE RAIL
   Clean category cards that link directly to each enabled section.
══════════════════════════════════════════════════════════════════════════ */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((t) => t.enabled && ['sbm', 'pdf'].includes(t.key))
  if (!categories.length) return null

  const icons: Partial<Record<TaskKey, typeof FileText>> = {
    sbm: BookMarked,
    pdf: FileText,
    article: FileText,
    listing: Globe,
    image: Layers,
  }

  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`py-20 sm:py-24 ${container}`}>
        {/* Section header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
              Browse by type
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Everything in one library
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-[var(--slot4-muted-text)]">
              Move between saved bookmarks and downloadable resources in one place.
            </p>
          </div>
          <Link
            href={primaryRoute}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)] transition hover:opacity-80 sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category cards grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((task) => {
            const Icon = icons[task.key] || FileText
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_20px_56px_rgba(0,0,0,0.28)]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition duration-300 group-hover:bg-[var(--slot4-accent)] group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-[14px] font-bold text-[var(--slot4-page-text)]">{task.label}</span>
                <span className="line-clamp-2 text-[12px] leading-5 text-[var(--slot4-muted-text)]">
                  {task.description}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   RECENTLY CURATED — magazine-style 3-column grid
══════════════════════════════════════════════════════════════════════════ */
function ResourceCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post)
  const excerpt = getEditableExcerpt(post, 130)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.28)]">
      {/* Thumbnail */}
      <Link href={href} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img
            src={image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          {/* Category badge */}
          {category ? (
            <span className="absolute left-3.5 top-3.5 rounded-full bg-[var(--slot4-surface-bg)]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] backdrop-blur-sm">
              {category}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link
          href={href}
          className="text-[17px] font-bold leading-snug tracking-[-0.02em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)] line-clamp-2"
        >
          {post.title}
        </Link>
        {excerpt ? (
          <p className="mt-2.5 line-clamp-2 flex-1 text-[13px] leading-6 text-[var(--slot4-muted-text)]">
            {excerpt}
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between border-t border-[var(--editable-border)] pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--slot4-accent)] transition hover:opacity-80"
          >
            Open resource <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Bookmark className="h-4 w-4 text-[var(--slot4-muted-text)] opacity-50" />
        </div>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)]).slice(0, 9)
  if (!activity.length) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-20 sm:py-24 lg:py-32 ${container}`}>
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
              Recently added
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Latest from the library
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-[var(--slot4-muted-text)]">
              Fresh bookmarks and resources, added to {SITE_CONFIG.name} this week.
            </p>
          </div>
          <Link
            href={primaryRoute}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)] transition hover:opacity-80 sm:inline-flex"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activity.map((post) => (
            <ResourceCard
              key={post.id || post.slug}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-8 py-3.5 text-sm font-bold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-accent)]"
          >
            Browse all resources <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TIME-BASED DISCOVERY COLLECTIONS
   Spotlight / Browse / Archive sections from the time-window data
══════════════════════════════════════════════════════════════════════════ */
function CompactResourceCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post)
  const excerpt = getEditableExcerpt(post, 110)

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.28)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-dark-bg)]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[14px] font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        {excerpt ? (
          <p className="mt-2 line-clamp-2 flex-1 text-[12px] leading-[1.65] text-[var(--slot4-muted-text)]">
            {excerpt}
          </p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--slot4-accent)] opacity-80 transition group-hover:opacity-100">
          Open <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

const sectionMeta: Record<string, { eyebrow: string; title: string; icon: typeof TrendingUp }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days', icon: Sparkles },
  browse: { eyebrow: 'Trending now', title: 'Popular this month', icon: TrendingUp },
  index: { eyebrow: 'Evergreen picks', title: 'From the archive', icon: Clock3 },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)
  if (!visible.length) return null

  const bgAlternate = [
    'bg-[var(--slot4-panel-bg)]',
    'bg-[var(--slot4-page-bg)]',
    'bg-[var(--slot4-panel-bg)]',
  ]

  return (
    <>
      {visible.map((section, idx) => {
        const meta = sectionMeta[section.key] || { eyebrow: 'Discover', title: 'More to explore', icon: Bookmark }
        const Icon = meta.icon
        const bg = bgAlternate[idx % bgAlternate.length]
        return (
          <section key={section.key} className={bg}>
            <div className={`py-20 sm:py-24 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[var(--slot4-accent)]" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
                      {meta.eyebrow}
                    </p>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                    {meta.title}
                  </h2>
                </div>
                <Link
                  href={section.href || primaryRoute}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)] transition hover:opacity-80"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactResourceCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA BAND
   Full-bleed orange CTA with white buttons. Centred layout.
══════════════════════════════════════════════════════════════════════════ */
export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--slot4-accent-fill)]">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:5px_5px]" />
      {/* Radial highlight at top */}
      <div className="absolute inset-x-0 -top-20 mx-auto h-64 w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />

      <div className={`relative flex flex-col items-center gap-7 py-20 text-center sm:py-28 ${container}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-white/70">
          {pagesContent.home.cta.badge}
        </p>
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-snug tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="max-w-xl text-[15px] leading-7 text-white/80 sm:text-base">
          {pagesContent.home.cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={pagesContent.home.cta.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[var(--slot4-accent)] shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]"
          >
            {pagesContent.home.cta.primaryCta.label}
          </Link>
          <Link
            href={pagesContent.home.cta.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 px-8 py-3.5 text-sm font-bold text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
