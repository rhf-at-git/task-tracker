import type { Task } from './tasks'

export const STORAGE_KEY = 'task-tracker:tasks'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    typeof v.done === 'boolean'
  )
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.every(isTask) ? parsed : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Speichern ist best effort (Quota / privater Modus)
  }
}
