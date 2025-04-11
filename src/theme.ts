export const theme = {
  colors: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#1976d2',
      light: '#2196f3',
      dark: '#0d47a1',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
      dark: '#f4f6f8'
    },
    text: {
      primary: '#2c3e50',
      secondary: '#34495e',
      light: '#7f8c8d',
      disabled: '#bdc3c7'
    },
    border: {
      light: '#e0e6ed',
      main: '#cbd5e1',
      dark: '#94a3b8'
    },
    success: {
      light: '#4caf50',
      main: '#2ecc71',
      dark: '#27ae60'
    },
    warning: {
      light: '#ffa726',
      main: '#f1c40f',
      dark: '#f39c12'
    },
    error: {
      light: '#ef5350',
      main: '#e74c3c',
      dark: '#c0392b'
    }
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
    xl: '0 12px 24px rgba(0,0,0,0.1)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    round: '50%'
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    headings: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4
      }
    },
    body: {
      regular: {
        fontSize: '1rem',
        lineHeight: 1.5
      },
      small: {
        fontSize: '0.875rem',
        lineHeight: 1.5
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5
      }
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  }
};

export type Theme = typeof theme;

