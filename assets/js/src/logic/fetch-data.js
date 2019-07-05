import axios from 'axios';

const googleAPIPath = '../../../../fetchgapidata.php';

axios.post(googleAPIPath, {

    dataParams: {
        startDate: "30daysAgo",
        endDate: "today",
    },

    GAPIParams: {

        expression: "ga:uniquePageViews",
        alias: "uniquePageViews"

    }
    

})

.then(response => console.log(response))

.catch(error => console.log(error));