import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Chip,
  Avatar,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TimelineIcon from '@mui/icons-material/Timeline'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useTalent } from '../context/TalentContext'

const STAGES = ['applied', 'screen', 'interview', 'offer', 'hired']
const STAGE_LABELS = {
  applied: 'Applied',
  screen: 'Screen',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
}

export default function CandidateDetail() {
  const { id } = useParams()
  const { candidates, addCandidateNote, advanceCandidateStage } = useTalent()
  const [noteText, setNoteText] = useState('')

  const candidate = useMemo(() => {
    return candidates.find((c) => String(c.id) === String(id)) || null
  }, [candidates, id])

  if (!candidate) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF' }}>
          <Typography variant="h6" color="#09090B" fontWeight={700} gutterBottom>
            Candidate Profile Not Found
          </Typography>
          <Typography variant="body2" color="#71717A" sx={{ mb: 3 }}>
            Could not find candidate file with ID #{id}.
          </Typography>
          <Button component={Link} to="/candidates" variant="contained" startIcon={<ArrowBackIcon />}>
            Back to Candidates
          </Button>
        </Paper>
      </Container>
    )
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!noteText.trim()) return
    addCandidateNote(candidate.id, noteText.trim(), 'Recruiting Lead (You)')
    setNoteText('')
  }

  const curIdx = STAGES.indexOf(candidate.stage)
  const hasNext = curIdx < STAGES.length - 1

  return (
    <Container maxWidth="lg">
      <Button
        component={Link}
        to="/candidates"
        startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
        sx={{ mb: 2.5, color: '#71717A', '&:hover': { color: '#09090B' } }}
      >
        Back to Candidate Directory
      </Button>

      {/* Profile Card */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: '#09090B', color: '#FAFAFA', fontWeight: 700, fontSize: '1.25rem' }}>
              {candidate.name.charAt(0)}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.025em', color: '#09090B' }}>
                  {candidate.name}
                </Typography>
                <Chip
                  label={STAGE_LABELS[candidate.stage] || candidate.stage}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    height: 22,
                    bgcolor: '#09090B',
                    color: '#FAFAFA',
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 0.5, color: '#71717A', fontSize: '0.85rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EmailOutlinedIcon sx={{ fontSize: 15 }} />
                  <span>{candidate.email}</span>
                </Box>
                <span>•</span>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
                  <span>{candidate.location}</span>
                </Box>
                <span>•</span>
                <span>Role: <b>{candidate.jobTitle}</b></span>
              </Box>
            </Box>
          </Box>

          {/* Advance Stage Controls */}
          {hasNext && (
            <Button
              variant="contained"
              onClick={() => advanceCandidateStage(candidate.id, STAGES[curIdx + 1])}
              sx={{ borderRadius: 1.5, textTransform: 'none', px: 2 }}
            >
              Advance to {STAGE_LABELS[STAGES[curIdx + 1]]}
            </Button>
          )}
        </Box>
      </Paper>

      {/* Two Column: Timeline & Notes */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Timeline */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TimelineIcon sx={{ fontSize: 18, color: '#09090B' }} />
            <Typography variant="subtitle1" fontWeight={700} color="#09090B">
              Evaluation History
            </Typography>
          </Box>
          <Divider sx={{ mb: 2.5 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {candidate.timeline?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 1.75,
                  borderRadius: 1.5,
                  border: '1px solid #E4E4E7',
                  bgcolor: '#FAFAFA',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 700, color: '#09090B', fontSize: '0.65rem' }}>
                    {item.stage}
                  </Typography>
                  <Typography variant="caption" color="#71717A">
                    {item.time}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} color="#27272A">
                  {item.action}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Evaluation Notes */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: '#09090B' }} />
            <Typography variant="subtitle1" fontWeight={700} color="#09090B">
              Interview Notes ({candidate.notes?.length || 0})
            </Typography>
          </Box>
          <Divider sx={{ mb: 2.5 }} />

          <form onSubmit={handleAddNote} style={{ marginBottom: '1.5rem' }}>
            <TextField
              label="Add interviewer or recruiter observation"
              placeholder="e.g. Demonstrated exceptional technical depth on distributed caching..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              fullWidth
              size="small"
              multiline
              rows={3}
              sx={{ mb: 1.5 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={!noteText.trim()}
              sx={{ borderRadius: 1.5, textTransform: 'none', px: 2 }}
            >
              Post Note
            </Button>
          </form>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {candidate.notes?.map((n) => (
              <Box key={n.id} sx={{ p: 1.75, borderRadius: 1.5, bgcolor: '#FAFAFA', border: '1px solid #E4E4E7' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" fontWeight={700} color="#09090B">
                    {n.author}
                  </Typography>
                  <Typography variant="caption" color="#71717A">
                    {n.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="#3F3F46" sx={{ fontSize: '0.85rem' }}>
                  {n.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
