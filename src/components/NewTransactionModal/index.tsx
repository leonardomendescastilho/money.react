import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
	CloseButton,
	Content,
	Overlay,
	TransactionText,
	TransactionType,
	TransactionTypeButton,
} from './style';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTransactions } from '../../hooks/useTransactions';

const newTransactionFormSchema = z.object({
	description: z.string(),
	amount: z.number(),
	category: z.string(),
	type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

function NewTransactionModal() {
	const [isCreated, setIsCreated] = useState<boolean>(false);

	const { register, handleSubmit, formState, control, reset } =
		useForm<NewTransactionFormInputs>({
			resolver: zodResolver(newTransactionFormSchema),
			defaultValues: {
				type: 'income',
			},
		});

	const { createTransaction } = useTransactions();

	const handleCreateNewTransaciton = async (data: NewTransactionFormInputs) => {
		createTransaction(data);

		reset();

		setIsCreated(true);

		setTimeout(() => {
			setIsCreated(false);
		}, 3000);
	};

	const { isSubmitting } = formState;

	return (
		<>
			<Dialog.Portal>
				<Overlay />

				<Content>
					<Dialog.Title>Nova Transação</Dialog.Title>
					<CloseButton>
						<X size={24} />
					</CloseButton>

					<form onSubmit={handleSubmit(handleCreateNewTransaciton)}>
						<input
							type="text"
							placeholder="Descrição"
							{...register('description')}
						/>
						<input
							type="number"
							placeholder="Preço"
							{...register('amount', { valueAsNumber: true })}
						/>
						<input
							type="text"
							placeholder="Categoria"
							{...register('category')}
						/>

						<Controller
							control={control}
							name="type"
							render={({ field }) => {
								return (
									<TransactionType
										onValueChange={field.onChange}
										value={field.value}
									>
										<TransactionTypeButton
											variant="income"
											value="income"
										>
											<ArrowCircleUp size={24} />
											Entrada
										</TransactionTypeButton>
										<TransactionTypeButton
											variant="outcome"
											value="outcome"
										>
											<ArrowCircleDown size={24} />
											Saida
										</TransactionTypeButton>
									</TransactionType>
								);
							}}
						/>

						<TransactionText>
							{isCreated && <span>Cadastro realizado com sucesso</span>}
						</TransactionText>

						<button
							type="submit"
							disabled={isSubmitting}
						>
							Cadastrar
						</button>
					</form>
				</Content>
			</Dialog.Portal>
		</>
	);
}

export default NewTransactionModal;
