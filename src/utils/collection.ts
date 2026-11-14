export function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}

export function removeById<T extends { id: string }>(items: T[], id: string): T[] {
  return items.filter((item) => item.id !== id)
}

export function updateById<T extends { id: string }>(
  items: T[],
  id: string,
  changes: Partial<T>,
): T[] {
  return items.map((item) => (item.id === id ? { ...item, ...changes } : item))
}
