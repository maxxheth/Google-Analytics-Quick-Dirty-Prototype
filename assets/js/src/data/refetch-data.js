/* global XMLHttpRequest */

import { isJSON } from '../helper-funcs/is-json';

import { createDataset } from './chart-datasets';

import { liftMetricPropsFromArray } from '../logic/lift-metric-props';

import { setState } from './state';

const googleAPIPath = '../../../../fetchgapidata.php';

export const refetchData = refetchProps => state => {
	
	let displayChart = state[state.length - 1].displayChart;
	
	//let metricDateResults = state[state.length - 1].metricDateResults;

    const {
        newMetricArgsObjects,
        newDateArgsObjects
    } = refetchProps;
	
	const JSONPackage = {

        dateArgs: newDateArgsObjects,
        metricArgs: newMetricArgsObjects

    };
	
	let metricDateResults = newDateArgsObjects

        .map(dateArg => dateArg.startDate)

        .filter((dateArg, dateArgIndex, dateArgArray) => dateArgIndex < dateArgArray.length - 1);
	
	console.log(JSONPackage);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        switch (xhr.readyState) {

        case 3:
		
            console.log('Fetching data...');

		break;
		
		case 4:		
		
			console.log('Data has been fetched successfully!');
			
			console.log(xhr.response);
			
			if (isJSON(xhr.response)) {
				
				const response = JSON.parse(xhr.response);
				
				const metricData = JSON.parse(xhr.response).filter(data => data !== null);

                if (metricData.length < metricDateResults.length) {

                    metricDateResults = metricDateResults.slice(0, metricData.length);

                }

                const metricDataResults = liftMetricPropsFromArray(metricData);

                const metricDataResultsKey = Object.keys(metricDataResults)[0];

                const metricDataResultsArray = Object.values(metricDataResults)[0];

                const backgroundColorProps = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ];

                const borderColorProps = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ];
				
				let data = displayChart.data;

                    //console.log(displayChart);

                    for (let prop in data) {

                        // const currentLabel = data[prop].label;

                        /*console.log(data[prop].label);
                        console.log(data[prop].data);*/
						
						

                        /*const getNewFetchData = propArr => propArr.map(prop => { // jshint ignore:line

                                if (prop.label !== undefined && metricDateResults) { // jshint ignore:line

                                    return reformatFetchData(prop.label)(metricDateResults);// jshint ignore:line

                                }

                            });*/

                        data[prop] = data[prop].filter(propSet => propSet.label !== metricDataResultsKey); // jshint ignore:line

                        switch (prop) {

                        case 'labels':
                            data[prop] = metricDateResults;

                            break;

                        case 'datasets':

                            //const newDataPropFetchData = [...getNewFetchData(data[prop])];

                            //console.log(newDataPropFetchData);
							
							data[prop] = [...data[prop], createDataset({metricDataResultsKey: metricDataResultsKey, metricDataResultsArray: metricDataResultsArray})(backgroundColorProps)(borderColorProps)];
							
							//newDataPropFetchData.forEach(dataset => refetchData(dataset)(state)); // jshint ignore:line

                            

                            /*newDataPropFetchData.map(newDataset => {

                            console.log(newDataset);



                            const { newMetricArgsObjects, newDateArgsObjects } = newDataset;

                            console.log(newDateArgsObjects);

                            fetchData(newMetricArgsObjects, newDateArgsObjects, 10);

                            if (recurseLimit > 0) {


                            fetchData(newMetricArgsObjects, newDateArgsObjects, displayChart.data.dataset.length);



                            recurseLimit--;

                            } else {

                            data[prop] = [...data[prop], createDataset({ metricDataResultsKey: metricDataResultsKey, metricDataResultsArray: metricDataResultsArray})(backgroundColorProps)(borderColorProps)];

                            return;

                            }

                            });*/

                            break;

                        }

                    }

                    displayChart.update();

                    setState(state)({

                            displayChart: displayChart,
                            metricDataResultsKey: metricDataResultsKey,
                            metricDataResultsArray: metricDataResultsArray,
                            metricDateResults: metricDateResults,
                            //recurseLimit: recurseLimit

					});
				
				
			}
			
		break;
			
        }
		
		

    };
	
	xhr.open('POST', googleAPIPath);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(JSONPackage));

};
