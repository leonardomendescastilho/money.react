import Header from '../../components/Header';
import Summary from '../../components/Summary';
import { useTransactions } from '../../hooks/useTransactions';
import SearchForm from './components/SearchForm';
import {
	PriceHighlight,
	TransactionsContainer,
	TransactionsTable,
} from './styles';

function Transactions() {
	const { transactions } = useTransactions();

	return (
		<div>
			<Header />
			<Summary />
			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map((transaction) => {
							return (
								<tr key={transaction.id}>
									<td width={'50%'}>{transaction.description}</td>
									<td>
										<PriceHighlight variant={transaction.type}>
											R$ {transaction.amount}
										</PriceHighlight>
									</td>

									<td>{transaction.category}</td>
									<td>{transaction.createdAt.split('T')[0]}</td>
								</tr>
							);
						})}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}

export default Transactions;
