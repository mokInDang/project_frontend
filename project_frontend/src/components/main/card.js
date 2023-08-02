import { BoardItemCard } from './mainStyledComponents';
import { GlobalProfile, VerticalBar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Message } from 'iconsax-react';
const Card = ({ content }) => {
	const navigate = useNavigate();
	const contentBody = content.contentBody;
	const newContent = contentBody
		.replace(/<br>/gi, ' ')
		.replace(/<(\/p)([^>]*)>/g, ' ')
		.replace(/&nbsp;/gi, ' ')
		.replace(/<[^>]*>?/g, '')
		.replace(/(<([^>]+)>)/gi, '');
	return (
		<BoardItemCard
			isOnRecruitment={content.onRecruitment}
			onClick={() => navigate(`/boards/recruitment/${content.boardId}`)}>
			<div className='closed' />
			<div className='category'>
				시작 예정일
				<VerticalBar className='bar' />
				{content.startingDate}
				<VerticalBar className='bar' />
				{content.activityCategory}
			</div>
			<div className='title'>{content.title}</div>
			<div className='contentBody'>{newContent}</div>
			<div style={{ flexGrow: 1 }} />
			<div className='writerProfileWrap'>
				{content.region}
				<hr />
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className='writerProfile'>
						<GlobalProfile
							size='4.6rem'
							margin='0.7rem 1.2rem 0.7rem 0'
							src={content.writerProfileUrl}></GlobalProfile>
						<div className='writerInfo'>
							{content.writerAlias}({content.firstFourLettersOfEmail}
							****)
						</div>
						<div className='numofComments'>
							<Message size='2.5rem'></Message>
							<span>{content.countOfCommentAndReplyComment}</span>
						</div>
					</div>
				</div>
			</div>
		</BoardItemCard>
	);
};
export { Card };
