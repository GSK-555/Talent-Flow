import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Divider,
    Paper,
    useTheme,
    IconButton,
    alpha, // Import alpha for translucent colors
} from '@mui/material'
import { Archive as ArchiveIcon, Unarchive as UnarchiveIcon, Launch as LaunchIcon, Add as AddIcon, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material' 

// --- JobItem Component (Enhanced with Subtle Hover Fix) ---
function JobItem({ job, onArchive }) {
    const theme = useTheme()

    // Determine colors based on status, using the theme palette
    const isActive = job.status === 'active'
    const statusColor = isActive ? theme.palette.success.main : theme.palette.warning.main

    return (
        <Paper 
            elevation={2} 
            sx={{ 
                mb: 2, 
                borderRadius: 2, 
                overflow: 'hidden', 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                    boxShadow: theme.shadows[6], 
                    transform: 'translateY(-2px)',
                    // FIX: Use primary light color with a very low opacity for a subtle, non-obstructive highlight
                    backgroundColor: alpha(theme.palette.primary.light, 0.1), 
                }, 
                borderLeft: `6px solid ${statusColor}`,
            }}
        >
            <ListItem
                secondaryAction={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pr: 2 }}>
                        {/* Archive/Unarchive Button */}
                        <IconButton
                            size="medium"
                            onClick={(e) => { e.stopPropagation(); onArchive(job); }} 
                            aria-label={isActive ? 'archive job' : 'unarchive job'}
                            sx={{ color: isActive ? theme.palette.warning.dark : theme.palette.success.dark }}
                            title={isActive ? 'Archive Job' : 'Unarchive Job'}
                        >
                            {isActive ? <ArchiveIcon /> : <UnarchiveIcon />}
                        </IconButton>
                        
                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                        {/* Details Button */}
                        <IconButton
                            size="medium"
                            component={Link}
                            to={`/jobs/${job.id}`}
                            aria-label="view job details"
                            color="primary"
                            title="View Details"
                        >
                            <LaunchIcon />
                        </IconButton>
                    </Box>
                }
                alignItems="flex-start"
                disablePadding
                sx={{ p: 2, pr: 14 }}
            >
                <ListItemText
                    primary={
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5 }}>
                            {job.title}
                        </Typography>
                    }
                    secondary={
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {/* Status Chip */}
                            <Chip
                                label={isActive ? 'Active Listing' : 'Archived'}
                                size="medium"
                                sx={{
                                    backgroundColor: statusColor,
                                    color: theme.palette.common.white,
                                    fontWeight: 'bold',
                                    borderRadius: '6px',
                                    textTransform: 'uppercase',
                                    userSelect: 'none',
                                }}
                            />
                            
                            {/* Tag Chips */}
                            {job.tags?.length ? (
                                job.tags.map((t) => (
                                    <Chip
                                        key={t}
                                        label={t}
                                        size="medium"
                                        variant="outlined"
                                        sx={{
                                            borderColor: theme.palette.info.light,
                                            color: theme.palette.info.dark,
                                            fontWeight: 600,
                                            borderRadius: '6px',
                                            textTransform: 'capitalize',
                                            userSelect: 'none',
                                        }}
                                    />
                                ))
                            ) : null}
                        </Box>
                    }
                />
            </ListItem>
        </Paper>
    )
}

// --- Jobs Component (Full Code) ---
export default function Jobs() {
    // Mock data and state management for a runnable example
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Senior Frontend Developer', status: 'active', tags: ['react', 'typescript', 'remote'] },
        { id: 2, title: 'Lead Data Scientist', status: 'active', tags: ['python', 'ml', 'ai'] },
        { id: 3, title: 'UX/UI Designer', status: 'archived', tags: ['figma', 'sketch'] },
        { id: 4, title: 'Junior Backend Engineer', status: 'active', tags: ['node', 'express'] },
        { id: 5, title: 'DevOps Specialist', status: 'active', tags: ['aws', 'kubernetes', 'ci/cd'] },
        { id: 6, title: 'Technical Writer', status: 'active', tags: ['documentation', 'markdown'] },
        { id: 7, title: 'Product Manager', status: 'archived', tags: ['agile', 'scrum'] },
    ])
    const [search, setSearch] = useState('')
    const [page] = useState(1) 
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({ title: '', slug: '', tags: '' })
    const theme = useTheme()

    // Mock API implementations/logic
    const fetchJobs = () => {
        const filtered = jobs.filter(job => 
            job.title.toLowerCase().includes(search.toLowerCase()) || 
            job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        );
        return filtered; 
    }

    useEffect(() => {
        // In a real app, this would trigger the actual API call
        console.log(`Simulating API call for search: ${search}, page: ${page}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page])

    const handleCreate = () => {
        if (!form.title.trim()) {
            alert('Job Title is required.')
            return
        }

        const newJob = {
            id: Date.now(), // Unique ID
            title: form.title.trim(),
            slug: (form.slug || form.title).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            tags: form.tags
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            status: 'active',
        }
        
        setJobs(prevJobs => [newJob, ...prevJobs])
        setOpen(false)
        setForm({ title: '', slug: '', tags: '' })
    }

    const toggleArchive = (jobToToggle) => {
        const newStatus = jobToToggle.status === 'active' ? 'archived' : 'active'
        
        setJobs(prevJobs => prevJobs.map(job => 
            job.id === jobToToggle.id ? { ...job, status: newStatus } : job
        ))
    }

    const displayedJobs = fetchJobs();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.grey[50], p: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 4, color: theme.palette.primary.main }}>
                    Job Management
                </Typography>

                {/* Search and Create Card */}
                <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: theme.shadows[8] }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
                        Manage Listings
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                        <TextField
                            label="Search Job Title or Tag"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ flexGrow: 1 }}
                            InputProps={{
                                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                            }}
                        />
                        <Button 
                            variant="contained" 
                            onClick={() => setOpen(true)} 
                            startIcon={<AddIcon />} 
                            size="large"
                            sx={{ minWidth: { xs: '100%', sm: 180 }, height: '56px', fontWeight: 700, borderRadius: 2 }} 
                        >
                            Create Job
                        </Button>
                    </Box>
                </Paper>

                {/* Job List Card */}
                <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: theme.palette.common.white }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700, borderLeft: `4px solid ${theme.palette.primary.main}`, pl: 2 }}>
                        Current Listings ({displayedJobs.length})
                    </Typography>
                    
                    <Divider sx={{ mb: 3 }} />

                    <List disablePadding>
                        {displayedJobs.length > 0 ? (
                            displayedJobs.map((j) => <JobItem key={j.id} job={j} onArchive={toggleArchive} />)
                        ) : (
                            <Box sx={{ p: 4, textAlign: 'center' }}>
                                <Typography color="text.secondary" variant="subtitle1" sx={{ fontStyle: 'italic' }}>
                                    🔍 No jobs found matching your search or filters.
                                </Typography>
                            </Box>
                        )}
                    </List>
                </Paper>
                
                {/* --- Create Job Dialog --- */}
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: theme.palette.primary.main, color: 'white' }}>
                        <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
                            Create New Job Posting
                        </Typography>
                        <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers sx={{ pt: 3 }}>
                        <TextField
                            label="Job Title"
                            fullWidth
                            variant="outlined"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            label="Slug (URL Path)"
                            fullWidth
                            variant="outlined"
                            helperText="Auto-generated if left blank. e.g., 'senior-frontend-developer'"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            label="Tags"
                            fullWidth
                            variant="outlined"
                            helperText="Comma separated list (e.g., react, javascript, remote)"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            sx={{ mb: 1 }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpen(false)} color="inherit" variant="outlined">
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleCreate} 
                            disabled={!form.title.trim()}
                            startIcon={<AddIcon />}
                        >
                            Create Job
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}