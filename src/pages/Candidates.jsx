import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  InputAdornment,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Search as SearchIcon,
  EmailOutlined as EmailIcon,
  WorkOutline as WorkIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  PersonOutline as PersonIcon,
} from '@mui/icons-material'
import { useTalent } from '../context/TalentContext'

const STAGES = ['applied', 'screen', 'interview', 'offer', 'hired']
const STAGE_LABELS = {
  applied: 'Applied',
  screen: 'Screen',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
}

const STAGE_COLORS = {
  applied: { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' },
  screen: { bg: '#F0F9FF', color: '#0284C7', border: '#BAE6FD' },
  interview: { bg: '#EEF2FF', color: '#4F46E5', border: '#C7D2FE' },
  offer: { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  hired: { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
}

function CandidateTimelineStepper({ currentStage }) {
  const activeStep = STAGES.indexOf(currentStage)

  const CustomConnector = (props) => (
    <StepConnector
      {...props}
      sx={{
        '& .MuiStepConnector-line': {
          borderLeft: `2px solid ${props.completed ? '#4F46E5' : '#E2E8F0'}`,
          minHeight: '28px',
          ml: 1.1,
        },
      }}
    />
  )

  return (
    <Stepper activeStep={activeStep} orientation="vertical" connector={<CustomConnector />}>
      {STAGES.map((s, idx) => {
        const isCompleted = idx < activeStep
        const isCurrent = idx === activeStep
        return (
          <Step key={s} completed={isCompleted}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isCompleted ? '#4F46E5' : isCurrent ? '#6366F1' : '#F1F5F9',
                    color: isCompleted || isCurrent ? '#FFFFFF' : '#94A3B8',
                    border: '2px solid',
                    borderColor: isCompleted || isCurrent ? '#4F46E5' : '#E2E8F0',
                    boxShadow: isCurrent ? '0 0 0 3px rgba(99, 102, 241, 0.2)' : 'none',
                  }}
                >
                  {isCompleted ? (
                    <CheckCircleIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
                  ) : (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: isCurrent ? '#FFFFFF' : '#94A3B8',
                      }}
                    />
                  )}
                </Box>
              )}
            >
              <Box sx={{ ml: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#4F46E5' : isCompleted ? '#0F172A' : '#94A3B8',
                    fontSize: '0.85rem',
                  }}
                >
                  {STAGE_LABELS[s]}
                </Typography>
                {isCurrent && (
                  <Typography variant="caption" sx={{ color: '#6366F1', fontWeight: 600, fontSize: '0.72rem' }}>
                    Current Active Stage
                  </Typography>
                )}
              </Box>
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default function Candidates() {
  const { candidates, advanceCandidateStage, jobs } = useTalent()
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(candidates[0]?.id || null)

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.jobTitle.toLowerCase().includes(search.toLowerCase())
      const matchStage = stageFilter === 'all' ? true : c.stage === stageFilter
      return matchSearch && matchStage
    })
  }, [candidates, search, stageFilter])

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedId) || filteredCandidates[0] || null
  }, [candidates, selectedId, filteredCandidates])

  const handleAdvance = (candId) => {
    const cand = candidates.find((c) => c.id === candId)
    if (!cand) return
    const curIdx = STAGES.indexOf(cand.stage)
    if (curIdx < STAGES.length - 1) {
      const nextStage = STAGES[curIdx + 1]
      advanceCandidateStage(candId, nextStage)
    }
  }

  return (
    <Container maxWidth="xl">
      {/* Top Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.025em', color: '#0F172A' }}>
            Candidate Directory
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Interactive evaluation pipeline. Advance candidates directly through recruitment milestones.
          </Typography>
        </Box>

        {/* Search & Filter Bar */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Stage filter pills */}
          <Box sx={{ display: 'flex', p: 0.5, bgcolor: '#F1F5F9', borderRadius: 2, overflowX: 'auto' }}>
            {['all', 'applied', 'screen', 'interview', 'offer', 'hired'].map((st) => (
              <Button
                key={st}
                size="small"
                onClick={() => setStageFilter(st)}
                sx={{
                  px: 1.5,
                  py: 0.4,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  textTransform: 'capitalize',
                  color: stageFilter === st ? '#4F46E5' : '#64748B',
                  bgcolor: stageFilter === st ? '#FFFFFF' : 'transparent',
                  boxShadow: stageFilter === st ? '0 1px 4px rgba(0, 0, 0, 0.08)' : 'none',
                  '&:hover': {
                    bgcolor: stageFilter === st ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  },
                }}
              >
                {st === 'all' ? 'All Stages' : STAGE_LABELS[st]}
              </Button>
            ))}
          </Box>

          <TextField
            size="small"
            placeholder="Search candidates by name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: { xs: '100%', sm: 260 },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#FFFFFF',
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </Box>

      {/* Two Column Layout: Directory List & Live Inspection Panel */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
        {/* Candidates List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {filteredCandidates.length === 0 ? (
            <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 2.5, border: '1px dashed #CBD5E1', bgcolor: '#FFFFFF' }}>
              <PersonIcon sx={{ fontSize: 40, color: '#94A3B8', mb: 1 }} />
              <Typography variant="h6" fontWeight={600} color="#0F172A">
                No candidates found
              </Typography>
              <Typography variant="body2" color="#64748B">
                Try switching stages or clearing the search keyword.
              </Typography>
            </Paper>
          ) : (
            filteredCandidates.map((c) => {
              const isSelected = selectedCandidate?.id === c.id
              const curIdx = STAGES.indexOf(c.stage)
              const hasNextStage = curIdx < STAGES.length - 1
              const nextStageName = hasNextStage ? STAGE_LABELS[STAGES[curIdx + 1]] : null
              const stageColor = STAGE_COLORS[c.stage] || STAGE_COLORS.applied

              return (
                <Paper
                  key={c.id}
                  elevation={0}
                  onClick={() => setSelectedId(c.id)}
                  sx={{
                    p: 2.25,
                    borderRadius: 2.5,
                    border: '1.5px solid',
                    borderColor: isSelected ? '#4F46E5' : '#E2E8F0',
                    bgcolor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(79, 70, 229, 0.12)' : 'none',
                    '&:hover': {
                      borderColor: isSelected ? '#4F46E5' : '#CBD5E1',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
                      <Avatar 
                        sx={{ 
                          width: 44, 
                          height: 44, 
                          background: isSelected 
                            ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' 
                            : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)', 
                          color: isSelected ? '#FFFFFF' : '#475569', 
                          fontWeight: 700, 
                          fontSize: '0.95rem' 
                        }}
                      >
                        {c.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight={700} color="#0F172A">
                            {c.name}
                          </Typography>
                          <Chip
                            label={STAGE_LABELS[c.stage] || c.stage}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.675rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              bgcolor: stageColor.bg,
                              color: stageColor.color,
                              border: `1px solid ${stageColor.border}`,
                              borderRadius: 1,
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{c.jobTitle}</span>
                          <span>•</span>
                          <span>{c.location}</span>
                        </Typography>
                      </Box>
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {hasNextStage && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAdvance(c.id)
                          }}
                          sx={{
                            borderRadius: 1.5,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderColor: '#C7D2FE',
                            bgcolor: '#EEF2FF',
                            color: '#4F46E5',
                            py: 0.5,
                            px: 1.5,
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: '#E0E7FF',
                              borderColor: '#4F46E5',
                            },
                          }}
                        >
                          Advance to {nextStageName}
                        </Button>
                      )}

                      <Button
                        component={Link}
                        to={`/candidates/${c.id}`}
                        size="small"
                        variant="contained"
                        sx={{
                          borderRadius: 1.5,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          py: 0.5,
                          px: 1.5,
                          textTransform: 'none',
                          background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
                        }}
                      >
                        Profile
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )
            })
          )}
        </Box>

        {/* Right Inspection Panel */}
        <Box>
          {selectedCandidate ? (
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2.5, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', position: 'sticky', top: 80 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="#0F172A">
                    {selectedCandidate.name}
                  </Typography>
                  <Typography variant="body2" color="#64748B">
                    {selectedCandidate.email}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', mt: 0.5, display: 'block' }}>
                    Requisition: {selectedCandidate.jobTitle}
                  </Typography>
                </Box>
                <Chip
                  icon={<StarIcon sx={{ fontSize: '14px !important', color: '#F59E0B' }} />}
                  label={`${selectedCandidate.rating} / 5.0`}
                  size="small"
                  sx={{ bgcolor: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A', fontWeight: 700, fontSize: '0.725rem', borderRadius: 1 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight={700} color="#0F172A" gutterBottom>
                Pipeline Progress
              </Typography>
              <Box sx={{ my: 2 }}>
                <CandidateTimelineStepper currentStage={selectedCandidate.stage} />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight={700} color="#0F172A" gutterBottom>
                Recent Interview Notes ({selectedCandidate.notes?.length || 0})
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
                {selectedCandidate.notes?.length > 0 ? (
                  selectedCandidate.notes.map((n) => (
                    <Box key={n.id} sx={{ p: 1.5, borderRadius: 1.5, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
                        <Typography variant="caption" fontWeight={700} color="#4F46E5">
                          {n.author}
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                          {n.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="#334155" sx={{ fontSize: '0.825rem' }}>
                        {n.text}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="caption" color="#94A3B8">
                    No notes recorded yet.
                  </Typography>
                )}
              </Box>

              <Button
                component={Link}
                to={`/candidates/${selectedCandidate.id}`}
                variant="outlined"
                fullWidth
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: 2, color: '#4F46E5', borderColor: '#C7D2FE', '&:hover': { bgcolor: '#EEF2FF', borderColor: '#4F46E5' } }}
              >
                Open Full Candidate File
              </Button>
            </Paper>
          ) : (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 2.5, border: '1px dashed #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Typography variant="body2" color="#64748B">
                Select a candidate to view their evaluation timeline.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  )
}
