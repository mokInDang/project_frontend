import { useState } from 'react';
import { ImFileEmpty, ImFileText2 } from 'react-icons/im';
import { isLogined } from '../../utils';
import { InfiniteScroll } from './infiniteScroll';
import { TabWrapper, TabDiv } from '../../components';
import { useNavigate } from 'react-router';
const RecruitmentInfiniteScroll = () => {
	const [regionTab, setRegionTab] = useState('all');
	const navigate = useNavigate();
	return (
		<>
			<TabWrapper regionTab={regionTab}>
				<TabDiv
					onClick={(e) => {
						// e.preventDefault();
						setRegionTab('all');
					}}
					className="regionTab entireRegion">
					<ImFileEmpty
						size="2.5rem"
						style={{ marginRight: '1rem' }}
					/>
					전체
				</TabDiv>
				<TabDiv
					onClick={(e) => {
						e.preventDefault();
						isLogined(setRegionTab, 'myRegion', navigate);
					}}
					className="regionTab myRegion">
					<ImFileText2
						size="2.5rem"
						style={{ marginRight: '1rem' }}
					/>
					내 지역
				</TabDiv>
			</TabWrapper>
			<div
				style={
					regionTab === 'all' ? { display: 'block' } : { display: 'none' }
				}>
				<InfiniteScroll regionTab={regionTab} />
			</div>
			<div
				style={
					regionTab === 'myRegion' ? { display: 'block' } : { display: 'none' }
				}>
				{regionTab === 'myRegion' ? (
					<InfiniteScroll regionTab={regionTab} />
				) : (
					<></>
				)}
			</div>
		</>
	);
};
export { RecruitmentInfiniteScroll };
