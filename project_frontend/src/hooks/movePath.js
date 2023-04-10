import { useNavigate } from 'react-router-dom';

const movePath = (nav, path, query) => {
	if (query === undefined) nav(path);
	else nav(path + query);
};

export { movePath };
