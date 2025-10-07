import React, { useEffect, useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  Divider,
} from '@mui/material'
import { db } from '../db'

export default function Assessments() {
  const [jobId, setJobId] = useState('')
  const [assessment, setAssessment] = useState({ sections: [] })
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const all = await db.jobs.toArray()
    setJobs(all)
    if (all[0] && !jobId) setJobId(all[0].id)
  }

  useEffect(() => {
    if (jobId) load()
  }, [jobId])

  async function load() {
    const res = await fetch(`/api/assessments/${jobId}`)
    const a = await res.json()
    setAssessment(a || { sections: [] })
  }

  const addSection = () => {
    setAssessment((s) => ({
      ...s,
      sections: [...s.sections, { id: Date.now().toString(), title: 'New Section', questions: [] }],
    }))
  }
  const addQuestion = (sec) => {
    const q = { id: Date.now().toString(), type: 'text', text: 'New Q', required: false }
    setAssessment((s) => ({
      ...s,
      sections: s.sections.map((x) =>
        x.id === sec.id ? { ...x, questions: [...x.questions, q] } : x
      ),
    }))
  }

  const save = async () => {
    await fetch(`/api/assessments/${jobId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(assessment),
    })
    alert('Saved')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        p: 2,
      }}
    >
      {/* Builder Panel */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Assessment Builder
        </Typography>

        <Select
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mb: 3 }}
        >
          {!jobs.length && <MenuItem disabled>No jobs available</MenuItem>}
          {jobs.map((j) => (
            <MenuItem key={j.id} value={j.id}>
              {j.title}
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" onClick={addSection} sx={{ mb: 3 }}>
          Add Section
        </Button>

        {assessment.sections.map((sec) => (
          <Paper key={sec.id} sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <TextField
              label="Section Title"
              value={sec.title}
              fullWidth
              onChange={(e) =>
                setAssessment((s) => ({
                  ...s,
                  sections: s.sections.map((x) =>
                    x.id === sec.id ? { ...x, title: e.target.value } : x
                  ),
                }))
              }
              sx={{ mb: 2 }}
            />

            <Divider sx={{ mb: 2 }} />

            {sec.questions.map((q) => (
              <Paper
                key={q.id}
                variant="outlined"
                sx={{ p: 2, mb: 2, borderRadius: 1 }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  {q.text} {q.required ? '(required)' : '(optional)'}
                </Typography>
                <TextField
                  placeholder={`Answer (${q.type})`}
                  disabled
                  fullWidth
                  size="small"
                />
              </Paper>
            ))}

            <Button variant="outlined" size="small" onClick={() => addQuestion(sec)}>
              Add Question
            </Button>
          </Paper>
        ))}

        <Button variant="contained" fullWidth onClick={save}>
          Save Assessment
        </Button>
      </Box>

      {/* Live Preview */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Live Preview
        </Typography>

        <Paper sx={{ p: 3, maxHeight: '80vh', overflowY: 'auto', borderRadius: 2, boxShadow: 3 }}>
          {assessment.sections.length === 0 && (
            <Typography color="text.secondary">
              Add sections and questions to preview the assessment.
            </Typography>
          )}

          {assessment.sections.map((sec) => (
            <Box key={sec.id} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {sec.title}
              </Typography>

              {sec.questions.map((q) => (
                <Box key={q.id} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {q.text}
                  </Typography>
                  <TextField
                    placeholder={`Answer (${q.type})`}
                    disabled
                    fullWidth
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  )
}
