/* global document */

import { el, mount } from 'redom';
import { Panel, panelTitle, ToggleButton } from './view/panel-components';
import { Menu } from './view/menu-components';
import { menuEventHandler } from './events/menu-events';
import { sendGAPIRequests } from './events/gapi-events';
import { preSelectOptions } from './logic/pre-select-options';
import { makeDummyChart } from './data/dummy-chart';
import { prepChartModal } from './events/chart-modal';

const panel = new Panel();

const toggleButton = new ToggleButton();

toggleButton.update('Open', true);

const view = el('article.view', [toggleButton, panelTitle, panel]);

const chartModalChildren = [el('canvas.chart-modal__chart'), el('button.chart-modal__close-button', 'X')];

const chartModal = el('aside.chart-modal__cont', chartModalChildren);

const sidebar = new Menu();

const viewCont = el('div.view-cont', [sidebar, view, ]);

const dashboard = el('main.dashboard', [viewCont, chartModal]);

mount(document.body, dashboard);

menuEventHandler(toggleButton);

preSelectOptions();

// Make dummy chart

const canvasElem = document.querySelector('.panel-chart');

makeDummyChart(canvasElem)('line');

sendGAPIRequests();

const chartToggleButton = document.getElementById('chart-modal-button');

prepChartModal(chartModal)(chartToggleButton);