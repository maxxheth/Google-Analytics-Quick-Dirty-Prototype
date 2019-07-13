import { el } from 'redom';

import { GAOptions } from '../data/gapi-options';

import { dateRangeOptions } from '../data/date-ranges';

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

        this.el = el('option.panel-card__option', text, { value: value });

    }

}

class PanelSelectComponent {

    constructor(options, selectType) {

        this.el = el('select.panel-card__select', { dataset: { selectType: selectType }}, 
        
            createOptionComponents(options)
        
                .map(newOptComp => this.el = newOptComp)
                
        );

    }

}

// class PanelSelectDateComponent {

//     constructor(options, selectType) {

//         this.el = el('select.panel-card__select', { dataset: { selectType: selectType }}, 
        
//             new PanelOptionComponent(options)
                
//         );

//     }

// }

// class PanelFetchDataComponent {

//     constructor() {
//         this.el = el('b')
//     }

// }

export class PanelGAPIForm {

    constructor() {

        this.el = el('form.panel-card__form', 
        
            this.el = new PanelSelectComponent(GAOptions, 'ga-options'),
            this.el = new PanelSelectComponent(dateRangeOptions, 'date-range-options'),
            this.el = el('input.panel-card__submit', {type: "submit", value: "Fetch Data"})

        );

    }

    

}

class PanelCard {

    constructor(title = "title", content = "content") {

        this.el = el('panel-card.uk-card.uk-card-body.uk-card-primary',

            this.PanelCardTitle = el('h3.panel-card__title.uk-card-title', title),
            this.panelChartArea = el('canvas#panel-chart'),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            new PanelGAPIForm(),
            this.PanelCardContent = el('p.panel-card__content', content)

        );

    }

}

export class Panel {

    constructor() {

        this.el = el('panel.panel.uk-grid',

            this.panelCard_01 = new PanelCard("Card Title 01", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium")

        );

    }

}