import axios from 'axios';

const googleAPIPath = '../../../../fetchgapidata.php';

// import { getMetricProps } from './logic/metric_props';

// const metricProps = getMetricProps().map(prop => ({

//     expression: prop,
//     alias: prop.slice(3, prop.length)

// })); 

// const dateParamsArray = [];

// const defaultDateParams = {
//     startDate: "30daysAgo",
//     endDate: "today",
// };

// for (let x = 0; x < 504; x++) {

//     dateParamsArray.push(defaultDateParams);

// }

export const fetchData = () => {

try {

    axios.post(googleAPIPath, {

        dateArgs: [{
            startDate: "30daysAgo",
            endDate: "today"
        }],

        /**
         * 
         * Add metrics and dimension args as well.
         * 
         */


        // dateParams: [{
        //     startDate: "30daysAgo",
        //     endDate: "today",
        // },
        // {
        //     startDate: "2018-07-05",
        //     endDate: "30daysago",
        // }],

        // dateParams: [...dateParamsArray],

        // GAPIParams: [{
        //     expression: "ga:uniquePageViews",
        //     alias: "uniquePageViews"
        // }, 
        // {
        //     expression: "ga:sessionCount",
        //     alias: "sessionCount"
        // }]
        
        // metricParams: [...metricProps]

    })

    .then(response => console.log(response.data))

    .catch(error => console.log(error.data));

    
} catch (error) {
    console.log(error);
}

    
};