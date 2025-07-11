'use client';

import { useChatContext } from '@/contexts/chatContext';
import { ElementRef, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import CircularProgress from '../circularProgress/circularProgress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import MarkdownRenderer from './serialize-markdown';

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
	containerClassName?: string;
}

// Componente customizado para blocos de código

export default function Chat({ containerClassName, ...props }: ChatProps) {
	const { history, isLoading } = useChatContext();
	const scrollAreaRef = useRef<ElementRef<typeof ScrollArea>>(null);

	const dialog = history.map((item, index) => ({ ...item, id: index }));

	useEffect(() => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
		}
	}, [history]);

	return (
		<>
			<ScrollArea ref={scrollAreaRef} className={props.className}>
				<div {...props} className={twMerge('flex flex-col gap-6 px-4 py-2 sm:px-20', containerClassName)}>
					{dialog.map((item, index) => {
						if (item.role === 'assistant') {
							return <Response key={index} content={item.content} />;
						} else {
							return <User key={index} content={item.content} />;
						}
					})}

					{isLoading && <Response key={'loading'} content={<CircularProgress size={16} />} />}
				</div>
			</ScrollArea>
		</>
	);
}

const User = ({ content }: { content: string }) => {
	return (
		<div className='flex justify-end'>
			<div className='text-text max-w-[80%] rounded-lg px-4 py-3'>{content}</div>
		</div>
	);
};

const Response = ({ content }: { content: string | React.ReactNode }) => {
	return (
		<div className='bg-foreground flex gap-3 rounded-lg p-2'>
			<Avatar className={twMerge('mt-1 h-8 w-8 flex-shrink-0')}>
				<AvatarFallback className='text-sm'>A</AvatarFallback>
			</Avatar>
			<div className='min-w-0 flex-1 p-2'>
				{typeof content === 'string' ? (
					<MarkdownRenderer content={content} />
				) : (
					<div className='flex items-center'>{content}</div>
				)}
			</div>
		</div>
	);
};
