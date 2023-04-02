import { BoardItemCard } from './mainStyledComponents';

const Card = (props) => {
	console.log(props);
	return (
		<BoardItemCard>
			<div>{props.content.id}</div>
			<div className="title">{props.content.name}</div>
			<div className="content">{props.content.body}</div>
			<div className="email">{props.content.email}</div>
		</BoardItemCard>
	);
};
export { Card };
