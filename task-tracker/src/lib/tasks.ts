export type Task = { id: string; title: string; done: boolean }
export type Filter = 'all' | 'open' | 'done'

export function addTask(
  tasks: Task[],
  title: string,
  id: string = crypto.randomUUID(),
): Task[] {
  const trimmed = title.trim()
  if (!trimmed) return tasks
  return [...tasks, { id, title: trimmed, done: false }]
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id)
}

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  if (filter === 'open') return tasks.filter((t) => !t.done)
  if (filter === 'done') return tasks.filter((t) => t.done)
  return tasks
}

export function countOpen(tasks: Task[]): number {
  return tasks.filter((t) => !t.done).length
}

export function formatOpenCount(n: number): string {
  return n === 1 ? '1 offene Aufgabe' : `${n} offene Aufgaben`
}
