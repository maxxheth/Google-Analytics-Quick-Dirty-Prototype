import { checkType } from '../../src/helper-funcs/checktype';

/**
 * @function setMetrics
 *  
 * 1. This function takes two arguments and returns an object with the property name "metricArgs".
 * The goal of this function is to provide a way to   
 * 
 * @param { string } expression || A metric such as "ga:sessions" is inserted as an argument.
 * @param { string } alias || A shorthand way to refer to the expression.
 * 
 *   
 */

export const setMetrics = expression => alias => ( { metricArgs: [ { expression, alias } ] });

export const setDates = startDate => endDate => ( { dateArgs: [ { startDate, endDate } ] } );

export const setDimensions = name => histoGram => ( { dimensionArgs: [ { name, histoGram } ] });


/**
 * 
 * @function pipeDataPropPairs
 * 
 * @param dataPropPairs | This makes use of the rest syntax to allow as many
 * data objects to be inserted as possible.
 * 
 * The idea is to take a raw object (or several) with two properties,
 * pipe them through one of three functions that'll assign a unique property name
 * to each pair, and then combine all pairs into an object by mapping multiple pairs
 * with the same property name to an array under said property name.
 * 
 * The object will then be piped to the PHP script that'll 
 * then unpack the data under each property name, pipe it to the Google Analytics API services, and
 * return a object containing the requested metric categories and data.
 * 
 */

export const pipeDataPropPairs = callback => (...dataPropPairs) =>  {

    const namedPropPair = dataPropPairs.map(propPair => {

        const firstProp = Object.keys(propPair)[0];
    
        const secondProp = Object.keys(propPair)[1];

        return callback(propPair[firstProp])(propPair[secondProp]);

    });

    return namedPropPair;

};

export const createGAPIRequestObject = (...props) => {

    const newPropObj = props.reduce((acc, currProp) => {

        let propKey = Object.keys(currProp)[0];

        if (checkType(acc[propKey]) !== 'array') {

            acc[propKey] = [];

        }

        acc[propKey].push(Object.values(currProp)[0][0]);

        return acc;

    }, {});

    return newPropObj;

};