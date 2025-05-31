import { marked } from 'marked';
import { CodeBlock } from './code-block'; // ajuste o caminho conforme seu projeto

export const MarkdownRenderer = ({ content }: { content: string }) => {
	// Configurar o marked para renderizar HTML padrão
	// Removemos os renderers que sobrescrevem o comportamento padrão do markdown
	// com exceção de 'code' e 'codespan'.
	const renderer = new marked.Renderer();

	// Manter o codespan destacado
	renderer.codespan = ({ text }: { text: string }) =>
		`<code class="text-sm bg-muted px-1 rounded">${text}</code>`;

	renderer.code = ({ text, lang, escaped }: { text: string; lang?: string; escaped?: boolean }) => {
		const codeToUse = escaped ? text : text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return `<div data-code-block data-language="${lang || ''}">${codeToUse}</div>`;
	};

	// Parse markdown para HTML
	// Assegura que o tipo de retorno de marked.parse é string
	const htmlContent = marked.parse(content, { renderer }) as string;

	// Processar conteúdo e extrair blocos de código
	const processContent = (html: string) => {
		const parts: (string | { type: 'code'; code: string; language: string })[] = [];
		// Regex para encontrar nossos placeholders de blocos de código
		const codeBlockRegex = /<div data-code-block data-language="([^"]*)">([\s\S]*?)<\/div>/g;
		let lastIndex = 0;
		let match: RegExpExecArray | null;

		// Usar um loop while para iterar sobre todas as ocorrências
		while ((match = codeBlockRegex.exec(html)) !== null) {
			if (match.index > lastIndex) {
				// Adicionar o conteúdo antes do bloco de código
				const beforeCode = html.slice(lastIndex, match.index);
				if (beforeCode.trim()) parts.push(beforeCode);
			}

			// Decodificar o código HTML escapado antes de passar para o CodeBlock
			const decodedCode = (match[2] || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
			parts.push({
				type: 'code',
				language: match[1] || '',
				code: decodedCode,
			});

			lastIndex = match.index + match[0].length;
		}

		// Adicionar qualquer conteúdo que esteja após o último bloco de código
		if (lastIndex < html.length) {
			const remaining = html.slice(lastIndex);
			if (remaining.trim()) parts.push(remaining);
		}

		return parts;
	};

	const contentParts = processContent(htmlContent);

	return (
		<div className='max-w-none'>
			{contentParts.map((part, index) => {
				if (typeof part === 'string') {
					// Renderiza o HTML restante. O "prose" do Tailwind CSS cuidará do estilo padrão do markdown.
					return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
				} else {
					// Renderiza o componente CodeBlock para os blocos de código
					return <CodeBlock key={index} code={part.code} language={part.language} />;
				}
			})}
		</div>
	);
};

export default MarkdownRenderer;
