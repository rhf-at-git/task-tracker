import { beforeEach, describe, expect, it, vi } from 'vitest'
import { loadTasks, saveTasks, STORAGE_KEY } from './storage'

function stubStorage(initial: Record<string, string> = {}) {
  const data = { ...initial }
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => (k in data ? data[k] : null),
    setItem: (k: string, v: string) => {
      data[k] = v
    },
  })
  return data
}

beforeEach(() => {
  vi.unstubAllGlobals()
})

describe('loadTasks', () => {
  it('returns [] when nothing is stored', () => {
    stubStorage()
    expect(loadTasks()).toEqual([])
  })

  it('returns stored tasks', () => {
    const tasks = [{ id: '1', title: 'A', done: false }]
    stubStorage({ [STORAGE_KEY]: JSON.stringify(tasks) })
    expect(loadTasks()).toEqual(tasks)
  })

  it('returns [] for invalid JSON', () => {
    stubStorage({ [STORAGE_KEY]: '{not json' })
    expect(loadTasks()).toEqual([])
  })

  it('returns [] for wrong shape', () => {
    stubStorage({ [STORAGE_KEY]: JSON.stringify([{ foo: 1 }]) })
    expect(loadTasks()).toEqual([])
    stubStorage({ [STORAGE_KEY]: JSON.stringify({ a: 1 }) })
    expect(loadTasks()).toEqual([])
  })
})

describe('saveTasks', () => {
  it('writes JSON under the storage key', () => {
    const data = stubStorage()
    const tasks = [{ id: '1', title: 'A', done: true }]
    saveTasks(tasks)
    expect(JSON.parse(data[STORAGE_KEY])).toEqual(tasks)
  })

  it('does not throw when storage fails', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota')
      },
    })
    expect(() => saveTasks([])).not.toThrow()
  })
})
