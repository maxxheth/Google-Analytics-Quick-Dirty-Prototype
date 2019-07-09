import axios from 'axios';

const googleAPIPath = '../../../../fetchgapidata.php';

export const fetchData = (metricArgsObjects, dateArgsObjects) => { 

try {

    axios.post(googleAPIPath, {

        dateArgs: dateArgsObjects.dateArgs,

        metricArgs: metricArgsObjects.metricArgs,


    })

    .then(response => console.log(response.data))

    .catch(error => console.log(error.data));

    
} catch (error) {
    console.log(error);
}

    
};