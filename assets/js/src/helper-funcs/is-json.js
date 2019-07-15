export const isJSON = payload => {

	try {
		JSON.parse(payload);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}

}; 