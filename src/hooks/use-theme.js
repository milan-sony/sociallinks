import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const read = () => document.documentElement.classList.contains('dark')

export function useTheme() {
  const [dark, setDark] = useState(read)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable: theme just won't persist */
    }
  }, [dark])

  // Toggle with a circular reveal that grows from the clicked element.
  const toggle = useCallback((event) => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      setDark((d) => !d)
      return
    }
    const rect = event?.currentTarget?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const next = !read()
    const t = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark', next)
      flushSync(() => setDark(next))
    })
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [])

  return { dark, toggle }
}
