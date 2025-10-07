import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { 
    Box, 
    Typography, 
    Chip, 
    Paper, 
    Divider, 
    useTheme, 
    alpha,
} from '@mui/material'

// --- Mock Data Function for Job Detail ---
const mockFetchJobDetail = (id) => {
    const mockJobs = [
        { 
            id: '1', 
            title: 'Senior Frontend Developer', 
            status: 'active', 
            slug: 'senior-frontend-developer', 
            tags: ['react', 'typescript', 'remote', 'senior'],
            description: "We are seeking a seasoned frontend developer to lead our primary customer-facing application. Must have deep expertise in **React and state management** (Redux/MobX). This role involves mentorship and ensuring high performance across all modern browsers. Fully remote position with flexible hours.",
            department: 'Engineering',
            hiringManager: 'Alice Johnson',
            postedDate: new Date(Date.now() - 86400000 * 15),
            applicants: 42,
        },
        { 
            id: '2', 
            title: 'Lead Data Scientist', 
            status: 'active', 
            slug: 'lead-data-scientist', 
            tags: ['python', 'ml', 'ai', 'leader', 'tensorflow'],
            description: "The Data Science team needs a leader to design and implement **machine learning models** (Deep Learning, NLP) to optimize our core business metrics. You will be responsible for the entire model lifecycle, from research and experimentation using **Python/TensorFlow** to production deployment.",
            department: 'Data & Analytics',
            hiringManager: 'Bob Smith',
            postedDate: new Date(Date.now() - 86400000 * 30),
            applicants: 15,
        },
        { 
            id: '3', 
            title: 'UX/UI Designer', 
            status: 'archived', 
            slug: 'ux-ui-designer', 
            tags: ['figma', 'sketch', 'design', 'user-research'],
            description: "This position focused on translating complex requirements into simple, beautiful user interfaces. Responsibilities included **conducting user research**, creating **Figma/Sketch prototypes**, and maintaining our design system. This listing is currently **Archived**.",
            department: 'Product',
            hiringManager: 'Charlie Brown',
            postedDate: new Date(Date.now() - 86400000 * 60),
            applicants: 0,
        },
        { 
            id: '4', 
            title: 'Junior Backend Engineer', 
            status: 'active', 
            slug: 'junior-backend-engineer', 
            tags: ['node', 'express', 'sql', 'entry-level', 'rest-api'],
            description: "An excellent **entry-level** opportunity to join our team, focusing on building and maintaining scalable backend services in **Node.js/Express**. You will work with both **SQL** and NoSQL databases, implementing robust **RESTful APIs** under senior guidance.",
            department: 'Engineering',
            hiringManager: 'Alice Johnson',
            postedDate: new Date(Date.now() - 86400000 * 5),
            applicants: 68,
        },
        { 
            id: '5', 
            title: 'DevOps Specialist', 
            status: 'active', 
            slug: 'devops-specialist', 
            tags: ['aws', 'kubernetes', 'ci/cd', 'terraform', 'docker'],
            description: "Seeking an expert to manage and automate our cloud infrastructure on **AWS**. Key responsibilities include designing and maintaining **CI/CD pipelines** (Jenkins/GitLab), managing **Kubernetes** clusters, and implementing Infrastructure as Code using **Terraform**.",
            department: 'Operations',
            hiringManager: 'Dana Scully',
            postedDate: new Date(Date.now() - 86400000 * 20),
            applicants: 31,
        },
        { 
            id: '6', 
            title: 'Technical Writer', 
            status: 'active', 
            slug: 'technical-writer', 
            tags: ['documentation', 'markdown', 'api-docs', 'confluence'],
            description: "Create clear, concise, and user-friendly documentation for our APIs and software products. Must be proficient in **Markdown**, experienced with version control (Git), and able to collaborate with engineering teams to simplify complex technical concepts.",
            department: 'Product',
            hiringManager: 'Fox Mulder',
            postedDate: new Date(Date.now() - 86400000 * 10),
            applicants: 18,
        },
        { 
            id: '7', 
            title: 'Product Manager', 
            status: 'archived', 
            slug: 'product-manager', 
            tags: ['agile', 'scrum', 'roadmap', 'jira'],
            description: "This role focused on defining the product vision, strategy, and **roadmap**. Responsibilities included managing the **Scrum backlog**, prioritizing features, and ensuring alignment between engineering and business goals. This listing is currently **Archived**.",
            department: 'Product',
            hiringManager: 'Eve Harrington',
            postedDate: new Date(Date.now() - 86400000 * 45),
            applicants: 5,
        },
    ];
    // Match ID format (string from useParams)
    return mockJobs.find((x) => String(x.id) === String(id)) || null;
};


export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        // Simulate an asynchronous fetch delay
        const timer = setTimeout(() => {
            const foundJob = mockFetchJobDetail(id);
            setJob(foundJob);
        }, 300); // 300ms delay for a realistic loading feel

        return () => clearTimeout(timer); // Cleanup timer
    }, [id]);

    // Helper to get status colors
    const getStatusColor = useMemo(() => {
        const isActive = job?.status === 'active';
        return {
            main: isActive ? theme.palette.success.main : theme.palette.warning.main,
            text: isActive ? theme.palette.success.dark : theme.palette.warning.dark,
            background: isActive ? alpha(theme.palette.success.light, 0.2) : alpha(theme.palette.warning.light, 0.2),
        };
    }, [job?.status, theme]);


    if (!job) {
        return (
            <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 }, bgcolor: theme.palette.grey[50], minHeight: '100vh' }}>
                <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: 'center', borderRadius: 3 }}>
                    <Typography variant="h5" color="text.secondary">
                        {/* Show a loading state until the timeout is complete */}
                        {job === null ? `Loading job details for ID: ${id}...` : 'Job not found.'}
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 }, bgcolor: theme.palette.grey[50], minHeight: '100vh' }}>
            
            {/* Header Block */}
            <Paper 
                elevation={6} 
                sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: 3, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    bgcolor: theme.palette.common.white,
                    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.15)}`
                }}
            >
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.primary.dark, mb: 1 }}>
                        {job.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        /{job.slug}
                    </Typography>
                </Box>
                
                {/* Status Chip */}
                <Chip
                    label={job.status === 'active' ? 'ACTIVE LISTING' : 'ARCHIVED'}
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        fontSize: '1rem',
                        height: '40px',
                        padding: '0 16px',
                        backgroundColor: getStatusColor.main,
                        color: theme.palette.common.white,
                    }}
                />
            </Paper>

            {/* Main Content: Details and Description */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    borderRadius: 3, 
                    bgcolor: theme.palette.common.white 
                }}
            >
                {/* Key Metrics Grid */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, 
                    gap: 3, 
                    mb: 3, 
                    pb: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    {/* Item: Department */}
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Department</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{job.department || 'N/A'}</Typography>
                    </Box>
                    
                    {/* Item: Hiring Manager */}
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Hiring Manager</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{job.hiringManager || 'Unassigned'}</Typography>
                    </Box>
                    
                    {/* Item: Applicants */}
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Applicants</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>{job.applicants !== undefined ? job.applicants : 'N/A'}</Typography>
                    </Box>

                    {/* Item: Posted Date */}
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Posted Date</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{job.postedDate ? job.postedDate.toLocaleDateString() : 'N/A'}</Typography>
                    </Box>
                </Box>
                
                {/* Tags Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: theme.palette.primary.main }}>
                        Required Skills / Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {job.tags?.map((t) => (
                            <Chip 
                                key={t} 
                                label={t} 
                                size="medium"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    backgroundColor: alpha(theme.palette.info.light, 0.5),
                                    color: theme.palette.info.dark,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />

                {/* Description Section */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
                        Job Description
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: theme.palette.text.primary }}>
                        {job.description || 'No detailed description provided for this job listing.'}
                    </Typography>
                </Box>

            </Paper>
        </Box>
    );
}