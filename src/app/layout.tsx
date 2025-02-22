import { ChatProvider } from '@/contexts/chatContext';
import { ThemeProvider } from '@/contexts/themeContext';

import InitAOS from '@/lib/init-aos';
import 'aos/dist/aos.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Chatbot Llama 3',
	description: 'Chatbot com base no modelo Llama 3',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<ThemeProvider>
				<ChatProvider>
					<body className={`${geistSans.variable} ${geistMono.variable} text-text bg-background antialiased`}>
						{children}
						<Toaster position='top-center' />
					</body>
				</ChatProvider>
			</ThemeProvider>

			<InitAOS />
		</html>
	);
}
