import { useState } from 'react'
import { FilterBar } from './components/FilterBar'
import { TaskCounter } from './components/TaskCounter'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import { countOpen, filterTasks, type Filter } from './lib/tasks'
import './App.css'

function App() {
  const { tasks, add, toggle, remove } = useTasks()
  const [filter, setFilter] = useState<Filter>('all')

  return (
    <main className="app">
      <h1>Task-Tracker</h1>
      <TaskForm onAdd={add} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={filterTasks(tasks, filter)}
        onToggle={toggle}
        onDelete={remove}
      />
      <TaskCounter open={countOpen(tasks)} />
    </main>
  )
}

export default App
