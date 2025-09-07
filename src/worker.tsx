import { defineApp } from 'rwsdk/worker'
import { env } from 'cloudflare:workers'
import { realtimeRoute } from 'rwsdk/realtime/worker'
import { route, render } from 'rwsdk/router'

import { Document } from '@/app/Document'
import { Home } from '@/app/Home'
import { About } from '@/app/About'

export { RealtimeDurableObject } from 'rwsdk/realtime/durableObject'

export type AppContext = {}

export default defineApp([
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [
    route('/', Home),
    route('/about', About)
  ])
])
