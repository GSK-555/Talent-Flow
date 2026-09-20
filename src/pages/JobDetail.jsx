import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Box, 
  Container,
  Typography, 
  Chip, 
  Paper, 
  Divider, 
  Button,
  IconButton,
  Tooltip,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTalent } from '../context/TalentContext'

export default function JobDetail() {
  const { id } = useParams()
  const { jobs, candidates, toggleJobStatus } = useTalent()

  const job = useMemo(() => {
    return jobs.find((j) => String(j.id) === String(id)) || null
  }, [jobs, id])

  const jobCandidates = useMemo(() => {
    return candidates.filter((c) => String(c.jobId) === String(id))
  }, [candidates, id])

  if (!job) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 5, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF' }}>
          <Typography variant="h6" fontWeight={700} color="#09090B" gutterBottom>
            Requisition Not Found
          </Typography>
          <Typography variant="body2" color="#71717A" sx={{ mb: 3 }}>
            The requested requisition #{id} could not be located or has been deleted.
          </Typography>
          <Button component={Link} to="/jobs" variant="contained" startIcon={<ArrowBackIcon />}>
            Back to Requisitions
          </Button>
        </Paper>
      </Container>
    )
  }

  const isActive = job.status === 'active'
  const pipeline = job.pipeline || { applied: 0, screen: 0, interview: 0, offer: 0, hired: 0 }

  return (
    <Container maxWidth="xl">
      <Button
        component={Link}
        to="/jobs"
        startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
        sx={{ mb: 3, color: '#71717A', '&:hover': { color: '#09090B' } }}
      >
        Back to Requisitions
      </Button>

      {/* Header Requisition Card */}
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF', mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'flex-start' }, gap: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.03em', color: '#09090B' }}>
                {job.title}
              </Typography>
              <Chip
                label={isActive ? 'Active Requisition' : 'Archived'}
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  bgcolor: isActive ? '#09090B' : '#F4F4F5',
                  color: isActive ? '#FAFAFA' : '#71717A',
                  borderRadius: 1,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap', color: '#71717A', fontSize: '0.875rem', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <BusinessCenterOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">{job.department}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#D4D4D8' }}>•</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">{job.location}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#D4D4D8' }}>•</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <PersonOutlineIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">Hiring Lead: {job.hiringLead}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {job.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: '#FAFAFA',
                    border: '1px solid #E4E4E7',
                    color: '#52525B',
                    fontSize: '0.725rem',
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Action Toolbar */}
          <Box sx={{ display: 'flex', gap: 1.5, alignSelf: { xs: 'flex-start', md: 'center' } }}>
            <Button
              variant="outlined"
              onClick={() => toggleJobStatus(job.id)}
              startIcon={isActive ? <ArchiveIcon sx={{ fontSize: 16 }} /> : <UnarchiveIcon sx={{ fontSize: 16 }} />}
              sx={{ color: '#09090B', borderColor: '#E4E4E7', borderRadius: 1.5 }}
            >
              {isActive ? 'Archive Requisition' : 'Activate Requisition'}
            </Button>
            <Button
              component={Link}
              to="/candidates"
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              sx={{ borderRadius: 1.5 }}
            >
              View Candidate Directory
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Grid: Description & Pipeline Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Left Column: Scope & Associated Candidates */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" fontWeight={700} color="#09090B" gutterBottom>
              Role Specification & Scope
            </Typography>
            <Typography variant="body1" color="#3F3F46" sx={{ lineHeight: 1.7, mb: 3 }}>
              {job.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" fontWeight={600} color="#09090B" gutterBottom>
              Core Responsibilities
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, m: 0, color: '#52525B', fontSize: '0.9rem', lineHeight: 1.8 }}>
              <li>Lead key architectural decisions and collaborate with cross-functional leads.</li>
              <li>Maintain high engineering standards through structured evaluations and design reviews.</li>
              <li>Champion accessibility, zero-downtime releases, and low-latency operational efficiency.</li>
            </Box>
          </Paper>

          {/* Candidates mapped to this role */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={700} color="#09090B">
                Candidates in Pipeline ({jobCandidates.length})
              </Typography>
              <Button component={Link} to="/candidates" size="small" sx={{ color: '#09090B', fontWeight: 600 }}>
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {jobCandidates.length === 0 ? (
              <Typography variant="body2" color="#71717A" sx={{ py: 2, textAlign: 'center' }}>
                No candidates currently mapped to this requisition.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {jobCandidates.map((c) => (
                  <Paper
                    key={c.id}
                    elevation={0}
                    component={Link}
                    to={`/candidates/${c.id}`}
                    sx={{
                      p: 2,
                      borderRadius: 1.5,
                      border: '1px solid #E4E4E7',
                      bgcolor: '#FAFAFA',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: '#FFFFFF',
                        borderColor: '#A1A1AA',
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} color="#09090B">
                        {c.name}
                      </Typography>
                      <Typography variant="caption" color="#71717A">
                        {c.email} • Rating: {c.rating} / 5.0
                      </Typography>
                    </Box>
                    <Chip
                      label={c.stage}
                      size="small"
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        bgcolor: '#09090B',
                        color: '#FAFAFA',
                        borderRadius: 1,
                      }}
                    />
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Box>

        {/* Right Column: Live Pipeline Velocity */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #E4E4E7', bgcolor: '#FFFFFF', height: 'fit-content' }}>
          <Typography variant="h6" fontWeight={700} color="#09090B" gutterBottom>
            Stage Distribution
          </Typography>
          <Typography variant="body2" color="#71717A" sx={{ mb: 3 }}>
            Real-time applicant progression through candidate evaluation gates.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { stage: 'Applied', count: pipeline.applied, color: '#D4D4D8' },
              { stage: 'Screen', count: pipeline.screen, color: '#A1A1AA' },
              { stage: 'Interview', count: pipeline.interview, color: '#71717A' },
              { stage: 'Offer', count: pipeline.offer, color: '#27272A' },
              { stage: 'Hired', count: pipeline.hired, color: '#09090B' },
            ].map((st) => (
              <Box key={st.stage}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" fontWeight={600} color="#09090B">
                    {st.stage}
                  </Typography>
                  <Typography variant="caption" fontWeight={700} color="#09090B">
                    {st.count}
                  </Typography>
                </Box>
                <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#F4F4F5', overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${Math.min(100, Math.max(8, (st.count / (job.applicantsCount || 1)) * 100))}%`,
                      bgcolor: st.color,
                      borderRadius: 3,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
