
import { createGAPIRequestObject } from './pipe-gapi-data';

import { fetchData } from './fetch-data';

export const unpackGAPIPayloads = payload => { 

	// Grab the metrics data and date range data from the payload object.

    const { metricsPayload, dateRangePayload } = payload;
	
	/**
	*
	* The createGAPIRequestObject will shape the date range payload for consumption
	* by the Google Analytics Reporting API.
	*
	*/

    const liftedDateRangePropObjects = createGAPIRequestObject(dateRangePayload);
	
	/**
	*
	* The following block of code inflates an array in proportion to the liftedDateRangePropObjects array,
	* which is then passed to the createGAPIRequestObject function to spit out another array that's ready for 
	* Google API consumption.
	*
	* If both lifted array sets are equal in length (which is critical for data accuracy), then 
	* both are fired off via the fetchData function.
	*
	*/

    const metricsPropObjects = [];

    for ( let x = 0; x < liftedDateRangePropObjects.dateArgs.length; x++ ) metricsPropObjects.push(x);

        metricsPropObjects.fill( metricsPayload, 0, liftedDateRangePropObjects.dateArgs.length );

        const liftedMetricsPropObjects = createGAPIRequestObject( metricsPropObjects );

    if ( liftedMetricsPropObjects.metricArgs.length === liftedDateRangePropObjects.dateArgs.length ) {

        fetchData( liftedMetricsPropObjects, liftedDateRangePropObjects );

    }

};