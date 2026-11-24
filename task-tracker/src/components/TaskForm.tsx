import { useState, type FormEvent } from 'react'

type Props = { onAdd: (title: string) => void }

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onAdd(title)
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Neue Aufgabe"
        aria-label="Neue Aufgabe"
      />
      <button type="submit">Hinzufügen</button>
    </form>
  )
}
