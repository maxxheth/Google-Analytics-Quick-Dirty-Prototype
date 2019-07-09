import { createGAPIRequestObject } from './pipe-gapi-data';

import { fetchData } from './fetch-data';

export const unpackGAPIPayloads = payload => {

    const { metricsPayload, dateRangePayload } = payload;

    const liftedDateRangePropObjects = createGAPIRequestObject(dateRangePayload);

    const metricsPropObjects = [];

    for (let x = 0; x < liftedDateRangePropObjects.dateArgs.length; x++) metricsPropObjects.push(x);

    metricsPropObjects.fill(metricsPayload, 0, liftedDateRangePropObjects.dateArgs.length);

    const liftedMetricsPropObjects = createGAPIRequestObject(metricsPropObjects);

    if (liftedMetricsPropObjects.metricArgs.length === liftedDateRangePropObjects.dateArgs.length) {

        fetchData(liftedMetricsPropObjects, liftedDateRangePropObjects);

    }

};