'use client'

import { useEffect, useRef } from 'react'

/*
  Lightweight scroll-reveal wrapper.
  Uses IntersectionObserver to add .is-visible when the element enters
  the viewport. The CSS transition in editable-global.css handles the animation.
  Content remains readable if JS fails (opacity reset via prefers-reduced-motion).
*/
export function EditableReveal({
  children,
  className = '',
  delay,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: 100 | 150 | 200 | 250 | 300 | 400 | 500
  as?: keyof React.JSX.IntrinsicElements
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayAttr = delay ? { 'data-delay': String(delay) } : {}

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal-target ${className}`} {...delayAttr}>
      {children}
    </Tag>
  )
}
