'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const navItems = useMemo(
    () => [
      { label: 'Resources', href: '/sbm' },
      
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
    []
  )

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 backdrop-blur-xl">
      {/* Top accent line */}
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent_0%,var(--slot4-accent)_30%,var(--slot4-accent)_70%,transparent_100%)]" />

      <nav className="mx-auto flex h-16 w-full max-w-[var(--editable-container)] items-center gap-4 px-5 sm:h-[72px] sm:px-8 lg:gap-6 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label={SITE_CONFIG.name}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] ring-1 ring-[var(--slot4-accent)]/20 transition duration-300 group-hover:ring-[var(--slot4-accent)]/50">
            <img
              src="/favicon.png?v=20260413"
              alt={SITE_CONFIG.name}
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[180px] truncate text-[17px] font-bold leading-none">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-0.5 block max-w-[180px] truncate text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-[13px] font-semibold transition duration-200 ${
                  active
                    ? 'text-[var(--slot4-accent)]'
                    : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-[var(--slot4-accent)]" />
                ) : null}
              </Link>
            )
          })}
        </div>

        {/* Desktop search bar */}
        <form
          action="/search"
          className="mx-auto hidden min-w-0 flex-1 max-w-xs lg:flex xl:max-w-sm"
        >
          <label className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2.5 transition duration-200 focus-within:border-[var(--slot4-accent)]/60 focus-within:ring-2 focus-within:ring-[var(--slot4-accent)]/15">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search resources…"
              className="min-w-0 flex-1 bg-transparent text-[13px] font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        {/* Right actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">

          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition hover:border-[var(--slot4-accent)]/50 lg:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_2px_10px_rgba(255,116,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(255,116,38,0.4)] sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-xl border border-[var(--editable-border)] px-4 py-2.5 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-xl border border-[var(--editable-border)] px-4 py-2.5 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_2px_10px_rgba(255,116,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(255,116,38,0.4)] sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Sign up
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition hover:border-[var(--slot4-accent)]/50 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}
      {searchOpen ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-3 lg:hidden">
          <form action="/search" className="flex items-center gap-2.5 rounded-xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search resources…"
              autoFocus
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </form>
        </div>
      ) : null}

      {/* Mobile nav menu */}
      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <nav className="grid gap-1">
            {[
              { label: 'Home', href: '/' },
              ...navItems,
              ...(session
                ? [{ label: 'Create', href: '/create' }]
                : [
                    { label: 'Sign in', href: '/login' },
                    { label: 'Sign up', href: '/signup' },
                  ]),
            ].map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {active ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
                  )}
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {session ? (
            <div className="mt-4 border-t border-[var(--editable-border)] pt-4">
              <button
                type="button"
                onClick={() => { logout(); setOpen(false) }}
                className="w-full rounded-xl border border-[var(--editable-border)] py-3 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-page-text)]"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
