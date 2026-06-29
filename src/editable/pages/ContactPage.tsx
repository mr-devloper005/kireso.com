'use client'

import { Bookmark, ChevronDown, Mail, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useState } from 'react'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Bookmark, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Mail, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: Sparkles, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: Sparkles, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Bookmark, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Resource submissions', body: 'Suggest bookmarks, guides, and references that deserve a place in the library.' },
    { icon: Mail, title: 'Curation partnerships', body: 'Coordinate collection projects, reference pages, and resource programmes.' },
    { icon: Sparkles, title: 'General support', body: 'Need help with the platform, your account, or a specific piece of content?' },
  ]
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[var(--editable-border)] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[14px] font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]"
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--slot4-muted-text)] transition duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <p className="pb-5 text-[13px] leading-7 text-[var(--slot4-muted-text)]">{a}</p>
      ) : null}
    </div>
  )
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)
  const faq = pagesContent.contact.faq

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <section className="relative border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
          <div className="pointer-events-none absolute inset-x-0 -top-32 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,116,38,0.12),transparent_70%)]" />
          <div className="relative mx-auto max-w-[var(--editable-container)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
              {pagesContent.contact.eyebrow}
            </p>
            <h1 className="editable-display mt-5 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl">
              {pagesContent.contact.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.contact.description}
            </p>
          </div>
        </section>

        {/* ── Main grid ────────────────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-10 lg:py-24">

          {/* Left: lanes + FAQ */}
          <div className="space-y-8">
            {/* Support lanes */}
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:border-[var(--slot4-accent)]/25"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <lane.icon className="h-5 w-5" />
                  </div>
                  <h2 className="editable-display mt-5 text-[1.1rem] font-bold tracking-[-0.02em]">
                    {lane.title}
                  </h2>
                  <p className="mt-2.5 text-[13px] leading-7 text-[var(--slot4-muted-text)]">
                    {lane.body}
                  </p>
                </div>
              ))}
            </div>

            {/* FAQ */}
            {faq?.length ? (
              <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-2">
                <p className="pt-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
                  FAQ
                </p>
                {faq.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            ) : null}
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.02em]">
              {pagesContent.contact.formTitle}
            </h2>
            <p className="mt-2 text-[13px] text-[var(--slot4-muted-text)]">
              We respond within one business day.
            </p>
            <EditableContactLeadForm />
          </div>

        </section>
      </main>
    </EditableSiteShell>
  )
}
