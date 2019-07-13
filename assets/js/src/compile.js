/* global document */

import { el, mount } from 'redom';
import { Panel, panelTitle, ToggleButton } from './view/panel-components';
import { Menu } from './view/menu-components';
import { menuEventHandler } from './events/menu-events';
import { sendGAPIRequests } from './events/gapi-events';
import { preSelectOptions } from './logic/pre-select-options';


const panel = new Panel();

const toggleButton = new ToggleButton();

toggleButton.update('Open', true);

const view = el('article.view', [toggleButton, panelTitle, panel]);

const sidebar = new Menu();

const dashboard = el('main.dashboard', [sidebar, view]);

mount(document.body, dashboard);

menuEventHandler(toggleButton);

preSelectOptions();

sendGAPIRequests();