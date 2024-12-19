import logoImg from '../../assets/logo.svg';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './style';

function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoImg} />
				<NewTransactionButton>Nova Transação</NewTransactionButton>
			</HeaderContent>
		</HeaderContainer>
	);
}

export default Header;
