/* global document, XMLHttpRequest */

import { setState } from '../data/state';

import { liftMetricPropsFromArray } from './lift-metric-props';

import Chart from 'chart.js';

import { createDataset } from '../data/chart-datasets';

const googleAPIPath = '../../../../fetchgapidata.php';

let state = [{key: ['value']}];

export const fetchData = (metricArgsObjects, dateArgsObjects) => {

    const isJSON = payload => {

        try {
            JSON.parse(payload);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }; 

    let metricDateResults = dateArgsObjects.dateArgs
    
    .map(dateArg => dateArg.startDate)
    
    .filter((dateArg, dateArgIndex, dateArgArray) => dateArgIndex < dateArgArray.length - 1);

    const JSONPackage = {

        dateArgs: dateArgsObjects.dateArgs, 
        metricArgs: metricArgsObjects.metricArgs

    };

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        switch(xhr.readyState) {

        case 3: console.log('Fetching data...');

        break;

        case 4: console.log('Data has been fetched successfully!');

            if ( isJSON( xhr.response ) ) {
				
				console.log(xhr.response);

                const metricData = JSON.parse(xhr.response).filter(data => data !== null);

                if ( metricData.length < metricDateResults.length ) {

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
				
				

                const chart = document.getElementById('panel-chart');

                chart.style.backgroundColor = 'white';
                    
                let displayChart;

                console.log(state);
                
                if (state[state.length - 1]['displayChart'] === undefined) {

                    console.log("displayChart doesn't exist...yet!");

                    displayChart = new Chart(chart.getContext('2d'), {

                        type: 'line',
                        data: {
                            labels: metricDateResults,
                            datasets: [{

                                label: metricDataResultsKey,
                                data: metricDataResultsArray,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1

                            }]
                        }

                    });

                    state = setState(state)({
                    
                        displayChart: displayChart,
                        metricDataResultsKey: metricDataResultsKey,
                        metricDataResultsArray: metricDataResultsArray,
                        metricDateResults: metricDateResults
                    
                    });

                } else {

                    console.log("displayChart already exists");

                    console.log(state);

                    displayChart = state[state.length - 1].displayChart;

                    let data = displayChart.data;

                    for (let prop in data) {

                        switch(prop) {

                            case 'labels': data[prop] = metricDateResults;

                            break;

                            case 'datasets':								
                                
                                data[prop] = [...data[prop], createDataset({ metricDataResultsKey: metricDataResultsKey, metricDataResultsArray: metricDataResultsArray})(backgroundColorProps)(borderColorProps)];                           

                            break;

                        }

                    }

                    displayChart.update();

                    state = setState(state)({
                    
                        displayChart: displayChart,
                        metricDataResultsKey: metricDataResultsKey,
                        metricDataResultsArray: metricDataResultsArray,
                        metricDateResults: metricDateResults
                    
                    });
                    

                }

                

                console.log(state);
               
            }

        }

    };


    xhr.open('POST', googleAPIPath);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(JSONPackage));

    

    
};