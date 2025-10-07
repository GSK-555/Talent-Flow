import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Candidates from './pages/Candidates';
import CandidateDetail from './pages/CandidateDetail';
import Assessments from './pages/Assessments';

import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material';

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TalentFlow
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Jobs
          </Button>
          <Button color="inherit" component={Link} to="/candidates">
            Candidates
          </Button>
          <Button color="inherit" component={Link} to="/assessments">
            Assessments
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Container>
    </>
  );
}
