import styled from 'styled-components';
import { MyPageWrapper } from '../components';
import { BarLoader } from 'react-spinners';

const LoadingWrapper = styled(MyPageWrapper)`
	display: ${(props) => (props.isLoading ? 'block' : 'none')};
	background-color: white;
	// 헤더 높이만큼 빼주기 (나중에 헤더까지 포함해서 모달처리할수도)
	height: 100vh;
	margin: 0;
	top: 0;
	opacity: 0.7;
	position: fixed;
	z-index: 102;
	width: 100%;
	.barLoader {
		position: absolute;
		top: 9rem;
	}
	@media (min-width: 1600px) {
		height: 100vh;
		.barLoader {
			top: 11rem;
		}
	}
`;

const Loading = ({ isLoading }) => {
	return (
		<LoadingWrapper isLoading={isLoading}>
			<BarLoader
				className='barLoader'
				color='#81CC55'
				height='0.5rem'
				width='100%'></BarLoader>
		</LoadingWrapper>
	);
};

export { Loading };
