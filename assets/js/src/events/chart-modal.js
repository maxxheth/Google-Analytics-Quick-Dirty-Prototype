export const prepChartModal = chartModal => chartModalButton => {

    if (!chartModal || !chartModalButton) return;

    let doShowModal = true;

    chartModalButton.addEventListener('click', e => {

        if (doShowModal)  {

            chartModal.classList.add('chart-modal__toggle');

            e.currentTarget.textContent = 'Shrink Chart';

            doShowModal = false;

        } else {

            chartModal.classList.remove('chart-modal__toggle');

            e.currentTarget.textContent = 'Expand Chart';

            doShowModal = true;

        }

    }, false);

};