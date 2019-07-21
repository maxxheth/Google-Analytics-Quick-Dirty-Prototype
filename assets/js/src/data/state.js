import produce from 'immer';

/**
*
* This allows for very basic state management via immer.js, 
* which is useful for updating the data chart based off of the 
* latest Chart.js instance.
*
* @param  {Object} state
* @param {Object} newState
*
*/

import { checkType } from '../helper-funcs/checktype';

export const state = {prop: ['value']};

export const setState = state => newProps => {
    
    return produce(state, newState => { 

        if (newState !== undefined && checkType(newState) === 'array') {

            newState.push(newProps); 

        }

    });  

};