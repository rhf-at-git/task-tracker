import type { Task } from '../lib/tasks'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className={task.done ? 'task done' : 'task'}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <button
        type="button"
        className="delete"
        onClick={() => onDelete(task.id)}
        aria-label={`${task.title} löschen`}
      >
        Löschen
      </button>
    </li>
  )
}
