import GitHubLogo from './GitHubLogo'

export function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl p-2 relative">
      <title>{title}</title>
      <main>
        <h1 className="text-2xl font-bold">
          <a href="https://github.com/jldec/rwsdk-mcp-lite" className="block border-b mb-2 border-gray-300 group" title="GitHub">
            {title}
            <GitHubLogo className="ml-2 inline-block align-baseline group-hover:scale-120 transition-transform duration-100" />
          </a>
        </h1>
        {children}
      </main>
    </div>
  )
}
