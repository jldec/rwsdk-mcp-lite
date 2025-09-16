'use client'

import { useState } from 'react'

export function HelloForm() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await callHelloTool()
  }

  const callHelloTool = async () => {
    try {
      setError('')
      const response = await fetch('/mcp', {
        method: 'POST',
        headers: {
          accept: 'application/json, text/event-stream',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/call',
          params: {
            name: 'hello',
            arguments: name ? { name } : {}
          }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      await handleMcpResponse(response)
    } catch (err: any) {
      setError(err.message ?? 'MCP Error')
    }
  }

  const handleMcpResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('text/event-stream')) {
      // Handle Server-Sent Events
      const reader = response.body?.getReader()
      if (!reader) return

      const decoder = new TextDecoder()
      let eventData = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        eventData += chunk
      }
      console.log('eventData', eventData)
    } else {
      // Handle regular JSON response - will be logged by the server
      const resp = await response.json() as any
      if (resp.error) {
        throw new Error(JSON.stringify(resp.error?.data?.message ?? 'MCP Error'))
      }
      console.log('resp', resp)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mr-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value.trim())}
        placeholder="Enter name"
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Hello
      </button>
      {error && <div className="text-red-500 text-sm ml-2">Error: {error}</div>}
    </form>
  )
}
