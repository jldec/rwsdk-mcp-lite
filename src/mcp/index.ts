import { McpServer, StreamableHttpTransport } from 'mcp-lite'
import { z } from 'zod'
import { greet } from './greet'
import { logger } from './logger'

const mcp = new McpServer({
  name: 'rwsdk-mcp-lite',
  version: '1.0.0',
  schemaAdapter: (schema) => z.toJSONSchema(schema as z.ZodType)
})

mcp.tool('hello', {
  description: "Simple greeter tool MCP - says hello to name (defaults to 'world')",
  inputSchema: z.object({
    name: z.optional(z.string())
  }),
  handler: (args) => ({
    content: [{ type: 'text', text: greet(args.name) }]
  })
})

mcp.use(async (ctx, next) => {
  try {
    await next()
    logger.log(ctx)
  } catch (error) {
    logger.log(['' + error, ctx])
  }
})

export const httpHandler = new StreamableHttpTransport().bind(mcp)
