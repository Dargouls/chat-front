import { ChatProvider } from '@/contexts/chatContext';
import { ThemeProvider } from '@/contexts/themeContext';

import InitAOS from '@/lib/init-aos';
import 'aos/dist/aos.css';

import type { Metadata } from 'next';
import { Sen } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const sen = Sen({
	variable: '--font-sen',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Super Mini Chat',
	description: 'Chatbot com inteligência artificial',
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
					<body className={` ${sen.className} text-text bg-background antialiased`}>
						{children}
						<Toaster position='top-center' />
					</body>
				</ChatProvider>
			</ThemeProvider>

			<InitAOS />
		</html>
	);
}
