import type { Filter } from '../lib/tasks'

type Props = { filter: Filter; onChange: (filter: Filter) => void }

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'open', label: 'Offen' },
  { value: 'done', label: 'Erledigt' },
]

export function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={filter === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
