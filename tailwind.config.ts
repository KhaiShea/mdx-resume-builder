import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary': '#3490dc',
                'secondary': '#ffed4a',
                'danger': '#e3342f',
            },
        },
    },
    plugins: [],
}

export default config