'use client'
import { clearLog } from '@/mcp/server-functions'

export function ClearButton() {
  return (
    <button
      className="text-white px-2 py-1 mt-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
      onClick={async () => await clearLog()}
    >
      Clear Log
    </button>
  )
}
