export function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl p-2">
      <title>{title}</title>
      <main>
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  )
}
