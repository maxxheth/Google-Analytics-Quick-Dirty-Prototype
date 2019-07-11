/* global document */

import  { setMetrics, setDates } from '../logic/pipe-gapi-data';
import { dateRangeObject } from '../data/date-ranges';
import { setDateRange, extrapolateDateRange } from '../logic/date-ranges';
import { unpackGAPIPayloads } from '../logic/unpack-gapi-payloads';

export const sendGAPIRequests = () => {

    document.addEventListener('submit', event => {

        event.preventDefault();

        if (!event.target.matches('.panel-card__form')) return;

        const selectElems = [...event.target.querySelectorAll('select')];

        const gaSelectElem = selectElems.filter(elem => elem.dataset.selectType === 'ga-options')[0];
        
        const dateSelectElem = selectElems.filter(elem => elem.dataset.selectType === 'date-range-options')[0];

        const gaProps = {

            value: gaSelectElem[gaSelectElem.selectedIndex].value,
            text: gaSelectElem[gaSelectElem.selectedIndex].textContent

        };

        const selectedDateRange = dateSelectElem.value;

        const calcDateObject = setDateRange(selectedDateRange)(dateRangeObject);

        const dateRanges = extrapolateDateRange(selectedDateRange)(dateRangeObject)(calcDateObject);

        const dateRangePairs = dateRanges.map((dateRange, dateRangeIndex, dateRangeArray) => {

            return setDates(dateRange)(dateRangeArray[dateRangeIndex + 1]);

        });

        const dateRangesLastIndex = dateRangePairs.length - 1;

        const lastStartDate = dateRangePairs[dateRangesLastIndex].dateArgs[0].startDate;

        dateRangePairs[dateRangesLastIndex].dateArgs[0].endDate = lastStartDate;

        const metricsPayload = setMetrics(gaProps.value)(gaProps.text.toLowerCase());

        const GAPIDataPayloads = {

            metricsPayload: metricsPayload, 
            dateRangePayload: dateRangePairs

        };

        unpackGAPIPayloads(GAPIDataPayloads);

    });

};