import { el, mount } from 'redom';
import { Panel, panelTitle, ToggleButton } from './view/panel-components';
import { Menu } from './view/menu-components';
import { menuEventHandler } from './events/menu-events';
// import { setDateRange, extrapolateDateRange } from './logic/date-ranges';
// import { dateRangeObj } from './data/date-ranges';

import { sendGAPIRequests } from './events/gapi-events';


const panel = new Panel();

const toggleButton = new ToggleButton();

toggleButton.update('Open', true);

const view = el('article.view', [toggleButton, panelTitle, panel]);

const sidebar = new Menu();

const dashboard = el('main.dashboard', [sidebar, view]);

mount(document.body, dashboard);

menuEventHandler(toggleButton);

sendGAPIRequests();

// const calcDateObj = setDateRange('seven_days')(dateRangeObj);

// const dateRanges = extrapolateDateRange('seven_days')(dateRangeObj)(calcDateObj);

// console.log(dateRanges);