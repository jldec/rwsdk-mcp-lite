import { defineApp } from 'rwsdk/worker'
import { env } from 'cloudflare:workers'
import { realtimeRoute } from 'rwsdk/realtime/worker'
import { route, render } from 'rwsdk/router'

import { Document } from '@/app/Document'
import { Home } from '@/app/Home'
import { httpHandler } from '@/mcp'

export { RealtimeDurableObject } from 'rwsdk/realtime/durableObject'
export { Logger } from '@/logger'

export type AppContext = {}

export default defineApp([
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  route('/mcp', (r) => httpHandler(r.request)),
  render(Document, [route('/', Home)])
])
