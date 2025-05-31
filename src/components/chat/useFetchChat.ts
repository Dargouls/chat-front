import { useChatContext } from '@/contexts/chatContext';
import { HistoryItemProps } from '@/interfaces/historyItemProps';
import { api } from '@/lib/axios';

interface ChatResponse {
	response: string;
	history: HistoryItemProps[];
}

const useChat = () => {
	const { setLoading, history } = useChatContext();

	const respond = async (prompt: string) => {
		setLoading(true);

		console.log('prompt e histórico', { prompt, history });
		//fazer a mesma rota, mas com fetch:
		const response = await fetch('/api/respond', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: prompt, history: history }),
		});
		setLoading(false);

		const data = await response.json();
		return data as ChatResponse;
	};

	const getHistory = async () => {
		const response = await api.get('/chat/history');
		return response.data?.history;
	};

	return {
		conversation: {
			respond,
		},
		getHistory,
	};
};

export default useChat;
