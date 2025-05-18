import { useChatContext } from '@/contexts/chatContext';
import { useForm } from 'react-hook-form';
import useChat from '../chat/useFetchChat';

import toast from 'react-hot-toast';

import { CornerDownRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Button from '../button/button';
import TextArea from '../textArea/textArea';

interface SubmitPromptProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SubmitPrompt({ ...props }: SubmitPromptProps) {
	const { conversation } = useChat();
	const { setHistory } = useChatContext();
	const { register, watch, handleSubmit, setValue } = useForm();

	const submit = async () => {
		if (!watch('message')) {
			toast.error('Digite uma mensagem');
			return;
		}
		const message = watch('message');
		setHistory((prev) => [...prev, { role: 'user', content: watch('message') }]);
		setValue('message', '');

		const response = await conversation.respond(message);

		setHistory((prev) => [...prev, { role: 'assistant', content: response.response }]);
	};

	return (
		<form
			className={twMerge(
				'border-border relative flex w-full items-center gap-2 border-t px-4 pt-4 sm:px-20',
				props.className
			)}
			onSubmit={handleSubmit(submit)}
		>
			<TextArea
				placeholder='Digite sua mensagem aqui... (Pressione Enter para enviar)'
				variant='contained'
				size='lg'
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault(); // impede quebra de linha
						handleSubmit(submit)(); // envia o formulário
					}
				}}
				register={register('message')}
			/>

			<Button
				className='text-text flex flex-col items-center justify-center'
				variant='icon'
				type='submit'
				disabled={!watch('message')}
			>
				<CornerDownRight />
				<span className='text-xs'>Enter</span>
			</Button>
		</form>
	);
}
