/* global document */

import { createDataset } from "./chart-datasets";

import moment from 'moment';

/**
 * 
 * @param { HTMLDivElement } viewElem 
 * @param { Array } data 
 * 
 */

import { setState } from '../data/state';

let state = [];

export const displayData = data => {

    const { metricDataResultsArray, metricDataResultsKey, metricDateResults } = data;

    const getAverage = numSet => { 
        
        const total = numSet.reduce((acc, num) => acc += Number(num), 0); 
    
        const average = total / numSet.length;

        return Math.floor(average);
    
    }; 


    const metricResultsAverage = getAverage(metricDataResultsArray);

    const printFirstLastDates = dateSet => ({firstDate: dateSet[0], lastDate: dateSet[dateSet.length - 1]});

    // const getTimePeriod = dateSet => {

    //     if (dateSet.length == 1) { 

    //         const today = moment().format('YYYY-MM-DD');
            
    //         return { range: 'Today', dateSet: dateSet };  
        
    //     }

    //     if (dateSet.length == 2) { 
            
    //         return { range: 'Yesterday', dateSet: dateSet }; 
        
    //     }
        
    //     if (dateSet.length <= 7 && dateSet.length > 2) { 
            
    //         return { range: '1 week ago or less', dateSet: dateSet }; 
        
    //     }

    //     if (dateSet.length <= 14 && dateSet.length > 7) { 
            
    //         return { range: '2 weeks ago or less', dateSate: dateSet }; 

    //     }


    //     if (dateSet.length <= 28 && dateSet.length > 14) { 
            
    //         return { range: '4 weeks ago or less', dateSet: dateSet }; 
        
    //     }

    // };

    const firstLastDates = printFirstLastDates(metricDateResults);

    const { firstDate, lastDate } = firstLastDates;

    const metricData = {

        Metric: metricDataResultsKey,
        Average: metricResultsAverage,
        DateRange: `${firstDate} through ${lastDate}`

    };

    state = setState(state)(metricData);

    return state;

    // const timePeriod = 
   
};