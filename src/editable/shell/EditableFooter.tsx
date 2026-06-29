'use client'

import Link from 'next/link'
import { ArrowUpRight, BookMarked, ExternalLink, FileText, Mail, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  const exploreLinks = [
    { label: 'Resources', href: '/sbm', icon: BookMarked },
   
    { label: 'Search', href: '/search', icon: Search },
  ]

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    ...(session
      ? [{ label: 'Create', href: '/create' }]
      : [
          { label: 'Sign in', href: '/login' },
          { label: 'Sign up', href: '/signup' },
        ]),
  ]

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)]">
      {/* Top accent */}
      <div className="h-[1px] bg-[linear-gradient(90deg,transparent_0%,var(--slot4-accent)_40%,var(--slot4-accent)_60%,transparent_100%)] opacity-50" />

      {/* CTA band */}
      <div className="border-b border-[var(--editable-border)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-5 px-5 py-12 text-center sm:px-8 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
            Start exploring
          </p>
          <h2 className="mx-auto max-w-2xl text-2xl font-bold leading-snug tracking-[-0.03em] text-[var(--editable-footer-text)] sm:text-3xl">
            {globalContent.footer.tagline}
          </h2>
          <p className="mx-auto max-w-xl text-[14px] leading-7 text-[var(--slot4-muted-text)]">
            {globalContent.footer.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/sbm"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-bold text-white shadow-[0_2px_12px_rgba(255,116,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,116,38,0.4)]"
            >
              Browse resources <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] px-6 py-3 text-sm font-bold text-[var(--slot4-muted-text)] transition duration-300 hover:border-[var(--slot4-accent)]/50 hover:text-[var(--editable-footer-text)]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] lg:gap-12 lg:px-10">

        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] ring-1 ring-[var(--slot4-accent)]/20 transition group-hover:ring-[var(--slot4-accent)]/50">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
            </span>
            <span className="editable-display text-lg font-bold tracking-[-0.01em] text-[var(--editable-footer-text)]">
              {SITE_CONFIG.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-[13px] leading-7 text-[var(--slot4-muted-text)]">
            {globalContent.footer.description}
          </p>
          <div className="mt-6 flex items-center gap-1 text-[12px] font-medium text-[var(--slot4-muted-text)]">
            <Mail className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
            <Link href="/contact" className="ml-1.5 transition hover:text-[var(--editable-footer-text)]">
              Send a message
            </Link>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
            Explore
          </h3>
          <ul className="mt-5 grid gap-3">
            {exploreLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--editable-footer-text)]"
                >
                  <Icon className="h-3.5 w-3.5 text-[var(--slot4-accent)] opacity-70 transition group-hover:opacity-100" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
            Company
          </h3>
          <ul className="mt-5 grid gap-3">
            {companyLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--editable-footer-text)]"
                >
                  {label}
                </Link>
              </li>
            ))}
            {session ? (
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--editable-footer-text)]"
                >
                  Logout
                </button>
              </li>
            ) : null}
          </ul>
        </div>

        {/* Contact / note */}
        <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
            Contribute
          </h3>
          <p className="mt-3 text-[13px] leading-7 text-[var(--slot4-muted-text)]">
            Found something worth saving? Submit a bookmark or document to the library.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--slot4-accent)] transition hover:opacity-80"
          >
            Submit a resource <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-10">
          <p className="text-[12px] font-medium text-[var(--slot4-muted-text)]">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-[12px] font-medium text-[var(--slot4-soft-muted-text)]">
            {globalContent.footer.bottomNote}
          </p>
        </div>
      </div>
    </footer>
  )
}
