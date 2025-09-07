import { requestInfo } from 'rwsdk/worker'
import { Nav } from './Nav'

export function Layout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl p-2">
      <title>{`rwsdk-mcp-lite - ${title}`}</title>
      <Nav />
      <div className="text-gray-500 text-sm mt-2">{requestInfo.request.url}</div>
      <hr className="text-gray-200 my-4" />
      <main>
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  )
}
