import {checkType} from '../helper-funcs/checktype';

export const getMetricResultDates = dateArgsArray => {

    dateArgsArray = [...dateArgsArray];

    const results = dateArgsArray.reduce( ( acc, curr, currIndex, array ) => {

        if ( currIndex >= array.length - 2 ) return;

        const { startDate } = curr;

        if (checkType(acc) !== 'array') {

            acc = [];

        } else {

            try {
                acc.push(startDate);
            } catch (error) {
              console.log(error);   
            }
        }

        return acc;

    }, []);

    return results;

};