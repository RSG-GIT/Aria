import { useEffect, useState } from 'react'

/** Reactive matchMedia. Starts `false` so SSR/first paint never assumes desktop. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)')
