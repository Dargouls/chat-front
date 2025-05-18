import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				text: 'var(--text)',
				border: 'var(--border)',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				textField: {
					DEFAULT: 'var(--textField)',
					foreground: 'var(--textField-foreground)',
				},
				toggle: {
					DEFAULT: 'hsl(var(--toggle))',
					foreground: 'hsl(var(--toggle-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'var(--sidebar-border)',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},

			transitionTimingFunction: {
				bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
				sidebar: 'cubic-bezier(0.25, 1, 0.5, 1.25)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				animScale: {
					'0, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.03)' },
				},
			},
			animation: {
				vush: 'spin 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both !important',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'animated-scaleX': 'animScale 15s 1s ease-in-out infinite',
				'pulse-bounce': 'animScale 0.4s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')({ nocompatible: true })],
} satisfies Config;
