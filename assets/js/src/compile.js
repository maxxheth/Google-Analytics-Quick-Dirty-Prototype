import App from './view.js';

import { mount } from 'redom';

import { fetchData } from './logic/fetch-data';

const app = new App();

app.checkbox.addEventListener('click', () => {

    app.update();

});

mount(document.body, app);

fetchData();