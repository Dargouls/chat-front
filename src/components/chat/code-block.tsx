export const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
	return (
		<div className='border-border relative my-4 rounded-lg border bg-white dark:bg-black'>
			{language && (
				<nav className='border-border flex items-center justify-between border-b bg-gray-100 px-4 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
					<span className='font-medium'>{language}</span>
				</nav>
			)}
			<button
				onClick={() => navigator.clipboard.writeText(code)}
				className='sticky top-0 z-10 float-right m-2 rounded px-2 py-1 text-xs transition-colors hover:bg-gray-200 dark:hover:bg-gray-700'
			>
				Copiar
			</button>

			<pre className='overflow-x-auto p-4'>
				<code className={`language-${language || 'text'} text-sm`}>{code}</code>
			</pre>
		</div>
	);
};
