/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#252525',
      'grey': {
        'light': '#e8e7e6',
        'dark': '#d9d9d9',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'], // body
      rufina: ['Rufina', 'serif'], // header
    },
    fontSize: {
      base: '1rem', // 16px
      xl: '1.25rem', // 20px
      '2xl': '2rem', // 32px
      '3xl': '3rem', // 48px
      '4xl': '4rem', // 64px
      '5xl': '6rem', // 96px
    },
		extend: {},
	},
	plugins: [],
}
