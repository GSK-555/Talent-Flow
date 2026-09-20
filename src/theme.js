import { createTheme, alpha } from '@mui/material/styles'

// Modern Tech Indigo & Violet (Stripe / Linear inspired)
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Indigo 600 - Rich, vibrant, modern
      light: '#6366F1', // Indigo 500
      dark: '#4338CA', // Indigo 700
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B5CF6', // Violet 500
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC', // Slate 50 - clean, crisp SaaS background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A', // Slate 900 - clear, high contrast readability
      secondary: '#64748B', // Slate 500 - balanced neutral
    },
    divider: '#E2E8F0', // Slate 200 - crisp elegant borders
    success: {
      main: '#10B981', // Emerald 500
      light: '#ECFDF5',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B', // Amber 500
      light: '#FFFBEB',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444', // Red 500
      light: '#FEF2F2',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6', // Blue 500
      light: '#EFF6FF',
      dark: '#1D4ED8',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.035em' },
    h2: { fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.015em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 500, letterSpacing: '-0.01em' },
    subtitle2: { fontWeight: 500, color: '#64748B' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          transition: 'all 0.15s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.16)',
            transform: 'translateY(-0.5px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#4F46E5',
          '&:hover': {
            backgroundColor: '#4338CA',
          },
        },
        outlinedPrimary: {
          borderColor: '#E2E8F0',
          color: '#4F46E5',
          '&:hover': {
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderColor: '#E2E8F0',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CBD5E1',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4F46E5',
            borderWidth: '1.5px',
          },
        },
      },
    },
  },
})
