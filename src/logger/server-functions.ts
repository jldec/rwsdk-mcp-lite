'use server'
import { resolveLogger } from '@/logger'

export async function clearLog() {
  const logger = resolveLogger()
  await logger.clear()
}
