import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react' // <--- 1. Import useRef
import { FixedSizeList as List } from 'react-window'
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
    useTheme,
    useMediaQuery,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    alpha,
} from '@mui/material'
import {
    Refresh as RefreshIcon,
    Search as SearchIcon,
    Description as DescriptionIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material'

// --- CONSTANT: Define the Master Hiring Stages ---
const HIRING_STAGES = [
    'Applied',
    'Screen',
    'Interview',
    'Technical Assessment',
    'Offer',
    'Hired',
]

// ----------------------------------------------------------------------
// --- Stage Progress Component (Styling Enhanced) ---
// ----------------------------------------------------------------------
function StageProgress({ currentStage, isRejected }) {
    const theme = useTheme()
    
    const currentStageIndex = HIRING_STAGES.indexOf(currentStage)
    
    const stages = isRejected ? 
        HIRING_STAGES.slice(0, currentStageIndex + 1).concat('Rejected') : 
        HIRING_STAGES;
        
    let activeStep = isRejected ? stages.length - 1 : currentStageIndex;
    
    // Enhanced Custom Step Connector
    const CustomConnector = (props) => (
        <StepConnector
            {...props}
            sx={{
                '& .MuiStepConnector-line': {
                    // Use a thicker, more visible line
                    borderLeft: `4px solid ${props.completed ? theme.palette.success.main : theme.palette.grey[300]}`,
                    minHeight: '40px',
                    ml: 1.25, 
                },
            }}
        />
    );

    return (
        <Paper 
            elevation={6} // Stronger shadow for distinction
            sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 3, 
                height: '100%',
                boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.1)}` // Subtle, modern box shadow
            }}
        >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: theme.palette.primary.dark }}>
                Hiring Progress Status
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical" connector={<CustomConnector />}>
                {stages.map((label, index) => {
                    const isCompletedConnector = index < currentStageIndex;
                    const isActive = index === activeStep;
                    const isFuture = index > activeStep; 
                    const isFinalRejected = isRejected && index === activeStep;
                    
                    return (
                        <Step key={label} completed={isCompletedConnector} active={isActive}>
                            <StepLabel
                                StepIconComponent={() => (
                                    <Box sx={{ 
                                        width: 28, // Slightly larger icon
                                        height: 28, 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        
                                        // BG Color
                                        bgcolor: isFinalRejected 
                                            ? theme.palette.error.main 
                                            : isCompletedConnector && !isFuture 
                                                ? theme.palette.success.main 
                                                : isActive 
                                                    ? theme.palette.primary.main // Active is primary color
                                                    : theme.palette.grey[400], // Future is lighter grey
                                        color: 'white', 
                                        boxShadow: isActive ? theme.shadows[4] : theme.shadows[1], // Stronger shadow on active step
                                    }}>
                                        {isFinalRejected ? (
                                            <CancelIcon sx={{ fontSize: 16 }} />
                                        ) : (isCompletedConnector && !isFuture) ? (
                                            <CheckCircleIcon sx={{ fontSize: 16 }} />
                                        ) : (
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'white' }}>
                                                {index + 1}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            >
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: isActive ? 800 : 600, // Bolder active text
                                        color: isActive ? theme.palette.primary.dark : isCompletedConnector && !isFuture ? theme.palette.success.dark : theme.palette.text.primary,
                                    }}
                                >
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Paper>
    );
}

// ----------------------------------------------------------------------
// --- Candidate Row Component (Styling Enhanced) ---
// ----------------------------------------------------------------------
const CandidateRow = React.memo(({ index, style, filteredItems, selectedId, setSelectedId, getStageColor }) => {
    const it = filteredItems[index]
    const isSelected = selectedId === it.id
    const theme = useTheme()

    return (
        <div style={{ ...style, padding: '4px 16px' }}>
            <Paper
                elevation={isSelected ? 6 : 1}
                onClick={() => setSelectedId(it.id)}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    // Use a subtle border and background color change
                    border: isSelected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                    borderLeft: `6px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`,
                    '&:hover': {
                        backgroundColor: isSelected ? alpha(theme.palette.primary.light, 0.7) : theme.palette.action.hover,
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                    },
                    backgroundColor: isSelected ? alpha(theme.palette.primary.light, 0.5) : theme.palette.background.paper,
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isSelected ? theme.palette.primary.dark : theme.palette.text.primary }}>
                    {it.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                        {it.email}
                    </Typography>
                    <Chip
                        label={it.stage || 'Unassigned'}
                        size="small"
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            backgroundColor: getStageColor(it.stage),
                            color: theme.palette.common.white,
                        }}
                    />
                </Box>
            </Paper>
        </div>
    )
})

// ----------------------------------------------------------------------
// --- Main Candidates Component (Data Fixed) ---
// ----------------------------------------------------------------------
export default function Candidates() {
    const [allItems, setAllItems] = useState([])
    const [search, setSearch] = useState('')
    const [stage, setStage] = useState([])
    const [stats, setStats] = useState({ total: 0, byStage: {} })
    const [stageOptions, setStageOptions] = useState([])
    const [loading, setLoading] = useState(false)

    const [selectedId, setSelectedId] = useState(null)
    const [cand, setCand] = useState(null)
    
    // 2. Initialize the ref for the list's parent container
    const listParentRef = useRef(null); 
    const [listHeight, setListHeight] = useState(300); // Initialize with a safe value
    
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const getStageColor = useCallback((stageName) => {
        switch (stageName?.toLowerCase()) {
            case 'offer': return theme.palette.success.main
            case 'interview': return theme.palette.warning.dark
            case 'rejected': return theme.palette.error.main
            case 'screen': return theme.palette.info.main
            default: return theme.palette.grey[600]
        }
    }, [theme])

    const fetchData = async () => {
        setLoading(true)
        try {
            // --- FIX: Increased the number of mock candidates for scrolling ---
            const mockData = {
                items: [
                    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', stage: 'Interview', source: 'LinkedIn', appliedDate: new Date(Date.now() - 86400000 * 10), lastAction: new Date(Date.now() - 86400000 * 3), position: 'UX Designer' },
                    { id: 2, name: 'Bob Smith', email: 'bob.s@example.com', stage: 'Offer', source: 'Referral', appliedDate: new Date(Date.now() - 86400000 * 5), lastAction: new Date(Date.now()), position: 'Frontend Dev' },
                    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', stage: 'Rejected', source: 'Indeed', appliedDate: new Date(Date.now() - 86400000 * 20), lastAction: new Date(Date.now() - 86400000 * 15), position: 'Data Scientist' },
                    { id: 4, name: 'Dana Scully', email: 'dana.s@example.com', stage: 'Technical Assessment', source: 'Website', appliedDate: new Date(Date.now() - 86400000 * 15), lastAction: new Date(Date.now() - 86400000 * 10), position: 'Backend Engineer' },
                    { id: 5, name: 'Fox Mulder', email: 'fox.m@example.com', stage: 'Screen', source: 'Referral', appliedDate: new Date(Date.now() - 86400000 * 2), lastAction: new Date(Date.now() - 86400000 * 1), position: 'QA Tester' },
                    { id: 6, name: 'Eve Harrington', email: 'eve.h@example.com', stage: 'Applied', source: 'LinkedIn', appliedDate: new Date(Date.now() - 86400000 * 1), lastAction: new Date(Date.now()), position: 'Product Manager' },
                    { id: 7, name: 'Grace Hopper', email: 'grace.h@example.com', stage: 'Hired', source: 'Referral', appliedDate: new Date(Date.now() - 86400000 * 30), lastAction: new Date(Date.now() - 86400000 * 25), position: 'Lead Engineer' },
                    // Added more mock candidates below
                    { id: 8, name: 'Harry Potter', email: 'harry.p@example.com', stage: 'Interview', source: 'Indeed', appliedDate: new Date(Date.now() - 86400000 * 12), lastAction: new Date(Date.now() - 86400000 * 5), position: 'Magical Dev' },
                    { id: 9, name: 'Hermione Granger', email: 'hermione.g@example.com', stage: 'Technical Assessment', source: 'Website', appliedDate: new Date(Date.now() - 86400000 * 18), lastAction: new Date(Date.now() - 86400000 * 8), position: 'Research Analyst' },
                    { id: 10, name: 'Ron Weasley', email: 'ron.w@example.com', stage: 'Screen', source: 'Referral', appliedDate: new Date(Date.now() - 86400000 * 3), lastAction: new Date(Date.now() - 86400000 * 2), position: 'Junior Dev' },
                    { id: 11, name: 'Leia Organa', email: 'leia.o@example.com', stage: 'Offer', source: 'LinkedIn', appliedDate: new Date(Date.now() - 86400000 * 7), lastAction: new Date(Date.now() - 86400000 * 1), position: 'Project Lead' },
                    { id: 12, name: 'Luke Skywalker', email: 'luke.s@example.com', stage: 'Applied', source: 'Website', appliedDate: new Date(Date.now() - 86400000 * 1), lastAction: new Date(Date.now()), position: 'Trainee' },
                    { id: 13, name: 'Han Solo', email: 'han.s@example.com', stage: 'Rejected', source: 'Indeed', appliedDate: new Date(Date.now() - 86400000 * 25), lastAction: new Date(Date.now() - 86400000 * 20), position: 'Space Captain' },
                    { id: 14, name: 'Chewbacca Wookiee', email: 'chew.w@example.com', stage: 'Hired', source: 'Referral', appliedDate: new Date(Date.now() - 86400000 * 40), lastAction: new Date(Date.now() - 86400000 * 30), position: 'Co-Pilot' },
                    { id: 15, name: 'Poe Dameron', email: 'poe.d@example.com', stage: 'Interview', source: 'LinkedIn', appliedDate: new Date(Date.now() - 86400000 * 9), lastAction: new Date(Date.now() - 86400000 * 4), position: 'Pilot' },
                    { id: 16, name: 'Rey Ridley', email: 'rey.r@example.com', stage: 'Technical Assessment', source: 'Website', appliedDate: new Date(Date.now() - 86400000 * 14), lastAction: new Date(Date.now() - 86400000 * 9), position: 'Engineer' },
                    { id: 17, name: 'Kylo Ren', email: 'kylo.r@example.com', stage: 'Screen', source: 'Referral', appliedDate: new Date(Date.now() - 86400000 * 4), lastAction: new Date(Date.now() - 86400000 * 3), position: 'Manager' },
                    { id: 18, name: 'Yoda Master', email: 'yoda.m@example.com', stage: 'Offer', source: 'Indeed', appliedDate: new Date(Date.now() - 86400000 * 6), lastAction: new Date(Date.now() - 86400000 * 1), position: 'Consultant' },
                    { id: 19, name: 'Mace Windu', email: 'mace.w@example.com', stage: 'Applied', source: 'LinkedIn', appliedDate: new Date(Date.now() - 86400000 * 2), lastAction: new Date(Date.now()), position: 'Director' },
                    { id: 20, name: 'Obi-Wan Kenobi', email: 'obi.w@example.com', stage: 'Interview', source: 'Website', appliedDate: new Date(Date.now() - 86400000 * 11), lastAction: new Date(Date.now() - 86400000 * 4), position: 'Senior Dev' },
                ],
            };
            
            setAllItems(mockData.items);
            
            if (!selectedId && mockData.items.length > 0) {
                setSelectedId(mockData.items[0].id)
            }

            const stages = [...new Set(mockData.items.map(c => c.stage).filter(Boolean))]
            setStageOptions(stages)

        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    // --- The rest of the component logic remains the same ---
    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    // 3. Effect to calculate height when component mounts and on window resize
    const calculateListHeight = useCallback(() => {
        if (listParentRef.current) {
            // Get the bounding box of the parent container
            const parentRect = listParentRef.current.getBoundingClientRect();
            
            // Get the current height of the window's viewport
            const viewportHeight = window.innerHeight;
            
            if (isMobile) {
                // For mobile, the height is fixed to 40vh, but we'll stick to a reasonable pixel fallback
                // For the mobile view where the height is set to '40vh' via CSS, 
                // we'll rely on the existing CSS max-height: '40vh' of the parent Box.
                // The List component inside needs a fixed height, so let's check the ref's actual height.
                const newHeight = listParentRef.current.clientHeight;
                setListHeight(newHeight - 40); // Subtract some padding/margin just in case
            } else {
                // For desktop, calculate the remaining height in the viewport
                // We want the height from the top of the list container to the bottom of the viewport
                const newHeight = viewportHeight - parentRect.top - 16; // 16px for bottom padding/margin
                setListHeight(Math.max(300, newHeight)); // Ensure a minimum height of 300px
            }
        }
    }, [isMobile]);

    useEffect(() => {
        calculateListHeight(); // Calculate on mount

        window.addEventListener('resize', calculateListHeight);
        
        return () => {
            window.removeEventListener('resize', calculateListHeight);
        };
    }, [calculateListHeight]); // Recalculate if isMobile changes or on resize

    useEffect(() => {
        if (selectedId) {
            // Find candidate from local state (mocked data)
            setCand(allItems.find((x) => x.id === selectedId))
        } else {
            setCand(null)
        }
    }, [selectedId, allItems]) 

    const filteredItems = useMemo(() => {
        let filtered = allItems
        if (search.trim()) {
            const searchLower = search.toLowerCase()
            filtered = filtered.filter(
                c => c.name.toLowerCase().includes(searchLower) || c.email.toLowerCase().includes(searchLower)
            )
        }
        if (stage.length > 0) {
            filtered = filtered.filter(c => stage.includes(c.stage))
        }
        
        const byStage = {}
        filtered.forEach(c => {
            if (c.stage) {
                byStage[c.stage] = (byStage[c.stage] || 0) + 1
            }
        })
        setStats({ total: filtered.length, byStage })

        return filtered
    }, [allItems, search, stage])

    const renderRow = useCallback(({ index, style }) => (
        <CandidateRow
            index={index}
            style={style}
            filteredItems={filteredItems}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            getStageColor={getStageColor}
        />
    ), [filteredItems, selectedId, getStageColor])
    
    // REMOVED: const listHeight = window.innerHeight - (isMobile ? 350 : 250)


    // --- Render (UPDATED LIST CONTAINER) ---
    return (
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
            
            {/* --- LEFT PANE (LIST/FILTERS) --- */}
            <Box 
                // 4. Attach the ref to the list's main container Box
                ref={listParentRef} 
                sx={{ 
                    width: isMobile ? '100%' : 380,
                    minWidth: isMobile ? '100%' : 380,
                    bgcolor: theme.palette.background.paper, 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    boxShadow: 8, 
                    overflowY: isMobile ? 'scroll' : 'hidden', // Allow scrolling on the *parent* Box on mobile, but rely on List for desktop scroll
                    maxHeight: isMobile ? '40vh' : '100vh',
                    zIndex: 10,
                    borderRight: `1px solid ${theme.palette.divider}` 
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: theme.palette.primary.main }}>
                    Hiring Dashboard
                </Typography>

                {/* Stats Card */}
                <Paper elevation={4} sx={{ p: 2, mb: 3, background: theme.palette.primary.dark, color: 'white', borderRadius: 2, boxShadow: theme.shadows[6] }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Total Active Candidates</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>{stats.total}</Typography>
                    <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.4)' }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {Object.entries(stats.byStage).map(([stageName, count]) => (
                            <Chip key={stageName} label={`${stageName} (${count})`} size="small" sx={{ textTransform: 'capitalize', bgcolor: alpha(theme.palette.common.white, 0.2), color: 'white', fontWeight: 600 }} />
                        ))}
                    </Box>
                </Paper>

                {/* Filters and Controls */}
                <TextField 
                    label="Search name or email" 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    fullWidth 
                    size="small" 
                    sx={{ mb: 2, flexShrink: 0 }} 
                    InputProps={{ 
                        startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                        sx: { borderRadius: 2 } 
                    }} 
                />

                <FormControl size="small" sx={{ mb: 2, width: '100%', flexShrink: 0 }}>
                    <InputLabel id="stage-select-label">Filter by Stage</InputLabel>
                    <Select
                        labelId="stage-select-label"
                        multiple
                        value={stage}
                        label="Filter by Stage"
                        onChange={e => setStage(e.target.value)}
                        sx={{ borderRadius: 2 }} 
                        renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map(value => (
                                    <Chip 
                                        key={value} 
                                        label={value} 
                                        size="small" 
                                        sx={{ textTransform: 'capitalize', bgcolor: getStageColor(value), color: theme.palette.common.white }} 
                                    />
                                ))}
                            </Box>
                        )}
                    >
                        {stageOptions.map(opt => (
                            <MenuItem key={opt} value={opt} sx={{ textTransform: 'capitalize' }}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button 
                    variant="contained" 
                    onClick={fetchData} 
                    startIcon={<RefreshIcon />} 
                    disabled={loading}
                    sx={{ mb: 3, py: 1, borderRadius: 2, flexShrink: 0 }}
                >
                    {loading ? 'Refreshing...' : 'Refresh Candidate Data'}
                </Button>
                
                <Divider sx={{ mb: 2, flexShrink: 0 }} />
                
                {/* Candidate List (FixedSizeList) */}
                {/* 5. Set flexGrow: 1 so this box takes up all remaining space */}
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}> 
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, ml: 1, fontWeight: 600, flexShrink: 0 }}>
                        Displaying **{filteredItems.length}** of **{allItems.length}** candidates
                    </Typography>
                    <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.grey[200]}`, borderRadius: 2, overflow: 'hidden' }}>
                        {filteredItems.length > 0 ? (
                            <List 
                                // 6. Use the dynamically calculated listHeight
                                height={listHeight} 
                                itemCount={filteredItems.length} 
                                itemSize={100} 
                                width="100%"
                            >
                                {renderRow}
                            </List>
                        ) : (
                            <Box sx={{ p: 4, textAlign: 'center' }}>
                                <Typography color="text.secondary">No candidates found matching filters.</Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Box>

            {/* --- RIGHT PANE: Candidate Details (UNCHANGED) --- */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: theme.palette.grey[50], overflowY: 'auto' }}>
                {!cand && (
                    <Paper sx={{ p: 4, textAlign: 'center', mt: 10, bgcolor: theme.palette.common.white, borderRadius: 2, boxShadow: theme.shadows[3] }}>
                        <SearchIcon sx={{ fontSize: 80, color: theme.palette.grey[300], mb: 2 }} />
                        <Typography variant="h5" color="text.secondary">
                            Select a candidate to view their detailed profile.
                        </Typography>
                    </Paper>
                )}
                {cand && (
                    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}> 
                        
                        {/* Header (Full Width) */}
                        <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: theme.palette.common.white }}>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 0.5 }}>{cand.name}</Typography>
                                <Typography variant="h6" color="text.secondary">{cand.email}</Typography>
                            </Box>
                            <Chip
                                label={cand.stage || 'Unassigned'}
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    height: '45px',
                                    padding: '0 16px',
                                    backgroundColor: getStageColor(cand.stage),
                                    color: theme.palette.common.white,
                                }}
                            />
                        </Paper>
                        
                        {/* Split Content: Stage Progress (Left) and Candidate Info (Right) */}
                        <Box 
                            sx={{ 
                                display: 'grid', 
                                gap: 4,
                                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                alignItems: 'stretch' // Ensure both sides stretch vertically
                            }}
                        >
                            
                            {/* Left Column: Stage Progress Bar */}
                            <Box>
                                <StageProgress 
                                    currentStage={cand.stage} 
                                    isRejected={cand.stage?.toLowerCase() === 'rejected'}
                                />
                            </Box>
                            
                            {/* Right Column: Candidate Information Card */}
                            <Paper 
                                elevation={6} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: 3, 
                                    bgcolor: theme.palette.common.white, 
                                    height: '100%',
                                    boxShadow: `0 8px 30px ${alpha(theme.palette.info.main, 0.1)}` // Subtle contrasting shadow
                                }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                    Candidate Profile Details
                                </Typography>
                                <Divider sx={{ mb: 3, borderColor: theme.palette.grey[300] }} />
                                
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 4 }}>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Position Applied For</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{cand.position || 'Software Engineer'}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Source</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{cand.source || 'Referral'}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Applied Date</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{new Date(cand.appliedDate || new Date()).toLocaleDateString()}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Last Action</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{new Date(cand.lastAction || new Date()).toLocaleDateString()}</Typography>
                                    </Box>
                                </Box>
                                
                                <Button variant="contained" startIcon={<DescriptionIcon />} fullWidth size="large" sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}>
                                    View Full Resume
                                </Button>
                            </Paper>
                            
                        </Box>
                        
                    </Box>
                )}
            </Box>
        </Box>
    )
}