'use server'
import { logger } from '@/mcp/logger'

export async function clearLog() {
  logger.clear()
}
