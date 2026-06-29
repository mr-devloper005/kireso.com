import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, FileText } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/signup',
    title: 'Create account',
    description: pagesContent.auth.signup.metadataDescription,
  })
}

const perks = [
  'Access the full publishing workspace',
  'Submit bookmarks and documents',
  'Manage your contributions',
]

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="flex min-h-[calc(100vh-5rem)] bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-center px-5 py-16 sm:px-8 lg:flex-row lg:items-stretch lg:px-10">

          {/* Left form */}
          <div className="w-full max-w-[440px] lg:max-w-none lg:w-[520px] lg:pr-10">
            <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9">
              <h1 className="text-2xl font-bold tracking-[-0.03em]">
                {pagesContent.auth.signup.formTitle}
              </h1>
              <p className="mt-2 text-[13px] text-[var(--slot4-muted-text)]">
                Join {SITE_CONFIG.name} and start contributing to the library.
              </p>
              <EditableLocalSignupForm />
              <p className="mt-6 text-[13px] text-[var(--slot4-muted-text)]">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-bold text-[var(--slot4-accent)] underline-offset-3 hover:underline"
                >
                  {pagesContent.auth.signup.loginCta}
                </Link>
              </p>
            </div>
          </div>

          {/* Right brand panel */}
          <div className="relative mt-8 hidden flex-1 overflow-hidden rounded-2xl bg-[var(--slot4-dark-bg)] p-12 lg:mt-0 lg:flex lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute inset-x-0 -top-20 h-64 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,116,38,0.2),transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-5 [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)]">
                <FileText className="h-6 w-6 text-[var(--slot4-accent)]" />
              </div>
              <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
                {pagesContent.auth.signup.badge}
              </p>
              <h2 className="editable-display mt-5 max-w-sm text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-white">
                {pagesContent.auth.signup.title}
              </h2>
              <p className="mt-5 max-w-sm text-[14px] leading-7 text-white/60">
                {pagesContent.auth.signup.description}
              </p>
            </div>

            <div className="relative z-10 mt-10 space-y-3">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                  <span className="text-[13px] font-semibold text-white/75">{perk}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </EditableSiteShell>
  )
}
