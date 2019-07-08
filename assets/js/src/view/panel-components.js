import { el } from 'redom';

import { GAOptions } from '../data/gapi-options';

import { createOptionComponents } from '../helper-funcs/component-helpers';

export const panelTitle = el('h1.panel__title', "Analytics Dashboard");

export class ToggleButton {

    constructor() {

        this.el = el('button.toggle');
        this.toggle = true;

    }

    update(text, toggle) {

        this.el.textContent = text;
        this.toggle = toggle; 

    }

}

export class PanelOptionComponent {

    constructor(value, text) {

        this.el = el('option.panel__option', text, { value: value });

    }

}

class PanelSelectComponent {

    constructor(options) {

        this.el = el('select.panel__select', 
        
            createOptionComponents(options)
        
                .map(newOptComp => this.el = newOptComp)
                
        );

    }

}

export class PanelGAPIForm {

    constructor(options) {

        this.el = el('form.panel__form', 
        
            this.el = new PanelSelectComponent(options)

        );

    }

}

class PanelCard {

    constructor(title = "title", content = "content", options) {

        this.el = el('panel-card.uk-card.uk-card-body.uk-card-primary',

            this.PanelCardTitle = el('h3.panel-card__title.uk-card-title', title),
            this.PanelGAPIForm = new PanelGAPIForm(options),
            this.PanelCardContent = el('p.panel-card__content', content)

        );

    }

}

export class Panel {

    constructor() {

        this.el = el('panel.panel.uk-grid',

            this.panelCard_01 = new PanelCard("Card Title 01", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", GAOptions),
            this.panelCard_02 = new PanelCard("Card Title 02", "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque", GAOptions),
            this.panelCard_03 = new PanelCard("Card Title 03", "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur", GAOptions),
            this.panelCard_04 = new PanelCard("Card Title 04", "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus", GAOptions)

        );

    }

}