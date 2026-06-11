import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './tests/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        card: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--fg)',
        },
        popover: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--fg)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--on-control)',
          hover: 'var(--primary-hover)',
          soft: 'var(--primary-soft)',
        },
        secondary: {
          DEFAULT: 'var(--surface-muted)',
          foreground: 'var(--fg)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--fg)',
          soft: 'var(--accent-soft)',
        },
        destructive: {
          DEFAULT: 'var(--danger)',
          foreground: '#fffdf9',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        input: 'var(--border)',
        ring: 'var(--primary)',
        bg: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          raised: 'var(--surface-raised)',
        },
        fg: 'var(--fg)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--subtle)',
        },
        subtle: 'var(--subtle)',
        control: {
          DEFAULT: 'var(--control)',
          text: 'var(--on-control)',
        },
        'on-control': 'var(--on-control)',
        'accent-2': {
          DEFAULT: 'var(--success)',
          soft: 'var(--success-soft)',
        },
        'accent-3': {
          DEFAULT: 'var(--warning)',
          soft: 'var(--warning-soft)',
        },
        success: {
          DEFAULT: 'var(--success)',
          soft: 'var(--success-soft)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          soft: 'var(--warning-soft)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          soft: 'var(--danger-soft)',
        },
        info: {
          DEFAULT: 'var(--info)',
          soft: 'var(--info-soft)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Be Vietnam Pro', 'Segoe UI', 'sans-serif'],
        body: ['Be Vietnam Pro', 'Segoe UI', 'system-ui', 'sans-serif'],
        marketing: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
