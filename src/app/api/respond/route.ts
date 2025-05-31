import { NextResponse } from 'next/server';
import { z } from 'zod';
// Ajuste o nome do pacote conforme necessário
import { GoogleGenerativeAI } from '@google/generative-ai';

// Carregue variáveis de ambiente
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = process.env.MODEL_ID;

if (!GEMINI_API_KEY) {
	throw new Error('GEMINI_API_KEY não encontrada nas variáveis de ambiente.');
}
if (!MODEL_ID) {
	throw new Error('MODEL_ID não encontrada nas variáveis de ambiente.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_ID });

// Schema de validação com Zod
const PartSchema = z.object({ text: z.string() });
const ContentSchema = z.object({
	role: z.string(),
	parts: z.array(PartSchema).optional().default([]),
});
const ChatRequestSchema = z.object({
	message: z.string(),
	files: z.array(z.record(z.string())).optional().default([]),
	history: z.array(ContentSchema).optional().default([]),
});

type ChatRequest = z.infer<typeof ChatRequestSchema>;

// Mensagens traduzidas
const TRANSLATIONS = {
	pt: {
		error_message: 'Desculpe, ocorreu um erro: {0}. Por favor, verifique sua conexão e configurações.',
	},
};

export async function POST(request: Request) {
	try {
		const raw = await request.json();
		// Normaliza history garantindo parts válidos
		const preprocessedHistory = Array.isArray(raw.history)
			? raw.history.map((item: any) => ({
					role: item.role,
					parts: Array.isArray(item.parts) ? item.parts : item.text ? [{ text: String(item.text) }] : [],
				}))
			: [];

		const { message, files, history }: ChatRequest = ChatRequestSchema.parse({
			...raw,
			history: preprocessedHistory,
		});

		const trimmed = message.trim();
		if (!trimmed) {
			return NextResponse.json({ response: 'Por favor, envie uma mensagem válida.' }, { status: 400 });
		}

		// Montar e filtrar histórico para remover partes vazias
		const currentHistory = [
			...history.map((item) => ({ role: item.role, parts: item.parts })),
			{ role: 'user', parts: [{ text: trimmed }] },
		].filter((item) => Array.isArray(item.parts) && item.parts.length > 0);

		// Chamar a API de geração
		const completion = await model.generateContent({
			contents: currentHistory,
			// opcional: generationConfig: { maxOutputTokens: 300, temperature: 0.5, topP: 0.7 }
		});

		// Extrair resposta
		let responseText = '';
		const response = completion.response;
		if (response.text().length > 0) {
			responseText = response.text();
		} else if (response.candidates && response.candidates.length > 0) {
			const candidate = response.candidates[0];
			if (candidate.content?.parts) {
				responseText = candidate.content.parts
					.map((p) => p.text)
					.join(' ')
					.trim();
			}
		} else if (response.promptFeedback?.blockReason) {
			responseText = `Conteúdo bloqueado: ${response.promptFeedback.blockReason}`;
		} else {
			responseText = 'Não foi possível obter uma resposta do modelo ou a resposta estava vazia.';
		}

		// Atualizar histórico com resposta do modelo
		currentHistory.push({ role: 'model', parts: [{ text: responseText }] });

		return NextResponse.json({ response: responseText, history: currentHistory });
	} catch (err: any) {
		console.error('Erro na rota /api/respond:', err);
		const msg = TRANSLATIONS.pt.error_message.replace('{0}', err.message ?? String(err));
		return NextResponse.json({ error: msg }, { status: 500 });
	}
}
