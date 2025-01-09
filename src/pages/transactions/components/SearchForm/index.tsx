import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as z from 'zod';
import { TransactionContext } from '../../../../contexts/TransactionsContext';
import { SearchFormContainer } from './styles';

const searchFormSchema = z.object({
	query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchForm() {
	const loadTransactions = useContextSelector(
		TransactionContext,
		(context) => context.loadTransactions
	);

	const { register, handleSubmit, formState, reset } =
		useForm<SearchFormInputs>({
			resolver: zodResolver(searchFormSchema),
		});

	const handleSearchTransaction = async (data: SearchFormInputs) => {
		await loadTransactions(data.query);
		reset();
	};

	const { isSubmitting } = formState;
	return (
		<SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
			<input
				type="text"
				placeholder="Busque por transações"
				{...register('query')}
			/>
			<button
				type="submit"
				disabled={isSubmitting}
			>
				<MagnifyingGlass size={20} />
				Buscar
			</button>
		</SearchFormContainer>
	);
}

export default SearchForm;
