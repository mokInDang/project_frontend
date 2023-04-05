import { BoardItemCard } from './mainStyledComponents';
import { WriterProfilePicDiv, VerticalBar } from '../../components';
const Card = (props) => {
	const content = props.content.content;
	const newContent = content
		.replace(/<[^>]*>?/g, '')
		.replace(/(<([^>]+)>)/gi, '');
	return (
		<BoardItemCard>
			<div className="category">
				시작 예정일
				<VerticalBar />
				{props.content.startingDate}
				<VerticalBar />
				{props.content.activityCategory}
			</div>
			<div className="title">{props.content.title}</div>
			<div className="content">{newContent}</div>
			<div>
				<hr></hr>
				<div className="email">
					<WriterProfilePicDiv
						size="4.6rem"
						margin="1rem 1.5rem 1rem 0"></WriterProfilePicDiv>
					<div>
						{props.content.writerAlias}({props.content.firstFourLettersOfEmail}
						****)
					</div>
				</div>
			</div>
		</BoardItemCard>
	);
};
export { Card };
