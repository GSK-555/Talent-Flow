import { setupWorker } from 'msw' 
import { handlers } from './handlers'

// Setup MSW with safe unhandled request bypass
export const worker = setupWorker(...handlers)


