import React, { createContext, useContext, useState, useEffect } from 'react'

const TalentContext = createContext(null)

const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Staff Frontend Architect',
    department: 'Core Platform',
    location: 'Remote, US/EU',
    type: 'Full-time',
    status: 'active',
    applicantsCount: 48,
    pipeline: { applied: 24, screen: 12, interview: 8, offer: 3, hired: 1 },
    tags: ['React', 'TypeScript', 'Design Systems', 'Next.js'],
    description: 'Lead the architecture of modern web interfaces, design system tokens, and client performance at scale.',
    hiringLead: 'Evelyn Shaw',
    posted: '3d ago',
  },
  {
    id: 'job-2',
    title: 'Principal Machine Learning Engineer',
    department: 'Applied AI',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'active',
    applicantsCount: 32,
    pipeline: { applied: 16, screen: 8, interview: 6, offer: 2, hired: 0 },
    tags: ['PyTorch', 'Distributed Systems', 'LLMs', 'CUDA'],
    description: 'Design and deploy foundational inference engines and fine-tuning pipelines for enterprise automation.',
    hiringLead: 'Marcus Vance',
    posted: '5d ago',
  },
  {
    id: 'job-3',
    title: 'Product Design Lead',
    department: 'Experience Design',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'active',
    applicantsCount: 29,
    pipeline: { applied: 15, screen: 7, interview: 5, offer: 1, hired: 1 },
    tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    description: 'Define the craft, interaction patterns, and micro-interactions across the entire talent operating system.',
    hiringLead: 'Claire Chen',
    posted: '1w ago',
  },
  {
    id: 'job-4',
    title: 'Systems & Infrastructure Specialist',
    department: 'Site Reliability',
    location: 'Remote',
    type: 'Full-time',
    status: 'archived',
    applicantsCount: 19,
    pipeline: { applied: 12, screen: 4, interview: 3, offer: 0, hired: 0 },
    tags: ['Kubernetes', 'Terraform', 'Rust', 'eBPF'],
    description: 'Architect self-healing cloud infrastructure and low-latency internal developer toolchains.',
    hiringLead: 'Devin Cole',
    posted: '3w ago',
  },
]

const INITIAL_CANDIDATES = [
  {
    id: 'c-1',
    name: 'Siddharth Rao',
    email: 'siddharth@example.com',
    jobId: 'job-1',
    jobTitle: 'Staff Frontend Architect',
    stage: 'interview', // applied, screen, interview, offer, hired
    rating: 4.9,
    source: 'Direct Inbound',
    appliedDate: '2 days ago',
    location: 'San Francisco, CA',
    notes: [
      { id: 'n-1', author: 'Evelyn Shaw', text: 'Exceptional deep dive on micro-frontend state propagation.', time: '1d ago' },
    ],
    timeline: [
      { id: 't-1', action: 'Technical Deep-Dive', stage: 'interview', time: 'Yesterday' },
      { id: 't-2', action: 'Recruiter Pre-screen', stage: 'screen', time: '3 days ago' },
      { id: 't-3', action: 'Application Received', stage: 'applied', time: '4 days ago' },
    ],
  },
  {
    id: 'c-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    jobId: 'job-2',
    jobTitle: 'Principal Machine Learning Engineer',
    stage: 'offer',
    rating: 5.0,
    source: 'Executive Referral',
    appliedDate: '1 week ago',
    location: 'Zurich, Switzerland',
    notes: [
      { id: 'n-2', author: 'Marcus Vance', text: 'Top 1% domain knowledge in parallel attention kernels.', time: '2d ago' },
    ],
    timeline: [
      { id: 't-4', action: 'Offer Package Drafted', stage: 'offer', time: '1 day ago' },
      { id: 't-5', action: 'Architecture Review', stage: 'interview', time: '4 days ago' },
      { id: 't-6', action: 'Sourced via Referral', stage: 'applied', time: '1 week ago' },
    ],
  },
  {
    id: 'c-3',
    name: 'Julian Hayes',
    email: 'julian.h@example.com',
    jobId: 'job-3',
    jobTitle: 'Product Design Lead',
    stage: 'screen',
    rating: 4.6,
    source: 'Portfolio Drop',
    appliedDate: 'Just now',
    location: 'London, UK',
    notes: [
      { id: 'n-3', author: 'Claire Chen', text: 'Portfolio demonstrates world-class minimalism.', time: '3h ago' },
    ],
    timeline: [
      { id: 't-7', action: 'Portfolio Screened', stage: 'screen', time: '3 hours ago' },
      { id: 't-8', action: 'Inbound Submission', stage: 'applied', time: '5 hours ago' },
    ],
  },
  {
    id: 'c-4',
    name: 'Amina Nour',
    email: 'amina.nour@example.com',
    jobId: 'job-1',
    jobTitle: 'Staff Frontend Architect',
    stage: 'applied',
    rating: 4.4,
    source: 'GitHub Sourced',
    appliedDate: '4 hours ago',
    location: 'Berlin, Germany',
    notes: [],
    timeline: [
      { id: 't-9', action: 'Applied to Requisition', stage: 'applied', time: '4 hours ago' },
    ],
  },
  {
    id: 'c-5',
    name: 'Marcus Brody',
    email: 'm.brody@example.com',
    jobId: 'job-2',
    jobTitle: 'Principal Machine Learning Engineer',
    stage: 'interview',
    rating: 4.8,
    source: 'LinkedIn Talent',
    appliedDate: '3 days ago',
    location: 'Seattle, WA',
    notes: [
      { id: 'n-4', author: 'Marcus Vance', text: 'Strong systems design, discussing cluster scheduling.', time: 'Yesterday' },
    ],
    timeline: [
      { id: 't-10', action: 'System Design Interview', stage: 'interview', time: 'Yesterday' },
      { id: 't-11', action: 'Introductory Call', stage: 'screen', time: '3 days ago' },
    ],
  },
  {
    id: 'c-6',
    name: 'Sophie Martin',
    email: 's.martin@example.com',
    jobId: 'job-3',
    jobTitle: 'Product Design Lead',
    stage: 'hired',
    rating: 4.9,
    source: 'Direct Inbound',
    appliedDate: '2 weeks ago',
    location: 'Paris, France',
    notes: [
      { id: 'n-5', author: 'Claire Chen', text: 'Signed offer letter! Start date next month.', time: '1w ago' },
    ],
    timeline: [
      { id: 't-12', action: 'Signed Offer Letter', stage: 'hired', time: '1 week ago' },
      { id: 't-13', action: 'Offer Extended', stage: 'offer', time: '10 days ago' },
    ],
  },
]

const INITIAL_ASSESSMENTS = [
  {
    id: 'ass-1',
    jobId: 'job-1',
    title: 'Frontend Architecture & Systems Screen',
    sections: [
      {
        id: 's-1',
        name: 'State & Concurrency Foundations',
        questions: [
          { id: 'q-1', text: 'Explain your strategy for client-side optimistic UI reconciliations during network drops.', type: 'text', required: true },
          { id: 'q-2', text: 'Rate your familiarity with micro-bundle streaming and partial hydration.', type: 'choice', required: true },
        ],
      },
      {
        id: 's-2',
        name: 'Design System Governance',
        questions: [
          { id: 'q-3', text: 'How do you architect token deprecation cycles without breaking downstream consumer repos?', type: 'text', required: false },
        ],
      },
    ],
  },
]

export function TalentProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('talent_jobs_v2')
      return saved ? JSON.parse(saved) : INITIAL_JOBS
    } catch {
      return INITIAL_JOBS
    }
  })

  const [candidates, setCandidates] = useState(() => {
    try {
      const saved = localStorage.getItem('talent_candidates_v2')
      return saved ? JSON.parse(saved) : INITIAL_CANDIDATES
    } catch {
      return INITIAL_CANDIDATES
    }
  })

  const [assessments, setAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem('talent_assessments_v2')
      return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS
    } catch {
      return INITIAL_ASSESSMENTS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('talent_jobs_v2', JSON.stringify(jobs))
    } catch (e) {
      console.warn(e)
    }
  }, [jobs])

  useEffect(() => {
    try {
      localStorage.setItem('talent_candidates_v2', JSON.stringify(candidates))
    } catch (e) {
      console.warn(e)
    }
  }, [candidates])

  useEffect(() => {
    try {
      localStorage.setItem('talent_assessments_v2', JSON.stringify(assessments))
    } catch (e) {
      console.warn(e)
    }
  }, [assessments])

  const advanceCandidateStage = (candidateId, nextStage) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const actionLabel = `Moved to ${nextStage.toUpperCase()}`
          const newTimelineItem = {
            id: `t-${Date.now()}`,
            action: actionLabel,
            stage: nextStage,
            time: 'Just now',
          }
          return {
            ...c,
            stage: nextStage,
            timeline: [newTimelineItem, ...c.timeline],
          }
        }
        return c
      })
    )
  }

  const addCandidateNote = (candidateId, text, author = 'You') => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const newNote = { id: `n-${Date.now()}`, author, text, time: 'Just now' }
          return { ...c, notes: [newNote, ...c.notes] }
        }
        return c
      })
    )
  }

  const toggleJobStatus = (jobId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: j.status === 'active' ? 'archived' : 'active' }
          : j
      )
    )
  }

  const createJob = (newJobData) => {
    const newJob = {
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      pipeline: { applied: 0, screen: 0, interview: 0, offer: 0, hired: 0 },
      status: 'active',
      posted: 'Just now',
      ...newJobData,
    }
    setJobs((prev) => [newJob, ...prev])
    return newJob
  }

  const saveAssessment = (jobId, updatedAssessment) => {
    setAssessments((prev) => {
      const idx = prev.findIndex((a) => a.jobId === jobId)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], ...updatedAssessment }
        return next
      }
      return [...prev, { id: `ass-${Date.now()}`, jobId, ...updatedAssessment }]
    })
  }

  return (
    <TalentContext.Provider
      value={{
        jobs,
        candidates,
        assessments,
        advanceCandidateStage,
        addCandidateNote,
        toggleJobStatus,
        createJob,
        saveAssessment,
      }}
    >
      {children}
    </TalentContext.Provider>
  )
}

export function useTalent() {
  const ctx = useContext(TalentContext)
  if (!ctx) throw new Error('useTalent must be used within a TalentProvider')
  return ctx
}
