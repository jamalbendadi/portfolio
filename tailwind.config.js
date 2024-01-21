const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./nuxt.config.{js,ts}`,
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        gray: colors.slate,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-in': 'fadeIn 500ms ease-in-out 1',
      },
      keyframes: {
        'fadeIn': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
