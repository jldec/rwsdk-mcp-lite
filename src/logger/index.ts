import { DurableObject } from 'cloudflare:workers'
import { renderRealtimeClients } from 'rwsdk/realtime/worker'
import { env } from 'cloudflare:workers'

export class Logger extends DurableObject {
  private logData: string[] = []

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    ctx.blockConcurrencyWhile(async () => {
      this.logData = (await ctx.storage.get('logData')) ?? []
    })
  }

  getLogData() {
    return this.logData
  }

  log(data: string) {
    // console.log('log', data)
    this.logData.unshift(data)
    this.onUpdate()
  }

  clear() {
    this.logData.length = 0
    this.onUpdate()
  }

  private onUpdate() {
    this.ctx.waitUntil(syncRealtimeClients())
    this.ctx.waitUntil(this.saveLogData())
  }

  private async saveLogData() {
    if (this.logData.length > 0) {
      await this.ctx.storage.put('logData', this.logData)
    } else {
      await this.ctx.storage.deleteAll()
    }
  }
}

export function resolveLogger() {
  const id = env.LOGGER_DURABLE_OBJECT.idFromName('rwsdk-mcp-lite-logger')
  return env.LOGGER_DURABLE_OBJECT.get(id)
}

async function syncRealtimeClients() {
  await renderRealtimeClients({
    durableObjectNamespace: env.REALTIME_DURABLE_OBJECT,
    key: 'rwsdk-mcp-lite'
  })
}
