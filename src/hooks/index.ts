import { useState, useEffect, useCallback, useRef } from 'react'

// Debounce hook
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// Local storage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

// Interval hook
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => { savedCallback.current = callback }, [callback])
  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// Window size hook
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

// Intersection observer hook
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])
  return { ref, inView }
}

// Copy to clipboard hook
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])
  return { copied, copy }
}

// Previous value hook
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}

// Toggle hook
export function useToggle(initial = false): [boolean, () => void, (v: boolean) => void] {
  const [state, setState] = useState(initial)
  const toggle = useCallback(() => setState((s) => !s), [])
  return [state, toggle, setState]
}

// Autosave hook
export function useAutosave<T>(data: T, key: string, delay = 1500) {
  const debounced = useDebounce(data, delay)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(`autosave:${key}`, JSON.stringify(debounced))
      setSaved(true)
      const timer = setTimeout(() => setSaved(false), 1500)
      return () => clearTimeout(timer)
    } catch { /* ignore */ }
  }, [debounced, key])

  return saved
}

// Keyboard shortcut hook
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  { ctrl = false, meta = false, shift = false } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key && (!ctrl || e.ctrlKey) && (!meta || e.metaKey) && (!shift || e.shiftKey)) {
        e.preventDefault()
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback, ctrl, meta, shift])
}
