/* global document */

const setStyleProps = menuElem => viewElem => styleProps => {

    const { width, marginLeft } = styleProps;

    menuElem.style.width = width;
    viewElem.style.marginLeft = marginLeft;

};

const menuToggle = toggleElem => menuElem => viewElem => openPropArgs => {

    const closePropArgs = {

        width: 0,
        marginLeft: 0

    };

    // const panelCardCont = document.querySelector('.panel-card__cont');

    // const panelCardContSelectElems = [...document.querySelectorAll('.panel-card__cont--select')];

    toggleElem.el.addEventListener('click', () => {

        if (toggleElem.toggle) {

            setStyleProps(menuElem)(viewElem)(openPropArgs);

            toggleElem.update('Close', false);

            // panelCardCont.style.width = 'auto';

            // panelCardContSelectElems.forEach(elem => elem.style.width = '60%');

        } else {

            setStyleProps(menuElem)(viewElem)(closePropArgs);
        
            toggleElem.update('Open', true);

            // panelCardCont.style.removeProperty('width');

            // panelCardContSelectElems.forEach(elem => elem.style.removeProperty('width'));

        }
    
    }, false);    

};

export const menuEventHandler = toggleButton => {

    const sideNav = document.querySelector('.sidenav');

    const view = document.querySelector('.view');

    const openToggleProps = {

        width: '25%',
        marginLeft: '25%'

    };

    menuToggle(toggleButton)(sideNav)(view)(openToggleProps);

};