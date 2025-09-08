import { requestInfo as r } from 'rwsdk/worker'
import { Layout } from './Layout'
import { resolveLogger } from '@/logger'
import { ClearButton } from './ClearButton'

export async function Home() {
  const url = new URL(r.request.url)
  const logger = resolveLogger()
  const logData = [...(await logger.getLogData())] // copy array to avoid blowing up
  return (
    <Layout title="rwsdk-mcp-lite">
      <div>
        Minimal MCP server using fiberplane{' '}
        <a className="text-blue-500 underline" href="https://github.com/fiberplane/mcp" target="_blank">
          mcp-lite
        </a>
        <br />
        <code>{url.origin}/mcp</code>
        <br />
        Log output will appear below
        <br />
        <ClearButton />
      </div>
      {logData.map((entry, i) => (
        <pre key={i} className="mt-2 text-sm border border-gray-300 rounded-md p-2">
          {entry}
        </pre>
      ))}
    </Layout>
  )
}
