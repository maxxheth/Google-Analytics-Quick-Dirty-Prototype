const setStyleProps = menuElem => viewElem => width => marginLeft => {

    menuElem.style.width = width;
    viewElem.style.marginLeft = marginLeft;

};

const menuToggle = menuElem => viewElem => width => marginLeft => {

    menuElem.addEventListener('click', () => {

        setStyleProps(elem)(viewElem)(width)(marginLeft);

    }, false);

};


export const menuEventHandler = menuElem => viewElem => openPropArgs => {

    const closePropArgs = {

        width: 0,
        marginLeft: 0

    };

    let toggle = true;

    const { oWidth, oMarginLeft } = openPropArgs;

    const { cWidth, cMarginLeft } = closePropArgs;

    if (toggle) {

        menuToggle(menuElem)(viewElem)(oWidth)(oMarginLeft);

        toggle = false;

    } else {

        menuToggle(menuElem)(viewElem)(cWidth)(cMarginLeft);

        toggle = true;

    }
  
};