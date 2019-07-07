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


    })

    .then(response => console.log(response.data))

    .catch(error => console.log(error.data));

    
} catch (error) {
    console.log(error);
}

    
};