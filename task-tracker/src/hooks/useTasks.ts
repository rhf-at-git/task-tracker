import { useEffect, useState } from 'react'
import { loadTasks, saveTasks } from '../lib/storage'
import { addTask, deleteTask, toggleTask } from '../lib/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  return {
    tasks,
    add: (title: string) => setTasks((t) => addTask(t, title)),
    toggle: (id: string) => setTasks((t) => toggleTask(t, id)),
    remove: (id: string) => setTasks((t) => deleteTask(t, id)),
  }
}
