import { requestInfo as r } from 'rwsdk/worker'
import { Layout } from './Layout'
import { logger } from '@/mcp/logger'
import { ClearButton } from './ClearButton'

export function Home() {
  const url = new URL(r.request.url)
  return (
    <Layout title="rwsdk-mcp-lite">
      <div>
        Minimal MCP server using fiberplane{' '}
        <a className="text-blue-500 underline" href="https://github.com/fiberplane/mcp" target="_blank">
          mcp-lite
        </a>
        <br />
        Listening at <code>{url.origin}</code>/mcp.
        <br />
        Log output will appear below.
        <br />
        <ClearButton />
      </div>
      {logger.getLogData().map((entry: any, i: number) => (
        <pre key={i} className="mt-2 text-sm border border-gray-300 rounded-md p-2">
          {JSON.stringify(entry, null, 2)}
        </pre>
      ))}
    </Layout>
  )
}
