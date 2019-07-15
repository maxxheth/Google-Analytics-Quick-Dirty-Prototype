export const reformatFetchData = label => dateRange => {
	
	const dateRangeLen = dateRange.length;
	
	const gapiExprArr = [];
	
	let gapiLabel, gapiObj;
	
	for (let x = 0; x < dateRangeLen; x++) gapiExprArr.push(x);
		
	if (label.indexOf(' ') > -1) {
		
		let labelWords = label.split(' ');
		
		let capitalLetter = labelWords[1].split('')[0].toUpperCase();
		
		labelWords[1] = labelWords[1].replace(labelWords[1][0], capitalLetter);
		
		gapiLabel = 'ga:' + labelWords.join('');
		
		gapiObj = { expression: gapiLabel, alias: label };
		
		gapiExprArr.fill(gapiObj, 0, dateRangeLen);
		
	} else {
		
		gapiLabel = 'ga:' + label;
		
		gapiObj = { expression: gapiLabel, alias: label };
		
		gapiExprArr.fill(gapiObj, 0, dateRangeLen);
		
	}

	const dateObjRange = dateRange.reduce((acc, curr, currIndex, arr) => {
		
		const dateObj = {};
		
		if (currIndex !== arr.length - 1) {		
			
			dateObj.startDate = curr;
			
			dateObj.endDate = arr[currIndex + 1];
			
			acc.push(dateObj);
			
			return acc;
		
		} else {
			
			dateObj.startDate = curr;
			
			dateObj.endDate = curr;
			
			acc.push(dateObj);
			
			return acc;
			
		}
		
	}, []);
	
	return {
		
		newMetricArgsObjects: gapiExprArr,
		newDateArgsObjects: dateObjRange
		
	};
	
	
};