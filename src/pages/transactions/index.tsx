import Header from '../../components/Header';
import Summary from '../../components/Summary';
import { TransactionsContainer } from './styles';

function Transactions() {
	return (
		<TransactionsContainer>
			<Header />
			<Summary />
		</TransactionsContainer>
	);
}

export default Transactions;
