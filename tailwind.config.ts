import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './tests/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
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
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          soft: 'var(--primary-soft)',
        },
        control: {
          DEFAULT: 'var(--control)',
          text: 'var(--on-control)',
        },
        'on-control': 'var(--on-control)',
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
        },
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
    },
  },
  plugins: [],
}

export default config
