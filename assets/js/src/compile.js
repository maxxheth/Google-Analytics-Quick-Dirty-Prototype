import { el, mount } from 'redom';
import { Panel, panelTitle, ToggleButton } from './view/panel';
import { Menu } from './view/menu-components';
import { menuEventHandler } from './events/menu-events';


const panel = new Panel();

const toggleButton = new ToggleButton();

toggleButton.update('Open', true);

const view = el('div.view', [toggleButton, panelTitle, panel]);

const sidebar = new Menu();

const dashboard = el('dashboard', [sidebar, view]);

mount(document.body, dashboard);

menuEventHandler(toggleButton);