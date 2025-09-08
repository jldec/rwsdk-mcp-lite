const formatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
  hour12: false,
  timeZoneName: 'short'
})

export function greet(name: string = 'world'): string {
  name = name.trim()
  const now = new Date()
  const formattedTime = formatter.format(now)
  if (name === 'error') throw new Error(`greet 'error' alwoys throws error.`)
  return `👋 hello ${name} ${formattedTime} 🚀`
}
