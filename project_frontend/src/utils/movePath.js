const movePath = (nav, path, query) => {
	if (query === undefined) nav(path);
	else nav(path + query);
};

export { movePath };
