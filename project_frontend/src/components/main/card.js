import { BoardItemCard } from './mainStyledComponents';
import { WriterProfilePicDiv, VerticalBar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { isLogined } from '../../utils';
const Card = (props) => {
	const navigate = useNavigate();
	const content = props.content.content;
	const newContent = content
		.replace(/<[^>]*>?/g, '')
		.replace(/(<([^>]+)>)/gi, '');
	return (
		<BoardItemCard
			onClick={() =>
				isLogined(navigate, `/boards/recruitment/${props.content.boardId}`)
			}>
			<div className="closed" />
			<div className="category">
				시작 예정일
				<VerticalBar />
				{props.content.startingDate}
				<VerticalBar />
				{props.content.activityCategory}
			</div>
			<div className="title">{props.content.title}</div>
			<div className="content">{newContent}</div>
			<div className="writerProfileWrap">
				{props.content.region}
				<hr />
				<div className="writerProfile">
					<WriterProfilePicDiv
						size="4.6rem"
						margin="1rem 1.5rem 1rem 0"
						src={props.content.writerProfileUrl}></WriterProfilePicDiv>
					{props.content.writerAlias}({props.content.firstFourLettersOfEmail}
					****)
				</div>
			</div>
		</BoardItemCard>
	);
};
export { Card };
