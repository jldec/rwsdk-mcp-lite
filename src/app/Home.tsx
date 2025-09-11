import { requestInfo as r } from 'rwsdk/worker'
import { Layout } from './Layout'
import { resolveLogger } from '@/logger'
import { ClearButton } from './ClearButton'
import { HelloForm } from './HelloForm'

export async function Home() {
  const url = new URL(r.request.url)
  const logger = resolveLogger()
  const logData = [...(await logger.getLogData())] // copy array to avoid blowing up
  return (
    <Layout title="rwsdk-mcp-lite">
      <div>
        <code className="block mb-2 text-sm">{url.origin}/mcp</code>
        Minimal MCP server using fiberplane{' '}
        <a className="text-blue-500 underline" href="https://github.com/fiberplane/mcp" target="_blank">
          mcp-lite
        </a>{' '}
        and RedwookSDK{' '}
        <a className="text-blue-500 underline" href="https://docs.rwsdk.com/core/realtime/" target="_blank">
          realtime RSC
        </a>
        .
        <ul className="list-disc list-outside pl-4 mt-2">
          <li className="">
            Use the form below to call the hello tool, or connect to the streamable HTTP endpoint above from your
            favorite MCP client.
          </li>
          <li className="">
            The MCP log output will appear for all users in realtime at{' '}
            <a href={url.origin + '/'} target="_blank" className="text-blue-500 underline">
              <code>{url.origin + '/'}</code>
            </a>
          </li>
        </ul>
        <div className="mt-4 flex items-end">
          <HelloForm />
          <ClearButton />
        </div>
      </div>
      {logData.map((entry, i) => (
        <pre key={i} className="mt-2 text-sm border border-gray-300 rounded-md p-2">
          {entry}
        </pre>
      ))}
    </Layout>
  )
}
