export const designTokens = {
  // Colors
  colors: {
    // Primary palette (inspired by brilliance)
    text: {
      primary: '#37322f',      // Main text color
      secondary: '#605a57',    // Secondary text
      muted: '#37322f80',      // 80% opacity
      light: '#37322f60',      // 60% opacity
    },
    background: {
      primary: '#ffffff',
      secondary: '#fdfaf7',
      tertiary: '#fbfaf9',
    },
    border: {
      primary: '#e0dedb',      // Very light, sophisticated
      secondary: '#00000008',  // Barely visible
      tertiary: '#00000012',   // Subtle
    },
    primary: '#0ea5e9',        // Cognia blue
    accent: '#10b981',         // Success green
  },
  
  // Typography
  typography: {
    fontFamily: {
      serif: 'Georgia, serif',
      sans: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',      // 8px
    sm: '1rem',        // 16px
    md: '1.5rem',      // 24px
    lg: '2rem',        // 32px
    xl: '3rem',        // 48px
    '2xl': '4rem',     // 64px
    '3xl': '6rem',     // 96px
    '4xl': '8rem',     // 128px
  },
  
  // Layout
  layout: {
    maxWidth: {
      sm: '640px',
      md: '768px', 
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    container: 'max-w-[1060px]', // Brilliance-inspired
    section: {
      paddingY: {
        sm: '4rem',    // 64px
        md: '6rem',    // 96px
        lg: '8rem',    // 128px
      }
    }
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    card: '0 40px 100px rgba(0, 0, 0, 0.08)', // Brilliance-inspired
    subtle: '0px 0px 0px 2.5px rgba(255,255,255,0.08) inset',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',    // 6px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    card: '2rem',      // Bento cards
    button: '9999px',  // Pill buttons
  },
  
  // Grid system
  grid: {
    columns: 12,
    gap: {
      sm: '1rem',      // 16px
      md: '1.5rem',    // 24px
      lg: '2rem',      // 32px
    },
    bento: {
      gap: '1.5rem',   // 24px between bento cards
    }
  }
};

// Utility classes for consistent styling
export const classes = {
  // Section spacing
  section: 'py-16 md:py-24 lg:py-32',
  sectionCompact: 'py-12 md:py-16 lg:py-20',
  
  // Container
  container: 'max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8',
  
  // Typography
  heading: {
    h1: 'text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight lg:leading-[96px] text-[#37322f]',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight text-[#37322f]',
    h3: 'text-2xl md:text-3xl font-serif font-normal leading-tight text-[#37322f]',
    h4: 'text-xl md:text-2xl font-sans font-semibold text-[#37322f]',
  },
  
  body: {
    large: 'text-lg text-[#37322f]/80 font-medium leading-relaxed',
    base: 'text-base text-[#37322f]/80 leading-relaxed',
    small: 'text-sm text-[#605a57] leading-relaxed',
  },
  
  // Cards
  card: {
    base: 'bento-card',
    elevated: 'bento-card',
    subtle: 'bento-card',
  },
  
  // Buttons
  button: {
    primary: 'bg-[#37322f] hover:bg-[#37322f]/90 text-white rounded-full font-medium text-sm shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] transition-all duration-300',
    secondary: 'bg-white border border-[#e0dedb] text-[#37322f] rounded-full font-medium text-sm hover:bg-[#fdfaf7] transition-all duration-300',
    ghost: 'text-[#37322f]/80 hover:text-[#37322f] rounded-full font-medium text-sm transition-all duration-300',
  },
  
  // Bento grid
  bentoGrid: 'grid grid-cols-12 gap-6',
  bentoCard: 'bento-card',
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
