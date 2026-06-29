import Link from 'next/link'
import { ArrowRight, BookMarked, CheckCircle2, Shield, Zap } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const iconMap = [BookMarked, Zap, Shield]

export default function AboutPage() {
  const highlights = pagesContent.about.highlights

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,116,38,0.14),transparent_70%)]" />

          <div className="relative mx-auto max-w-[var(--editable-container)] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
                {pagesContent.about.badge}
              </p>
              <h1 className="editable-display mt-6 text-balance text-4xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]">
                {pagesContent.about.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.description}
              </p>
            </div>

            {/* Stat highlights */}
            {highlights ? (
              <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 sm:gap-6">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 text-center sm:p-7"
                  >
                    <p className="text-3xl font-bold tracking-[-0.04em] text-[var(--slot4-accent)] sm:text-4xl">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* ── Story section ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-20 sm:px-8 sm:py-24 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-32">
          <article>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
              About {SITE_CONFIG.name}
            </p>
            <h2 className="editable-display mt-5 text-3xl font-bold leading-snug tracking-[-0.03em] sm:text-4xl">
              Why we built this library
            </h2>
            <div className="mt-7 space-y-5">
              {pagesContent.about.paragraphs.map((p) => (
                <p key={p} className="text-[15px] leading-8 text-[var(--slot4-muted-text)]">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/sbm"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_2px_12px_rgba(255,116,38,0.38)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,116,38,0.42)]"
              >
                Browse resources <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] px-7 py-3.5 text-sm font-bold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)]"
              >
                Contact us
              </Link>
            </div>
          </article>

          {/* Values */}
          <aside className="mt-12 space-y-5 lg:mt-0">
            {pagesContent.about.values.map((value, idx) => {
              const Icon = iconMap[idx] || CheckCircle2
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-300 hover:border-[var(--slot4-accent)]/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="editable-display mt-5 text-[1.15rem] font-bold tracking-[-0.02em]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-7 text-[var(--slot4-muted-text)]">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </aside>
        </section>

        {/* ── CTA strip ───────────────────────────────────────────────────── */}
        <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-6 px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
              Explore the full library today
            </h2>
            <p className="max-w-md text-[14px] leading-7 text-[var(--slot4-muted-text)]">
              Over 1,200 curated bookmarks and documents, organised and ready to browse.
            </p>
            <Link
              href="/sbm"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-8 py-3.5 text-sm font-bold text-white shadow-[0_2px_12px_rgba(255,116,38,0.38)] transition duration-300 hover:-translate-y-0.5"
            >
              Start exploring <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
    </EditableSiteShell>
  )
}
