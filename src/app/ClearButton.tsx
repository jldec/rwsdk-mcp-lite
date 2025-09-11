'use client'
import { clearLog } from '@/logger/server-functions'

export function ClearButton() {
  return (
    <button
      className="px-2 py-1 text-sm rounded-md border-1 whitespace-nowrap border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={async () => await clearLog()}
    >
      Clear Log
    </button>
  )
}
