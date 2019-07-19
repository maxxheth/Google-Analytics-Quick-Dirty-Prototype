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

    toggleElem.el.addEventListener('click', () => {

        if (toggleElem.toggle) {

            setStyleProps(menuElem)(viewElem)(openPropArgs);

            toggleElem.update('Close', false);


        } else {

            setStyleProps(menuElem)(viewElem)(closePropArgs);
        
            toggleElem.update('Open', true);

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