'use client';

import { marked } from 'marked';

import { useChatContext } from '@/contexts/chatContext';
import { ElementRef, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import CircularProgress from '../circularProgress/circularProgress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
	containerClassName?: string;
}

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
				<div {...props} className={twMerge('flex flex-col gap-2 px-4 py-2 sm:px-20', containerClassName)}>
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
	return <div className='flex justify-end p-4'>{content}</div>;
};

const Response = ({ content }: { content: string | React.ReactNode }) => {
	// const parseText = (text: string) => {

	// 	return parts.map((part, index) =>
	// 		index % 2 === 1 ? (
	// 			<>
	// 				<hr className='border-border my-10 justify-self-center border md:w-1/2' />
	// 				<h1 key={index} className='text-xl'>
	// 					<b key={index}>{part}</b>
	// 				</h1>
	// 			</>
	// 		) : (
	// 			<span key={index}>{part}</span>
	// 		)
	// 	);
	// };

	return (
		<div className='bg-foreground flex gap-2 p-4'>
			<Avatar className={twMerge('ease-bounce transition-transform duration-300')}>
				{/* <AvatarImage src='https://github.com/shadcn.png' /> */}
				<AvatarFallback>A</AvatarFallback>
			</Avatar>
			{typeof content === 'string' ? (
				<div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
			) : (
				content
			)}
		</div>
	);
};
