'use client'

import { useAppStore } from '@/store'
import { formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function NotificationsPanel() {
  const { notifications, markAllRead, markRead } = useAppStore()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-text-primary">Notifications</h2>
          <p className="text-[11px] text-text-muted mt-0.5">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button className="btn-secondary" onClick={markAllRead}>Mark all read</button>
        )}
      </div>

      <div className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            className={cn(
              'flex gap-3 px-4 py-3.5 border-b border-border-subtle last:border-0 transition-colors cursor-pointer hover:bg-bg-tertiary',
              !notif.read && 'border-l-2 border-l-blue-500'
            )}
          >
            {!notif.read ? (
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
            ) : (
              <div className="w-2 flex-shrink-0" />
            )}

            <span className="text-xl flex-shrink-0">{notif.icon}</span>

            <div className="flex-1 min-w-0">
              <div className={cn('text-[12.5px] font-medium mb-0.5', notif.read ? 'text-text-secondary' : 'text-text-primary')}>
                {notif.title}
              </div>
              <div className="text-[11.5px] text-text-secondary leading-relaxed">{notif.body}</div>
              <div className="text-[10px] text-text-muted mt-1">{formatRelativeTime(notif.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
