/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      },
      textColor: {
        "system-highlight": "var(--text-system-highlight)",
        "system-default": "var(--text-system-default)",
      },
      backgroundColor: {
        'system-default': "var(--bg-system-default)",

        // Theme
        'theme-color-blue': 'var(--theme-color-blue)',
        'theme-color-yellow': 'var(--theme-color-yellow)',
        'theme-color-red': 'var(--theme-color-red)',
        'theme-color-purple': 'var(--theme-color-purple)',
        'theme-color-orange': 'var(--theme-color-orange)',
        'theme-color-green': 'var(--theme-color-green)',

        'theme-background-light': 'var(--theme-background-light)',
        'theme-background-dim': 'var(--theme-background-dim)',
        'theme-background-dark': 'var(--theme-background-dark)',
      },
      borderColor: {
        'system-default': "var(--border-system-default)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  corePlugins: {
    preflight: false,
  },
}
