/* global document */

export const prepChartModal = chartModal => chartModalButton => {

    if (!chartModal || !chartModalButton) return;

    let doShowModal = true;

    const viewCont = document.querySelector('.view-cont');

    viewCont.style.transition = '0.2s all ease-in-out';

    const innerModalButton = document.querySelector('.chart-modal__close-button');

    const buttons = [chartModalButton, innerModalButton];

    document.addEventListener('click', e => {

        if (e.target === buttons[0] || e.target === buttons[1]) {

            if (doShowModal)  {

                chartModal.classList.add('chart-modal__toggle');

                chartModalButton.textContent = 'Close Chart';

                doShowModal = false;

                viewCont.style.opacity = '0.2';

            } else {

                chartModal.classList.remove('chart-modal__toggle');

                chartModalButton.textContent = 'Open Chart';

                doShowModal = true;

                viewCont.style.opacity = '1';

            }

        }

    }, false);

};