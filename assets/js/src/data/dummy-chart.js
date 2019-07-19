/* global window */

import Chart from 'chart.js';

const pad = num => num < 10 ? '0' + num : num;

const makeFakeDate = () => {
	
	const date = new Date();
	
	const year = date.getFullYear();
	
	const month = pad(date.getMonth() + 1);
	
	const day = date.getDate();
	
	return `${year}-${month}-${day}`;
	
};

export const makeDummyChart = chartElem => type => {
	
	const winWidth = window.clientWidth;
	
	// const winHeight = window.clientHeight;
	

	
	// chartElem.style.height = 500 + 'px';
	
	// chartElem.style.backgroundColor = '#fff';
	
	// chartElem.style.maxHeight = 500 + 'px';
	
	//const labelVertArr = [makeFakeDate()];
	
	const labelName = 'users';

	chartElem.dataset.dummy = 1;
	
	//for (let x = 0; x <= 10; x++) labelVertArr.push(toString(x));
	
	const chartInstance = new Chart(chartElem.getContext('2d'), {
		
		type: type,
		
		data: {
			
			labels: [makeFakeDate()],
			
			datasets: [{
				
				label: 'Users',
			
				data: [0, 100],
				
				backgroundColor: ['rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'],
				
				borderColor: []
				
			}]
			
		},
		
		/*options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}*/

		options: {

			responsive: true,
			maintainAspectRatio: false

			// onResize: () => {

			// 	this.update();

			// }

		}
		
	});
	
	return chartInstance;
};