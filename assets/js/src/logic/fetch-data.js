import axios from 'axios';

const googleAPIPath = '../../../../fetchgapidata.php';

export const fetchData = () => {

try {

    axios.post(googleAPIPath, {

        dateArgs: [{
            startDate: "15daysAgo",
            endDate: "today"
        },
        {
            startDate: "30daysAgo",
            endDate: "today"
        }],

        metricArgs: [{
            
            expression: "ga:users",
            alias: "users"

        }, 
        {
            expression: "ga:sessions",
            alias: "sessions"
        }],

        dimensionArgs: [{

            name: "ga:sessionCount",

        }, 
        {
            name: "ga:sessionDurationBucket"
        }]

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