import produce from 'immer';

export const state = {prop: ['value']};

export const setState = state => newProps => { 
    
    return produce(state, newState => { newState.push(newProps); }); 

};