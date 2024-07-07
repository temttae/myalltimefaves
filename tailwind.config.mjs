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
		extend: {},
	},
	plugins: [],
}
