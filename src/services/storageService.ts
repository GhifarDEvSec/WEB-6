export function loadFromStorage<T>(key: string, fallback: T): T {
  const rawValue = localStorage.getItem(key)

  if (rawValue === null) {
    return fallback
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}
