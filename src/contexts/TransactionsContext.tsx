import { createContext, useEffect, useState } from 'react';
import { loadTransactions } from '../service/api';

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
}

interface TransactionProviderProps {
	children: React.ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<Transactions[]>([]);

	useEffect(() => {
		try {
			loadTransactions().then((response) => {
				setTransactions(response);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<TransactionContext.Provider value={{ transactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
