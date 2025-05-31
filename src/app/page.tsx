'use client';

import logo from '@/assets/brand/logo.svg';
import Button from '@/components/button/button';

import ChangeTheme from '@/components/changeTheme/changeTheme';
import Chat from '@/components/chat/chat';
import ClearChat from '@/components/clearChat/clearChat';
import Header from '@/components/layout/header/header';
import SubmitPrompt from '@/components/submitPrompt/submitPrompt';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Github, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
	const [openInfo, setOpenInfo] = useState(false);

	return (
		<div className='flex h-screen flex-col p-4 font-[family-name:var(--font-geist-sans)]'>
			<Header className='flex justify-between'>
				<Link href='https://gabriel-azv.com' target='_blank'>
					<Image src={logo} alt='logo - Gabriel Azevedo' width={50} height={50} />
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='icon'>
							<Settings size={28} />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						<DropdownMenuItem>
							<ChangeTheme />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ClearChat />
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<span onClick={() => setOpenInfo(!openInfo)}>Informações</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Header>

			<Chat containerClassName='flex-1' className='flex-1' />

			<SubmitPrompt />

			<Dialog open={openInfo} onOpenChange={setOpenInfo}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Informações</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						<span className='mb-4 block'>
							Este é um chatbot desenvolvido utilizando o modelo Gemini flash 2. A aplicação está atualmente
							em fase de testes, podendo apresentar alguns bugs relacionados ao processamento de texto. O
							sistema é projetado para fornecer interações baseadas em inteligência artificial, com o objetivo
							de oferecer respostas precisas e eficientes.
						</span>
						<span className='text-xl font-semibold'>Tecnologias principais:</span>

						<span className='block list-inside list-disc'>
							<li className='list-item'>
								<span>API Gemini flash 2</span>
							</li>
							<li className='list-item'>
								<span>NextJs</span>
							</li>
							<li className='list-item'>
								<span>Radix-ui</span>
							</li>
						</span>
					</DialogDescription>

					<DialogFooter className='hover:underline'>
						<Link
							href='https://github.com/Dargouls/chat-front'
							target='_blank'
							className='flex items-center gap-2'
						>
							<Github size={16} />
							<span>Repositório</span>
						</Link>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
