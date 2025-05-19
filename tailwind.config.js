/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3D00',
          50: '#FFF2EE',
          100: '#FFDED2',
          200: '#FFB399',
          300: '#FF865F',
          400: '#FF5A26',
          500: '#FF3D00',
          600: '#CC3100',
          700: '#992500',
          800: '#661800',
          900: '#330C00'
        },
        secondary: {
          DEFAULT: '#0077FF',
          50: '#EFF8FF',
          100: '#DEF1FF',
          200: '#B6E5FF',
          300: '#84CAFF',
          400: '#3AA0FF',
          500: '#0077FF',
          600: '#005ECC',
          700: '#004799',
          800: '#002F66',
          900: '#001833'
        },
        accent: {
          DEFAULT: '#FFCC00',
          50: '#FFFDED',
          100: '#FFF9D2',
          200: '#FFF3A5',
          300: '#FFE978',
          400: '#FFDE4C',
          500: '#FFCC00',
          600: '#CCA300',
          700: '#997A00',
          800: '#665200',
          900: '#332900'
        },
        success: {
          DEFAULT: '#22CC33',
          50: '#F0FDF0',
          100: '#DCFCE7',
          200: '#BBF7CA',
          300: '#86EF9D',
          400: '#4ADE64',
          500: '#22CC33',
          600: '#1DB32B',
          700: '#1A8A23',
          800: '#176E1E',
          900: '#0F4A14'
        },
        warning: {
          DEFAULT: '#FF9900',
          50: '#FFF8EB',
          100: '#FFECC9',
          200: '#FFD685',
          300: '#FFC052',
          400: '#FFAC2E',
          500: '#FF9900',
          600: '#D27E00',
          700: '#A05E00',
          800: '#6D4100',
          900: '#3A2300'
        },
        error: {
          DEFAULT: '#FF0044',
          50: '#FFF0F4',
          100: '#FFE1E9',
          200: '#FFB8C9',
          300: '#FF80A2',
          400: '#FF3D76',
          500: '#FF0044',
          600: '#D10038',
          700: '#9E002A',
          800: '#6B001D',
          900: '#38000F'
        },
        neutral: {
          DEFAULT: '#374151',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712'
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-xl': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        'brutal': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      }
    },
  },
  plugins: [],
}