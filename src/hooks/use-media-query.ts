import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const getMatches = (): boolean => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getMatches)

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    const handler = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches)
    }

    handler(matchMedia)

    if ("addEventListener" in matchMedia) {
      matchMedia.addEventListener("change", handler)
    }

    return () => {
      if ("removeEventListener" in matchMedia) {
        matchMedia.removeEventListener("change", handler)
      }
    }
  }, [query])

  return matches
}

