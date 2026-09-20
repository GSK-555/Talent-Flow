import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material'
import {
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  WorkOutline as WorkIcon,
  PeopleOutline as PeopleIcon,
  LocationOnOutlined as LocationIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import { useTalent } from '../context/TalentContext'

function JobCard({ job, onToggleStatus }) {
  const isActive = job.status === 'active'
  const pipeline = job.pipeline || { applied: 0, screen: 0, interview: 0, offer: 0, hired: 0 }
  const totalInPipeline = Object.values(pipeline).reduce((a, b) => a + b, 0) || 1

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 2.5,
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': {
          borderColor: '#C7D2FE',
          boxShadow: '0 6px 20px rgba(79, 70, 229, 0.06)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {/* Header row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.75 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' }}>
              {job.title}
            </Typography>
            <Chip
              label={isActive ? 'Active Requisition' : 'Archived'}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 600,
                bgcolor: isActive ? '#EEF2FF' : '#F1F5F9',
                color: isActive ? '#4F46E5' : '#64748B',
                border: '1px solid',
                borderColor: isActive ? '#C7D2FE' : '#E2E8F0',
                borderRadius: 1,
              }}
            />
            <Chip
              label={job.department}
              size="small"
              variant="outlined"
              sx={{ height: 22, fontSize: '0.7rem', color: '#6366F1', borderColor: '#E0E7FF', bgcolor: '#F5F3FF', borderRadius: 1, fontWeight: 500 }}
            />
          </Box>

          {/* Subtitle / Details */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1.5, color: '#64748B', fontSize: '0.8rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationIcon sx={{ fontSize: 14, color: '#6366F1' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>{job.location}</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#CBD5E1' }}>•</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleIcon sx={{ fontSize: 14, color: '#10B981' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>{job.applicantsCount} candidates in pipeline</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#CBD5E1' }}>•</Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>Hiring Lead: <b>{job.hiringLead}</b></Typography>
          </Box>

          {/* Pipeline Stage Bar */}
          <Box sx={{ mb: 1.75, maxWidth: 520 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pipeline Distribution
              </Typography>
              <Typography variant="caption" sx={{ color: '#4F46E5', fontWeight: 600, fontSize: '0.7rem' }}>
                {(pipeline.interview || 0) + (pipeline.offer || 0) + (pipeline.hired || 0)} in Final Stages
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', height: 7, borderRadius: 3.5, overflow: 'hidden', bgcolor: '#F1F5F9', gap: 0.5 }}>
              <Box sx={{ width: `${(pipeline.applied / totalInPipeline) * 100}%`, bgcolor: '#94A3B8' }} title={`Applied: ${pipeline.applied}`} />
              <Box sx={{ width: `${(pipeline.screen / totalInPipeline) * 100}%`, bgcolor: '#38BDF8' }} title={`Screen: ${pipeline.screen}`} />
              <Box sx={{ width: `${(pipeline.interview / totalInPipeline) * 100}%`, bgcolor: '#818CF8' }} title={`Interview: ${pipeline.interview}`} />
              <Box sx={{ width: `${(pipeline.offer / totalInPipeline) * 100}%`, bgcolor: '#F59E0B' }} title={`Offer: ${pipeline.offer}`} />
              <Box sx={{ width: `${(pipeline.hired / totalInPipeline) * 100}%`, bgcolor: '#10B981' }} title={`Hired: ${pipeline.hired}`} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#64748B' }}>Screen: <b style={{ color: '#0284C7' }}>{pipeline.screen}</b></Typography>
              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#64748B' }}>Interview: <b style={{ color: '#4F46E5' }}>{pipeline.interview}</b></Typography>
              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#64748B' }}>Offer: <b style={{ color: '#D97706' }}>{pipeline.offer}</b></Typography>
              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>Hired: <b>{pipeline.hired}</b></Typography>
            </Box>
          </Box>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {job.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, alignSelf: { xs: 'flex-start', md: 'center' }, mt: { xs: 1, md: 0 } }}>
          <Tooltip title={isActive ? 'Archive Requisition' : 'Activate Requisition'}>
            <IconButton
              onClick={() => onToggleStatus(job.id)}
              size="small"
              sx={{
                border: '1px solid #E2E8F0',
                borderRadius: 1.5,
                color: '#64748B',
                '&:hover': {
                  bgcolor: '#F8FAFC',
                  color: '#0F172A',
                  borderColor: '#CBD5E1',
                },
              }}
            >
              {isActive ? <ArchiveIcon sx={{ fontSize: 17 }} /> : <UnarchiveIcon sx={{ fontSize: 17 }} />}
            </IconButton>
          </Tooltip>

          <Button
            component={Link}
            to={`/jobs/${job.id}`}
            variant="contained"
            size="small"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}
            sx={{
              px: 2,
              py: 0.75,
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: 1.5,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
            }}
          >
            Manage Requisition
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default function Jobs() {
  const { jobs, toggleJobStatus, createJob } = useTalent()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'archived'
  const [createOpen, setCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDept, setNewDept] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newTags, setNewTags] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.department.toLowerCase().includes(search.toLowerCase()) ||
        j.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchStatus =
        filter === 'all' ? true : filter === 'active' ? j.status === 'active' : j.status === 'archived'
      return matchSearch && matchStatus
    })
  }, [jobs, search, filter])

  const stats = useMemo(() => {
    const total = jobs.length
    const active = jobs.filter((j) => j.status === 'active').length
    const totalApplicants = jobs.reduce((acc, curr) => acc + (curr.applicantsCount || 0), 0)
    const inFinalRound = jobs.reduce((acc, curr) => {
      const p = curr.pipeline || {}
      return acc + (p.interview || 0) + (p.offer || 0)
    }, 0)
    return { total, active, totalApplicants, inFinalRound }
  }, [jobs])

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const tagList = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    createJob({
      title: newTitle.trim(),
      department: newDept.trim() || 'General Engineering',
      location: newLocation.trim() || 'Remote',
      type: 'Full-time',
      status: 'active',
      description: newDescription.trim() || 'Exciting opportunity to join the team and build high-impact platforms.',
      tags: tagList.length > 0 ? tagList : ['Full-stack', 'Product'],
      hiringLead: 'Talent Lead',
    })

    setNewTitle('')
    setNewDept('')
    setNewLocation('')
    setNewTags('')
    setNewDescription('')
    setCreateOpen(false)
  }

  return (
    <Container maxWidth="xl">
      {/* Metric Cards Row with subtle colored accents */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3.5 }}>
        {[
          { label: 'Active Requisitions', value: stats.active, subtext: `${stats.total} total postings`, badge: '+2 new', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE' },
          { label: 'Active Candidates', value: stats.totalApplicants, subtext: 'Distributed across pipeline', badge: '+18% velocity', color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
          { label: 'In Final Rounds', value: stats.inFinalRound, subtext: 'Interview & Offer stages', badge: 'High Priority', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
          { label: 'Avg Time to Fill', value: '18d', subtext: '4d faster than target', badge: 'Optimal', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
        ].map((m, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {m.label}
              </Typography>
              <Chip
                label={m.badge}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.675rem',
                  fontWeight: 600,
                  bgcolor: m.bg,
                  color: m.color,
                  border: `1px solid ${m.border}`,
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, letterSpacing: '-0.03em' }}>
              {m.value}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
              {m.subtext}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Main Header & Controls */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.025em', color: '#0F172A' }}>
            Open Requisitions
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Manage engineering and design roles, monitor candidate velocity, and toggle requisition states.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Filter Pills */}
          <Box sx={{ display: 'flex', p: 0.5, bgcolor: '#F1F5F9', borderRadius: 2 }}>
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'active', label: 'Active' },
              { id: 'archived', label: 'Archived' },
            ].map((tab) => (
              <Button
                key={tab.id}
                size="small"
                onClick={() => setFilter(tab.id)}
                sx={{
                  px: 1.75,
                  py: 0.4,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  color: filter === tab.id ? '#4F46E5' : '#64748B',
                  bgcolor: filter === tab.id ? '#FFFFFF' : 'transparent',
                  boxShadow: filter === tab.id ? '0 1px 4px rgba(0, 0, 0, 0.08)' : 'none',
                  '&:hover': {
                    bgcolor: filter === tab.id ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  },
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>

          {/* Search Box */}
          <TextField
            size="small"
            placeholder="Search roles, tags, departments..."
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

          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            onClick={() => setCreateOpen(true)}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '0.85rem',
              px: 2.25,
              py: 0.85,
              background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)',
              },
            }}
          >
            Create Job
          </Button>
        </Box>
      </Box>

      {/* Requisition Cards List */}
      {filteredJobs.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 2.5, border: '1px dashed #CBD5E1', bgcolor: '#FFFFFF' }}>
          <WorkIcon sx={{ fontSize: 40, color: '#94A3B8', mb: 1 }} />
          <Typography variant="h6" fontWeight={600} color="#0F172A">
            No matching requisitions
          </Typography>
          <Typography variant="body2" color="#64748B" sx={{ mt: 0.5 }}>
            Try adjusting your search criteria or switch status filters.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onToggleStatus={toggleJobStatus} />
          ))}
        </Box>
      )}

      {/* Create Job Modal Dialog */}
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2.5,
            p: 1,
            border: '1px solid #E2E8F0',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" fontWeight={700} color="#0F172A">
            New Job Requisition
          </Typography>
          <IconButton size="small" onClick={() => setCreateOpen(false)}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleCreateSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Role Title"
              placeholder="e.g. Senior Backend Engineer"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              fullWidth
              required
              size="small"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Department"
                placeholder="e.g. Infrastructure"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                size="small"
              />
              <TextField
                label="Location"
                placeholder="e.g. Remote / New York"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                size="small"
              />
            </Box>
            <TextField
              label="Tags (comma separated)"
              placeholder="Golang, Distributed Systems, Kafka"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              size="small"
            />
            <TextField
              label="Role Description & Scope"
              placeholder="Describe candidate expectations, responsibilities, and team charter..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              multiline
              rows={3}
              size="small"
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
            <Button onClick={() => setCreateOpen(false)} variant="outlined" sx={{ color: '#64748B', borderColor: '#E2E8F0' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!newTitle.trim()}
              sx={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
              }}
            >
              Publish Requisition
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}
