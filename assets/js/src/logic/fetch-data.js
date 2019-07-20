/* global document, XMLHttpRequest */

import { setState } from '../data/state';

import { liftMetricPropsFromArray } from './lift-metric-props';

import Chart from 'chart.js';

import { createDataset } from '../data/chart-datasets';

import { reformatFetchData } from '../data/reshape-fetch-data';

import { isJSON } from '../helper-funcs/is-json';

import { refetchData } from '../data/refetch-data'; 

const googleAPIPath = '../../../../fetchgapidata.php';

let state = [];

export const fetchData = (metricArgsObjects, dateArgsObjects) => {

    let metricDateResults = dateArgsObjects.dateArgs

        .map(dateArg => dateArg.startDate)

        .filter((dateArg, dateArgIndex, dateArgArray) => dateArgIndex < dateArgArray.length - 1);

    const JSONPackage = {

        dateArgs: dateArgsObjects.dateArgs,
        metricArgs: metricArgsObjects.metricArgs

    };

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        switch (xhr.readyState) {

        case 3:
            console.log('Fetching data...');

            break;

        case 4:
        
            console.log(xhr.response);

            if (isJSON(xhr.response)) {

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

                const dummyChart = document.querySelector('[data-dummy="1"]');
                
                if (dummyChart) {

                    const dummyChartParent = dummyChart.parentNode;

                    dummyChartParent.removeChild(dummyChart);

                    const chartElem = document.createElement('canvas');

                    chartElem.classList.add('panel-chart');

                    dummyChartParent.appendChild(chartElem);
                    
                }

                const chart = document.querySelector('.panel-chart');

                chart.style.backgroundColor = 'white';

                let displayChart;

                const displayChartConfig = {

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

                            }
                        ]
                    },
                    options: {

                        responsive: true,
                        maintainAspectRatio: false
        
                    }

                };

                if (state.length === 0) {

                    console.log("displayChart doesn't exist...yet!");

                    displayChart = new Chart(chart.getContext('2d'), displayChartConfig);

                    state = setState(state)({

                            displayChart: displayChart,
                            metricDataResultsKey: metricDataResultsKey,
                            metricDataResultsArray: metricDataResultsArray,
                            metricDateResults: metricDateResults,

                        });

                } else {

                    console.log("displayChart already exists");

                    displayChart = state[state.length - 1].displayChart;

                    let data = displayChart.data;

                    for (let prop in data) {

                        const getNewFetchData = propArr => propArr.map(prop => { // jshint ignore:line

                                if (prop.label !== undefined && metricDateResults) { // jshint ignore:line

                                    return reformatFetchData(prop.label)(metricDateResults); // jshint ignore:line

                                }

                            });

                        data[prop] = data[prop].filter(propSet => propSet.label !== metricDataResultsKey); // jshint ignore:line

                        switch (prop) {

                        case 'labels':
                            data[prop] = metricDateResults;

                            break;

                        case 'datasets':

                            const newDataPropFetchData = [...getNewFetchData(data[prop])];
							
							newDataPropFetchData.forEach(dataset => refetchData(dataset)(state)); // jshint ignore:line

                            data[prop] = [...data[prop], createDataset({
                                    metricDataResultsKey: metricDataResultsKey,
                                    metricDataResultsArray: metricDataResultsArray
                                })(backgroundColorProps)(borderColorProps)];

                            console.log(data[prop]);

                            break;

                        }

                    }

                    displayChart.update();

                    const chartModal = document.querySelector('.chart-modal__chart');

                    const modalDisplayChart = new Chart(chartModal.getContext('2d'), {type: 'line', data: Object.create(data) });

                    modalDisplayChart.update();

                    state = setState(state)({

                            displayChart: displayChart,
                            metricDataResultsKey: metricDataResultsKey,
                            metricDataResultsArray: metricDataResultsArray,
                            metricDateResults: metricDateResults,
                        });

                }

            }

        }

    };

    xhr.open('POST', googleAPIPath);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(JSONPackage));

};