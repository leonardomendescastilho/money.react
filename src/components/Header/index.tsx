import * as Dialog from '@radix-ui/react-dialog';
import logoImg from '../../assets/vite.svg';
import NewTransactionModal from '../NewTransactionModal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './style';

function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoImg} />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova Transação</NewTransactionButton>
					</Dialog.Trigger>

					<NewTransactionModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}

export default Header;
