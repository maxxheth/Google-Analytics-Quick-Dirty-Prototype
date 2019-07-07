import { el } from 'redom';


export const panelTitle = el('h1.panel__title', "Analytics Dashboard");

class PanelCard {

    constructor(title = "title", content = "content") {
        this.el = el('panel-card.uk-card.uk-card-body.uk-card-primary',
            this.PanelCardTitle = el('h3.panel-card__title.uk-card-title', title),
            this.PanelCardContent = el('p.panel-card__content', content)
        );
    }

}

export class Panel {
    constructor() {

        this.el = el('panel.panel.uk-grid',

            this.panelCard_01 = new PanelCard("Card Title 01", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"),
            this.panelCard_02 = new PanelCard("Card Title 02", "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque"),
            this.panelCard_03 = new PanelCard("Card Title 03", "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur"),
            this.panelCard_04 = new PanelCard("Card Title 04", "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus")

        );
    }

}