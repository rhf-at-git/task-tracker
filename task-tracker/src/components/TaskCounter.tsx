import { formatOpenCount } from '../lib/tasks'

export function TaskCounter({ open }: { open: number }) {
  return <p className="counter">{formatOpenCount(open)}</p>
}
