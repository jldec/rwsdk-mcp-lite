import { renderRealtimeClients } from 'rwsdk/realtime/worker'
import { env } from 'cloudflare:workers'

class Logger {
  private logData: any[] = []

  log(data: any) {
    this.logData.unshift(data)
    syncRealtimeClients()
  }

  clear() {
    this.logData.length = 0
    syncRealtimeClients()
  }

  getLogData() {
    return this.logData
  }
}

export const logger = new Logger()

async function syncRealtimeClients() {
  await renderRealtimeClients({
    durableObjectNamespace: env.REALTIME_DURABLE_OBJECT,
    key: 'rwsdk-mcp-lite'
  })
}
