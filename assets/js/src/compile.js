import { el, mount } from 'redom';
import { Panel, panelTitle } from './view/panel';

const panel = new Panel();

const view = el('view', [panelTitle, panel]);

const sidebar = el('sidebar');

const dashboard = el('dashboard', [view, sidebar]);

mount(document.body, view); 