import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  Divider,
  IconButton,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import { useTalent } from '../context/TalentContext'

export default function Assessments() {
  const { jobs, assessments, saveAssessment } = useTalent()
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '')
  const [assessment, setAssessment] = useState({ sections: [] })
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Load rubric when selected job changes
  useEffect(() => {
    if (selectedJobId && assessments[selectedJobId]) {
      setAssessment(JSON.parse(JSON.stringify(assessments[selectedJobId])))
    } else if (selectedJobId) {
      setAssessment({
        jobId: selectedJobId,
        title: `${jobs.find((j) => j.id === selectedJobId)?.title || 'Role'} Assessment Rubric`,
        sections: [
          {
            id: 'sec-1',
            title: 'Technical Core Competency',
            questions: [
              { id: 'q-1', text: 'System architecture depth and scalability patterns', type: 'score_1_5', required: true },
              { id: 'q-2', text: 'Clean code, testing methodology, and type safety', type: 'score_1_5', required: true },
            ],
          },
        ],
      })
    }
  }, [selectedJobId, assessments, jobs])

  const handleSave = () => {
    if (!selectedJobId) return
    saveAssessment(selectedJobId, assessment)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const addSection = () => {
    setAssessment((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `sec-${Date.now()}`,
          title: 'Evaluation Criteria Section',
          questions: [],
        },
      ],
    }))
  }

  const removeSection = (secId) => {
    setAssessment((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== secId),
    }))
  }

  const updateSectionTitle = (secId, title) => {
    setAssessment((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === secId ? { ...s, title } : s)),
    }))
  }

  const addQuestion = (secId) => {
    setAssessment((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== secId) return s
        return {
          ...s,
          questions: [
            ...s.questions,
            {
              id: `q-${Date.now()}`,
              text: 'New evaluation criterion',
              type: 'score_1_5',
              required: true,
            },
          ],
        }
      }),
    }))
  }

  const removeQuestion = (secId, qId) => {
    setAssessment((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== secId) return s
        return {
          ...s,
          questions: s.questions.filter((q) => q.id !== qId),
        }
      }),
    }))
  }

  const updateQuestion = (secId, qId, field, val) => {
    setAssessment((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== secId) return s
        return {
          ...s,
          questions: s.questions.map((q) => (q.id === qId ? { ...q, [field]: val } : q)),
        }
      }),
    }))
  }

  const selectedJob = jobs.find((j) => j.id === selectedJobId)

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.025em', color: '#0F172A' }}>
            Assessment Architect
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Configure standardized evaluation rubrics bound to specific job requisitions.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Job Requisition Selector */}
          <FormControl size="small" sx={{ minWidth: 260 }}>
            <InputLabel id="job-select-label" sx={{ fontSize: '0.85rem' }}>Select Requisition</InputLabel>
            <Select
              labelId="job-select-label"
              label="Select Requisition"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: 2,
                fontSize: '0.875rem',
              }}
            >
              {jobs.map((j) => (
                <MenuItem key={j.id} value={j.id}>
                  {j.title} ({j.department})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={savedSuccess ? <CheckIcon sx={{ fontSize: 18 }} /> : <AssignmentOutlinedIcon sx={{ fontSize: 18 }} />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '0.85rem',
              px: 2.25,
              py: 0.85,
              background: savedSuccess 
                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                : 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
              boxShadow: savedSuccess
                ? '0 2px 8px rgba(16, 185, 129, 0.25)'
                : '0 2px 8px rgba(79, 70, 229, 0.25)',
            }}
          >
            {savedSuccess ? 'Rubric Saved' : 'Save Rubric'}
          </Button>
        </Box>
      </Box>

      {/* Requisition Meta Banner */}
      {selectedJob && (
        <Paper elevation={0} sx={{ p: 2.25, borderRadius: 2.5, border: '1px solid #C7D2FE', bgcolor: '#EEF2FF', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="#312E81">
              Active Assessment Blueprint: {selectedJob.title}
            </Typography>
            <Typography variant="caption" color="#4F46E5">
              Department: {selectedJob.department} • Total In Pipeline: {selectedJob.applicantsCount}
            </Typography>
          </Box>
          <Chip
            label={`${assessment.sections?.length || 0} Rubric Sections`}
            size="small"
            sx={{ bgcolor: '#FFFFFF', color: '#4F46E5', fontWeight: 700, fontSize: '0.725rem', borderRadius: 1, border: '1px solid #C7D2FE' }}
          />
        </Paper>
      )}

      {/* Sections Container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {assessment.sections?.map((section, sIndex) => (
          <Paper
            key={section.id}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2.5,
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              transition: 'all 0.15s ease',
              '&:hover': {
                borderColor: '#CBD5E1',
              },
            }}
          >
            {/* Section Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: 1.5,
                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {sIndex + 1}
                </Box>
                <TextField
                  variant="standard"
                  placeholder="Section Category Title"
                  value={section.title}
                  onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' },
                  }}
                  sx={{ flexGrow: 1 }}
                />
              </Box>

              <Tooltip title="Delete Category Section">
                <IconButton size="small" onClick={() => removeSection(section.id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444' } }}>
                  <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            {/* Questions List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.questions.map((q, qIndex) => (
                <Paper
                  key={q.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                    bgcolor: '#F8FAFC',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' } }}>
                    <TextField
                      size="small"
                      placeholder="Question or Evaluation Rubric Prompt"
                      value={q.text}
                      onChange={(e) => updateQuestion(section.id, q.id, 'text', e.target.value)}
                      fullWidth
                      sx={{ bgcolor: '#FFFFFF', borderRadius: 1.5 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <Select
                        value={q.type}
                        onChange={(e) => updateQuestion(section.id, q.id, 'type', e.target.value)}
                        sx={{ bgcolor: '#FFFFFF', fontSize: '0.8rem', borderRadius: 1.5 }}
                      >
                        <MenuItem value="score_1_5">Score (1 - 5)</MenuItem>
                        <MenuItem value="pass_fail">Pass / Fail</MenuItem>
                        <MenuItem value="free_text">Written Feedback</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          checked={q.required}
                          onChange={(e) => updateQuestion(section.id, q.id, 'required', e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#4F46E5',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#4F46E5',
                            },
                          }}
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Required</Typography>}
                      sx={{ m: 0 }}
                    />

                    <IconButton size="small" onClick={() => removeQuestion(section.id, q.id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444' } }}>
                      <DeleteOutlineIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                  </Box>
                </Paper>
              ))}

              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                onClick={() => addQuestion(section.id)}
                sx={{
                  alignSelf: 'flex-start',
                  borderRadius: 1.5,
                  fontSize: '0.78rem',
                  borderColor: '#C7D2FE',
                  bgcolor: '#EEF2FF',
                  color: '#4F46E5',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#4F46E5',
                    color: '#4338CA',
                    bgcolor: '#E0E7FF',
                  },
                }}
              >
                Add Rubric Question
              </Button>
            </Box>
          </Paper>
        ))}

        {/* Add New Section Button */}
        <Button
          variant="outlined"
          startIcon={<AddIcon sx={{ fontSize: 18 }} />}
          onClick={addSection}
          sx={{
            py: 1.75,
            borderStyle: 'dashed',
            borderColor: '#CBD5E1',
            borderRadius: 2.5,
            color: '#64748B',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              borderColor: '#4F46E5',
              color: '#4F46E5',
              bgcolor: '#F8FAFC',
            },
          }}
        >
          Add Evaluation Section
        </Button>
      </Box>
    </Container>
  )
}
