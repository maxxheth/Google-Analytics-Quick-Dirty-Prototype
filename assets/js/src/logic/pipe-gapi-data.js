/**
 * The idea is to take a raw object (or several) with two properties,
 * pipe them through one of three functions that'll assign a unique property name
 * to each pair, and then combine all pairs into an object by mapping multiple pairs
 * with the same property name to an array under said property name.
 * 
 * The object will then be sent to a PHP script via an AJAX POST request that'll 
 * then unpack the data in each request object, 
 * reformat it for proper consumption by the Google Analytics Reporting API, 
 * pipe it to the Google Analytics Reporting API, and return a object containing 
 * the requested metric categories and associated data.  
 * 
 * 
 */

import { checkType } from '../../src/helper-funcs/checktype';

/**
 * @function setMetrics
 *  
 * This function takes two arguments and returns an object with the property name "metricArgs".
 * The goal of this function is to return an object with a parent property that contains two child properties.
 * 
 * The first property is a expression that corresponds with a Google Analytics metric property (e.g, "ga:sessions")
 * 
 * The second property is an alias of that expression. Thus, "ga:session" can simply be expressed as "session" per the alias property. 
 * 
 * @param { string } expression | A metric such as "ga:sessions" is inserted as an argument.
 * @param { string } alias | A shorthand way to refer to the expression.
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
 * @param { callback }
 * 
 * @param { dataPropPairs } | This makes use of the rest syntax to allow as many
 * data objects to be inserted as possible.
 * 
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