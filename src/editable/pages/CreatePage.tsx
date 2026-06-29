'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookMarked, CheckCircle2, FileText, Lock, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: BookMarked,
  classified: BookMarked,
  image: FileText,
  profile: BookMarked,
  pdf: FileText,
  sbm: BookMarked,
}

const fieldClass =
  'w-full rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3.5 text-[14px] font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)] focus:border-[var(--slot4-accent)]/60 focus:ring-2 focus:ring-[var(--slot4-accent)]/12'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && ['sbm', 'pdf'].includes(task.key)),
    []
  )
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'sbm') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  /* Locked state — not signed in */
  if (!session) {
    return (
      <EditableSiteShell>
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[var(--slot4-page-bg)] px-5 py-16 sm:px-8">
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
              <Lock className="h-8 w-8" />
            </div>
            <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
              {pagesContent.create.locked.badge}
            </p>
            <h1 className="editable-display mt-4 text-3xl font-bold leading-snug tracking-[-0.03em]">
              {pagesContent.create.locked.title}
            </h1>
            <p className="mt-4 text-[14px] leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.create.locked.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-bold text-white shadow-[0_2px_12px_rgba(255,116,38,0.35)] transition hover:-translate-y-0.5"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] px-6 py-3 text-sm font-bold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-page-text)]"
              >
                Create account
              </Link>
            </div>
          </div>
        </main>
      </EditableSiteShell>
    )
  }

  /* Authenticated workspace */
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Page header */}
        <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-8 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">
              {pagesContent.create.hero.badge}
            </p>
            <h1 className="editable-display mt-4 text-3xl font-bold leading-snug tracking-[-0.03em] sm:text-4xl">
              {pagesContent.create.hero.title}
            </h1>
            <p className="mt-3 max-w-lg text-[14px] leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.create.hero.description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-12 sm:px-8 lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-10 lg:px-10 lg:py-16">
          {/* Content type selector */}
          <aside>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">
              Content type
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {enabledTasks.map((item) => {
                const Icon = taskIcon[item.key] || FileText
                const active = item.key === task
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTask(item.key)}
                    className={`rounded-2xl border p-5 text-left transition duration-200 ${
                      active
                        ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]'
                        : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/30'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)]'}`} />
                    <span className="mt-3 block text-[14px] font-bold">{item.label}</span>
                    <span className="mt-1 block text-[12px] leading-5 text-[var(--slot4-muted-text)] opacity-80">
                      {item.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={submit}
            className="mt-8 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 sm:p-8 lg:mt-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
                  Create {activeTask?.label || 'resource'}
                </p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-[-0.03em]">
                  {pagesContent.create.formTitle}
                </h2>
              </div>
              <span className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-3.5 py-2 text-[12px] font-bold text-[var(--slot4-muted-text)]">
                {session.name}
              </span>
            </div>

            <div className="mt-7 grid gap-4">
              <input
                className={fieldClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resource title"
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className={fieldClass}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                />
                <input
                  className={fieldClass}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Website or source URL"
                />
              </div>
              <input
                className={fieldClass}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Featured image URL"
              />
              <textarea
                className={`${fieldClass} min-h-[90px] resize-y`}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Short summary"
                required
              />
              <textarea
                className={`${fieldClass} min-h-[160px] resize-y`}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Full description, notes, or details"
                required
              />
            </div>

            {created ? (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-800/40 bg-emerald-950/40 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold text-emerald-300">{pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-[12px] text-emerald-400/70">{created.title}</p>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] text-sm font-bold text-white shadow-[0_2px_12px_rgba(255,116,38,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,116,38,0.4)]"
            >
              <Send className="h-4 w-4" />
              {pagesContent.create.submitLabel}
            </button>
          </form>
        </section>
      </main>
    </EditableSiteShell>
  )
}
