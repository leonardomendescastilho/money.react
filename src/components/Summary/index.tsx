import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { useTransactions } from '../../hooks/useTransactions';
import { priceFormatter } from '../../utils/formatter';
import { SummaryCard, SummaryContainer } from './style';

function Summary() {
	const { transactions } = useTransactions();

	const summary = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === 'income') {
				acc.income += transaction.amount;
				acc.total += transaction.amount;
			} else {
				acc.outcome += transaction.amount;
				acc.total -= transaction.amount;
			}
			return acc;
		},
		{ income: 0, outcome: 0, total: 0 }
	);

	return (
		<SummaryContainer>
			<SummaryCard>
				<header>
					<span>Entradas</span>
					<ArrowCircleUp
						size={32}
						color="#00b37e"
					/>
				</header>
				<strong>{priceFormatter.format(summary.income)}</strong>
			</SummaryCard>
			<SummaryCard>
				<header>
					<span>Saídas</span>
					<ArrowCircleDown
						size={32}
						color="#f75a68"
					/>
				</header>
				<strong>{priceFormatter.format(summary.outcome)}</strong>
			</SummaryCard>
			<SummaryCard variant="green">
				<header>
					<span>Total</span>
					<CurrencyDollar
						size={32}
						color="#fff"
					/>
				</header>
				<strong>{priceFormatter.format(summary.total)}</strong>
			</SummaryCard>
		</SummaryContainer>
	);
}

export default Summary;
