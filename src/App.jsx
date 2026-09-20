import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'

import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Candidates from './pages/Candidates'
import CandidateDetail from './pages/CandidateDetail'
import Assessments from './pages/Assessments'

import { 
  Box, 
  Container, 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Chip,
} from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'

import { TalentProvider } from './context/TalentContext'

export default function App() {
  const location = useLocation()

  const navLinks = [
    { label: 'Jobs', path: '/', icon: <WorkOutlineIcon sx={{ fontSize: 17 }} /> },
    { label: 'Candidates', path: '/candidates', icon: <PeopleOutlineIcon sx={{ fontSize: 17 }} /> },
    { label: 'Assessments', path: '/assessments', icon: <AssignmentOutlinedIcon sx={{ fontSize: 17 }} /> },
  ]

  const isCurrent = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname.startsWith('/jobs')
    return location.pathname.startsWith(path)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TalentProvider>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
          {/* Sleek Modern Navbar */}
          <AppBar 
            position="sticky" 
            elevation={0}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.94)', 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              zIndex: 1100,
            }}
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters sx={{ minHeight: { xs: 58, md: 62 }, gap: 3 }}>
                {/* Brand Logo */}
                <Box 
                  component={Link} 
                  to="/" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.25, 
                    textDecoration: 'none', 
                    color: 'inherit',
                    mr: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                    }}
                  >
                    <LayersIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.025em', color: '#0F172A' }}>
                    TalentFlow
                  </Typography>
                </Box>

                {/* Navigation Items */}
                <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
                  {navLinks.map((item) => {
                    const active = isCurrent(item.path)
                    return (
                      <Button
                        key={item.path}
                        component={Link}
                        to={item.path}
                        startIcon={item.icon}
                        sx={{
                          px: 1.75,
                          py: 0.75,
                          borderRadius: 1.5,
                          fontSize: '0.875rem',
                          fontWeight: active ? 600 : 500,
                          color: active ? '#4F46E5' : '#64748B',
                          bgcolor: active ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                          '&:hover': {
                            bgcolor: active ? 'rgba(79, 70, 229, 0.12)' : 'rgba(241, 245, 249, 0.8)',
                            color: active ? '#4F46E5' : '#0F172A',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    )
                  })}
                </Box>

                {/* Modern Status Indicator */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#ECFDF5', px: 1.5, py: 0.5, borderRadius: 10, border: '1px solid #A7F3D0' }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#10B981' }} />
                  <Typography variant="caption" sx={{ color: '#065F46', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.02em' }}>
                    System Live
                  </Typography>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          {/* Content Area */}
          <Box component="main" sx={{ flexGrow: 1, py: { xs: 3, md: 4 } }}>
            <Routes>
              <Route path="/" element={<Jobs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/candidates/:id" element={<CandidateDetail />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="*" element={
                <Container sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>Page Not Found</Typography>
                  <Button component={Link} to="/" variant="contained">Return Home</Button>
                </Container>
              } />
            </Routes>
          </Box>
        </Box>
      </TalentProvider>
    </ThemeProvider>
  )
}
