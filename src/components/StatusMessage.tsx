import type { ReactNode } from 'react'

type Props = {
  tone?: 'info' | 'warning' | 'error'
  children: ReactNode
}

const StatusMessage = ({ tone = 'info', children }: Props) => (
  <div className={`status-message status-message--${tone}`}>{children}</div>
)

export default StatusMessage
