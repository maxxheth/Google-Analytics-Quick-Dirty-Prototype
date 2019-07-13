/* global document */

export const preSelectOptions = () => {

    const gaOptionSelectElems = [...document.querySelectorAll('.panel-card__select')]

    .filter(selectElem => selectElem.dataset.selectType === 'ga-options');

    gaOptionSelectElems.forEach((selectElem, selectElemIndex) => {

        if (selectElemIndex > 0)[...selectElem.childNodes][selectElemIndex].setAttribute('selected', true);

    });

};