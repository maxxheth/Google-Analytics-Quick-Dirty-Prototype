import { el } from 'redom';

class MenuListItem {

    constructor(title, link) {

        this.el = el('li', 
        
            this.el = el('h3', el('a', title, { href: link } ) )

        );

    }

}

class MenuList {

    constructor() {

        this.el = el('ul', 
        
            this.el = new MenuListItem('Menu Item 01', '#'),
            this.el = new MenuListItem('Menu Item 02', '#'),
            this.el = new MenuListItem('Menu Item 03', '#'),
            this.el = new MenuListItem('Menu Item 04', '#')
            
        );

    }

}

export class Menu {

    constructor() {

        this.el = el('aside.sidenav',

            this.el = new MenuList()

        );

    } 

}