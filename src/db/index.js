import Dexie from 'dexie'
import { v4 as uuidv4 } from 'uuid'

export const db = new Dexie('talentflow_db')
db.version(1).stores({
  jobs: 'id,slug,title,status,order',
  candidates: 'id,name,email,jobId,stage',
  assessments: 'jobId'
})

export async function initDB(){
  // If empty, seed
  const jobsCount = await db.jobs.count()
  if (jobsCount === 0){
    await seed()
  }
}

async function randomTags(){
  const pool = ['frontend','backend','devops','design','hr','senior','junior']
  const k = Math.floor(Math.random()*3)+1
  const out = []
  for (let i=0;i<k;i++) out.push(pool[Math.floor(Math.random()*pool.length)])
  return [...new Set(out)]
}

async function seed(){
  const jobs = []
  for (let i=1;i<=25;i++){
    const id = uuidv4()
    jobs.push({
      id,
      title: `Job ${i} - ${['Engineer','Designer','Manager','SRE'][i%4]}`,
      slug: `job-${i}`,
      status: i%5===0 ? 'archived' : 'active',
      tags: await randomTags(),
      order: i
    })
  }
  await db.jobs.bulkAdd(jobs)

  const stages = ['applied','screen','tech','offer','hired','rejected']
  const candidates = []
  for (let i=1;i<=1000;i++){
    const jid = jobs[Math.floor(Math.random()*jobs.length)].id
    const name = `Candidate ${i}`
    candidates.push({
      id: uuidv4(),
      name,
      email: `cand${i}@example.com`,
      jobId: jid,
      stage: stages[Math.floor(Math.random()*stages.length)]
    })
  }
  await db.candidates.bulkAdd(candidates)

  // sample assessments
  const sample = {
    jobId: jobs[0].id,
    sections: [
      { id: 's1', title: 'General', questions: [
        { id: 'q1', type: 'single', text: 'Do you have experience?', options: ['Yes','No'], required: true },
        { id: 'q2', type: 'text', text: 'Describe your background', required: false }
      ]}
    ]
  }
  await db.assessments.put(sample)
}
