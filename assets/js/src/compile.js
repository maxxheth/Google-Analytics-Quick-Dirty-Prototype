import App from './view.js';

import { mount } from 'redom';

import { fetchData } from './logic/fetch-data';



const app = new App();

app.checkbox.addEventListener('click', () => {

    app.update();

});

mount(document.body, app);

fetchData();

// const gaProps = getGAProps();

// const GAPIPropObj = gaProps.map(prop => ({

//     expression: prop,
//     alias: prop.slice(3, prop.length)

// })); 

// console.log(GAPIPropObj);