import { describe, expect, it } from 'vitest'
import {
  addTask,
  countOpen,
  deleteTask,
  filterTasks,
  formatOpenCount,
  toggleTask,
  type Task,
} from './tasks'

const sample: Task[] = [
  { id: '1', title: 'A', done: false },
  { id: '2', title: 'B', done: true },
  { id: '3', title: 'C', done: false },
]

describe('addTask', () => {
  it('adds a trimmed, open task', () => {
    const result = addTask([], '  Milch kaufen  ', 'x')
    expect(result).toEqual([{ id: 'x', title: 'Milch kaufen', done: false }])
  })

  it('ignores empty and whitespace-only input', () => {
    expect(addTask(sample, '')).toBe(sample)
    expect(addTask(sample, '   ')).toBe(sample)
  })

  it('does not mutate the input', () => {
    const before = [...sample]
    addTask(sample, 'D', 'd')
    expect(sample).toEqual(before)
  })

  it('generates an id when none is given', () => {
    const [task] = addTask([], 'A')
    expect(task.id).toBeTruthy()
  })
})

describe('toggleTask', () => {
  it('flips done for the matching task only', () => {
    const result = toggleTask(sample, '1')
    expect(result[0].done).toBe(true)
    expect(result[1].done).toBe(true)
    expect(result[2].done).toBe(false)
  })

  it('toggles back', () => {
    expect(toggleTask(sample, '2')[1].done).toBe(false)
  })

  it('leaves the list unchanged for unknown id', () => {
    expect(toggleTask(sample, 'nope')).toEqual(sample)
  })
})

describe('deleteTask', () => {
  it('removes the matching task', () => {
    expect(deleteTask(sample, '2').map((t) => t.id)).toEqual(['1', '3'])
  })

  it('leaves the list unchanged for unknown id', () => {
    expect(deleteTask(sample, 'nope')).toEqual(sample)
  })
})

describe('filterTasks', () => {
  it('returns all', () => {
    expect(filterTasks(sample, 'all')).toEqual(sample)
  })

  it('returns open tasks', () => {
    expect(filterTasks(sample, 'open').map((t) => t.id)).toEqual(['1', '3'])
  })

  it('returns done tasks', () => {
    expect(filterTasks(sample, 'done').map((t) => t.id)).toEqual(['2'])
  })
})

describe('countOpen', () => {
  it('counts open tasks', () => {
    expect(countOpen(sample)).toBe(2)
    expect(countOpen([])).toBe(0)
  })
})

describe('formatOpenCount', () => {
  it('uses singular for 1', () => {
    expect(formatOpenCount(1)).toBe('1 offene Aufgabe')
  })

  it('uses plural otherwise', () => {
    expect(formatOpenCount(0)).toBe('0 offene Aufgaben')
    expect(formatOpenCount(5)).toBe('5 offene Aufgaben')
  })
})
