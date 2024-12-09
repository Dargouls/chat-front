'use client';

import ChangeTheme from '@/components/changeTheme/changeTheme';
import Chat from '@/components/chat/chat';
import ClearChat from '@/components/clearChat/clearChat';
import SubmitPrompt from '@/components/submitPrompt/submitPrompt';
import { ReactNode } from 'react';

export default function Home() {
	return (
		<div className='flex h-screen flex-col p-4 font-[family-name:var(--font-geist-sans)]'>
			<Actions>
				<>
					<ChangeTheme />
					<ClearChat />
				</>
			</Actions>

			<Chat containerClassName='flex-1' className='flex-1' />

			<SubmitPrompt />
		</div>
	);
}

const Actions = ({ children }: { children: ReactNode }) => {
	return (
		<div className='border-border flex w-full items-center justify-end gap-2 border-b pb-4'>{children}</div>
	);
};
