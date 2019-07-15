/* global XMLHttpRequest */

import { isJSON } from '../helper-funcs/is-json';  

import { createDataset } from './chart-datasets';  

import { liftMetricPropsFromArray } from '../logic/lift-metric-props'; 

import { setState } from './state';

const googleAPIPath = '../../../../fetchgapidata.php';

/**
*
*	This function takes the following parameters:
*
*	1. refetchProps: Object
*
*
*	This contains two properties: newMetricArgsObjects and newDateArgsObjects
*	Since these have already been formatted for consumption by the Google Analytics Reporting API,
*	they are assigned as specially named properties in an object that's converted into JSON prior
*	to being fired off to the PHP script that interfaces with the Google Analytics Reporting API.
*
*
*	2. state: Object
*
*	This passes the current state downstream from the fetchData function as soon as
* 	this function is called within fetchData's scope. It contains the DOM reference to the 
*	display chart element that's used to render a dataset and update existing datasets in turn 
*	as soon as it's fetched from the API.
*
*
*/

export const refetchData = refetchProps => state => {

    let displayChart = state[state.length - 1].displayChart;

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

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        switch (xhr.readyState) {

        case 3:

            console.log('Fetching data...');

            break;

        case 4:

            console.log('Data has been fetched successfully!');

            console.log(xhr.response);

            if (xhr.status === 200 && isJSON(xhr.response)) {

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

                for (let prop in data) {

                    data[prop] = data[prop].filter(propSet => propSet.label !== metricDataResultsKey); // jshint ignore:line

                    switch (prop) {

                    case 'labels':
                        data[prop] = metricDateResults;

                        break;

                    case 'datasets':

                        data[prop] = [...data[prop], createDataset({
                                metricDataResultsKey: metricDataResultsKey,
                                metricDataResultsArray: metricDataResultsArray
                            })(backgroundColorProps)(borderColorProps)];

                        break;

                    }

                }

                displayChart.update();

                setState(state)({

                    displayChart: displayChart,
                    metricDataResultsKey: metricDataResultsKey,
                    metricDataResultsArray: metricDataResultsArray,
                    metricDateResults: metricDateResults,

                });

            }

            break;

        }

    };

    xhr.open('POST', googleAPIPath);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(JSONPackage));

};