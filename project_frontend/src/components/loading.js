import styled from 'styled-components';
import { MyPageWrapper } from '../components';
import { BarLoader } from 'react-spinners';

const LoadingWrapper = styled(MyPageWrapper)`
	display: ${(props) => (props.isLoading ? 'block' : 'none')};
	background-color: white;
	height: ${(props) => (props.height ? props.height : '90rem')};
	margin: 0;
	opacity: 0.8;
	position: absolute;
	z-index: 3;
	width: 100%;
`;

const Loading = ({ isLoading, height }) => {
	return (
		<LoadingWrapper
			isLoading={isLoading}
			height={height}>
			<BarLoader
				color="#81CC55"
				height="0.5rem"
				width="100%"></BarLoader>
		</LoadingWrapper>
	);
};

export { Loading };
