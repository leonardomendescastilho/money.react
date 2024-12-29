import { createContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transactions {
	id?: number;
	description: string;
	type: 'income' | 'outcome';
	category: string;
	amount: number;
	createdAt: string;
}

interface CreateNewTransactionInputs {
	description: string;
	type: 'income' | 'outcome';
	category: string;
	amount: number;
}

interface TransactionContextType {
	transactions: Transactions[];
	loadTransactions: (query?: string) => Promise<void>;
	createTransaction: (data: CreateNewTransactionInputs) => Promise<void>;
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
				_sort: 'createdAt',
				_order: 'desc',
				description: query,
			},
		});

		setTransactions(response.data);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	async function createTransaction(data: CreateNewTransactionInputs) {
		const { amount, category, description, type } = data;

		const response = await api.post('/transactions', {
			amount,
			category,
			description,
			type,
			createdAt: new Date(),
		});

		setTransactions((state) => [response.data, ...state]);
	}

	return (
		<TransactionContext.Provider
			value={{ transactions, loadTransactions, createTransaction }}
		>
			{children}
		</TransactionContext.Provider>
	);
}
