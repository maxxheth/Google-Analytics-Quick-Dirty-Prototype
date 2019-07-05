import { el } from 'redom';

const styles = {

    'color' : 'red',
    'text-decoration' : 'underline',
    'font-style' : 'normal',
    'font-weight' : '600'

};

const styles2 = {

    'color' : 'blue',
    'font-style' : 'italic',
    'font-weight' : '400',
    'text-decoration' : 'none'

};

class Hello {

    constructor() {
        this.el = el('h1', 'Wazzup Motherfuckers!', { class: 'hello'});
    }

   

}

class App {
    
    constructor() {

        this.el = el('app', 

            this.hello = new Hello(), 
            this.checkbox = el('input', { type: 'checkbox'})

        );

        this.toggleStyles = false;

        this.update.bind(this);
    }

    toggle(bool) {

        bool = !bool;
        
        return bool;
 
    }

    update() {

        console.log(this.hello);

        
        if (this.toggleStyles) {

            Object.keys(styles).forEach(styleProp => this.hello.el.style[styleProp] = styles[styleProp]); 

            this.toggleStyles = !this.toggleStyles;

        } else {

            Object.keys(styles2).forEach(styleProp => this.hello.el.style[styleProp] = styles2[styleProp]); 

            this.toggleStyles = !this.toggleStyles;

        }

    }

}

export default App;