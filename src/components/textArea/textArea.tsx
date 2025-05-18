'use client';

import { cva } from 'class-variance-authority';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	register?: UseFormRegisterReturn<string>;
	placeholder?: string;
	variant?: 'contained' | 'default';
	size?: 'sm' | 'lg';
	id?: string;
	className?: string;
}

export default function TextArea({
	placeholder,
	variant,
	size,
	register,
	id,
	className,
	...props
}: TextFieldProps) {
	const variants = cva(
		`w-full bg-transparent outline-none transition-all
     disabled:cursor-not-allowed disabled:opacity-50
     overflow-auto scrollbar-thin scrollbar
     scrollbar-track-transparent scrollbar-thumb-zinc-800 scrollbar-thumb-rounded-full`,
		{
			variants: {
				variant: {
					default: 'border-b-2 border-slate-200 focus-visible:border-b-slate-300',
					contained:
						'focus-visible:outline-accent bg-textField text-textField-foreground border border-border hover:border-accent rounded-lg',
				},
				size: {
					sm: 'px-1 py-1',
					lg: 'px-3 py-3',
				},
			},
			defaultVariants: {
				variant: 'contained',
				size: 'lg',
			},
		}
	);

	return (
		<textarea
			className={twMerge(variants({ variant, size }), className)}
			id={id}
			placeholder={placeholder}
			autoComplete='off'
			{...register}
			{...props}
		/>
	);
}
