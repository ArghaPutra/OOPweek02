/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: '#007AFF',
        'primary-dark': '#0056B3',
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
        purple: '#AF52DE',
        surface: '#F2F2F7',
        label: '#000000',
        divider: '#E5E5EA',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0,0,0,0.08)',
        'heavy': '0 8px 32px rgba(0,0,0,0.14)',
        'glow': '0 0 32px rgba(0,122,255,0.18)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s linear infinite',
      },
      keyframes: {
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '-600px 0' }, '100%': { backgroundPosition: '600px 0' } },
      },
    },
  },
  plugins: [],
};
