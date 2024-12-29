import { createContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transactions {
	id: number;
	description: string;
	type: 'income' | 'outcome';
	category: string;
	amount: number;
	createdAt: string;
}

interface TransactionContextType {
	transactions: Transactions[];
	loadTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
	children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<Transactions[]>([]);

	async function loadTransactions(query?: string) {
		const response = await api.get('/transactions', {
			params: {
				description: query,
			},
		});

		setTransactions(response.data);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	return (
		<TransactionContext.Provider value={{ transactions, loadTransactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
