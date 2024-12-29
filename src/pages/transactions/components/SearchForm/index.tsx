import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTransactions } from '../../../../hooks/useTransactions';
import { SearchFormContainer } from './styles';

const searchFormSchema = z.object({
	query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchForm() {
	const { register, handleSubmit, formState, reset } =
		useForm<SearchFormInputs>({
			resolver: zodResolver(searchFormSchema),
		});
	const { loadTransactions } = useTransactions();

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
