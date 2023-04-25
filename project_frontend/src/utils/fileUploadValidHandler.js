const ALLOW_FILE_EXTENSION = 'jpg,jpeg,png,gif,mp4';
const FILE_SIZE_MAX_LIMIT = 10 * 1024 * 1024;

const fileExtensionValid = (originalFileName) => {
	const extension = removeFileName(originalFileName);
	if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
		// 허용하지 않은 확장자일 경우, 확장자가 없는 경우 return false
		return false;
	}
	return true;
};

const removeFileName = (originalFileName) => {
	// 마지막 .의 위치 다음이 파일 확장자를 의미하므로 .의 위치 기억
	const lastIndex = originalFileName.lastIndexOf('.');
	if (lastIndex < 0) {
		// 파일 이름에 .이 존재하지 않는 경우 확장자가 존재하지 않으므로 빈 값 return
		return '';
	}
	return originalFileName.substring(lastIndex + 1).toLowerCase();
};

const fileSizeValid = (fileSize) => {
	if (fileSize > FILE_SIZE_MAX_LIMIT) {
		return false;
	}
	return true;
};

export { fileExtensionValid, fileSizeValid };
