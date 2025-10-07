import { rest } from 'msw'
import { db } from '../db'
import { nanoid } from 'nanoid'

const randomDelay = () => Math.floor(200 + Math.random() * 1000)
const maybeError = (rate = 0.07) => Math.random() < rate

export const handlers = [
  // GET /jobs
  rest.get('/api/jobs', async (req, res, ctx) => {
    const search = req.url.searchParams.get('search') || ''
    const status = req.url.searchParams.get('status') || ''
    const page = parseInt(req.url.searchParams.get('page') || '1')
    const pageSize = parseInt(req.url.searchParams.get('pageSize') || '10')
    let all = await db.jobs.toArray()
    if (search) all = all.filter(j => j.title.toLowerCase().includes(search.toLowerCase()))
    if (status) all = all.filter(j => j.status === status)
    all.sort((a, b) => a.order - b.order)
    const start = (page - 1) * pageSize
    const pageItems = all.slice(start, start + pageSize)
    return res(ctx.delay(randomDelay()), ctx.json({ items: pageItems, total: all.length }))
  }),

  // POST /jobs
  rest.post('/api/jobs', async (req, res, ctx) => {
    const body = await req.json()
    if (maybeError(0.08)) return res(ctx.delay(randomDelay()), ctx.status(500), ctx.json({ error: 'Simulated server error' }))
    const id = body.id || nanoid()
    const job = { id, title: body.title, slug: body.slug, status: body.status || 'active', tags: body.tags || [], order: body.order || Date.now() }
    await db.jobs.put(job)
    return res(ctx.delay(randomDelay()), ctx.json(job))
  }),

  // PATCH /jobs/:id
  rest.patch('/api/jobs/:id', async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json()
    if (maybeError(0.08)) return res(ctx.delay(randomDelay()), ctx.status(500), ctx.json({ error: 'Simulated server error' }))
    await db.jobs.update(id, body)
    const updated = await db.jobs.get(id)
    return res(ctx.delay(randomDelay()), ctx.json(updated))
  }),

  // PATCH reorder
  rest.patch('/api/jobs/:id/reorder', async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json()
    const fail = Math.random() < 0.12
    const from = body.fromOrder
    const to = body.toOrder
    const a = await db.jobs.get({ order: from })
    const b = await db.jobs.get({ order: to })
    if (!a || !b) return res(ctx.delay(randomDelay()), ctx.status(400), ctx.json({ error: 'invalid order' }))
    if (fail) return res(ctx.delay(randomDelay()), ctx.status(500), ctx.json({ error: 'random failure for rollback test' }))
    await db.transaction('rw', db.jobs, async () => {
      await db.jobs.update(a.id, { order: to })
      await db.jobs.update(b.id, { order: from })
    })
    return res(ctx.delay(randomDelay()), ctx.json({ success: true }))
  }),

  // GET /candidates
  rest.get('/api/candidates', async (req, res, ctx) => {
    const search = req.url.searchParams.get('search') || ''
    const stage = req.url.searchParams.get('stage') || ''
    const page = parseInt(req.url.searchParams.get('page') || '1')
    const pageSize = parseInt(req.url.searchParams.get('pageSize') || '50')
    let all = await db.candidates.toArray()
    if (search) all = all.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
    if (stage) all = all.filter(c => c.stage === stage)
    const start = (page - 1) * pageSize
    const pageItems = all.slice(start, start + pageSize)
    return res(ctx.delay(randomDelay()), ctx.json({ items: pageItems, total: all.length }))
  }),

  // POST /candidates
  rest.post('/api/candidates', async (req, res, ctx) => {
    const body = await req.json()
    if (maybeError(0.08)) return res(ctx.delay(randomDelay()), ctx.status(500), ctx.json({ error: 'Sim error' }))
    const id = nanoid()
    const c = { id, name: body.name, email: body.email, jobId: body.jobId, stage: body.stage || 'applied' }
    await db.candidates.put(c)
    return res(ctx.delay(randomDelay()), ctx.json(c))
  }),

  // PATCH /candidates/:id
  rest.patch('/api/candidates/:id', async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json()
    if (maybeError(0.08)) return res(ctx.delay(randomDelay()), ctx.status(500), ctx.json({ error: 'Sim error' }))
    await db.candidates.update(id, body)
    const updated = await db.candidates.get(id)
    return res(ctx.delay(randomDelay()), ctx.json(updated))
  }),

  // GET /candidates/:id/timeline
  rest.get('/api/candidates/:id/timeline', async (req, res, ctx) => {
    const { id } = req.params
    const events = [
      { ts: Date.now() - 1000 * 60 * 60 * 24 * 10, text: 'Applied' },
      { ts: Date.now() - 1000 * 60 * 60 * 24 * 5, text: 'Screened' },
      { ts: Date.now() - 1000 * 60 * 60 * 24 * 2, text: 'Technical interview' }
    ]
    return res(ctx.delay(randomDelay()), ctx.json(events))
  }),

  // Assessments
  rest.get('/api/assessments/:jobId', async (req, res, ctx) => {
    const { jobId } = req.params
    const a = await db.assessments.get(jobId)
    return res(ctx.delay(randomDelay()), ctx.json(a || null))
  }),

  rest.put('/api/assessments/:jobId', async (req, res, ctx) => {
    const { jobId } = req.params
    const body = await req.json()
    await db.assessments.put({ ...body, jobId })
    return res(ctx.delay(randomDelay()), ctx.json({ ok: true }))
  }),

  rest.post('/api/assessments/:jobId/submit', async (req, res, ctx) => {
    const { jobId } = req.params
    const body = await req.json()
    const a = await db.assessments.get(jobId) || {}
    const responses = a.responses || []
    responses.push({ id: nanoid(), ts: Date.now(), response: body })
    await db.assessments.put({ ...a, jobId, responses })
    return res(ctx.delay(randomDelay()), ctx.json({ ok: true }))
  }),

  // ✅ Optional fallback for GET /
  rest.get('/', (req, res, ctx) => {
    return res(ctx.status(200)) // bypass main page
  }),
]
