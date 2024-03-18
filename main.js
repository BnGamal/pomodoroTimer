



const firstShape = { // click
	"2": [1,3,5],
	"3": [2,3,4],
	"4": [1,2,4,5],
	"5": [2,3,4],
	"6": [1,3,5],};

const bluePrints = [
{ // 0
	"1": [2,3,4],
	"2": [1,5],
	"3": [1,5],
	"4": [1,5],
	"5": [1,5],
	"6": [1,5],
	"7": [2,3,4]
},
{ // 1
	"1": [3],
	"2": [2,3],
	"3": [3],
	"4": [3],
	"5": [3],
	"6": [3],
	"7": [2,3,4]
},
{ // 2
	"1": [2,3,4],
	"2": [1,5],
	"3": [5],
	"4": [4],
	"5": [3],
	"6": [2],
	"7": [1,2,3,4,5]
},
{ // 3
	"1": [2,3,4],
	"2": [1,5],
	"3": [5],
	"4": [2,3,4],
	"5": [5],
	"6": [1,5],
	"7": [2,3,4]
},
{ // 4
	"1": [3,4],
	"2": [2,4],
	"3": [1,4],
	"4": [1,2,3,4,5],
	"5": [4],
	"6": [4],
	"7": [4]
},
{ // 5
	"1": [1,2,3,4,5],
	"2": [1],
	"3": [1,2,3,4],
	"4": [5],
	"5": [5],
	"6": [1,5],
	"7": [2,3,4]
},
{ // 6
	"1": [2,3,4],
	"2": [1,5],
	"3": [1],
	"4": [1,2,3,4],
	"5": [1,5],
	"6": [1,5],
	"7": [2,3,4]
},
{ // 7
	"1": [1,2,3,4,5],
	"2": [5],
	"3": [4],
	"4": [3],
	"5": [3],
	"6": [3],
	"7": [3]
},
{ // 8
	"1": [2,3,4],
	"2": [1,5],
	"3": [1,5],
	"4": [2,3,4],
	"5": [1,5],
	"6": [1,5],
	"7": [2,3,4]
},
{ // 9
	"1": [2,3,4],
	"2": [1,5],
	"3": [1,5],
	"4": [2,3,4,5],
	"5": [5],
	"6": [1,5],
	"7": [2,3,4]
}];

const screensContainer = document.getElementById('screens-container');

function getPairs(obj) {
	keys = Object.keys(obj);
	for (const yCoordinate of keys) {
		xCoordinates = obj[yCoordinate];
		for (const xCoordinate  of xCoordinates) {
			const id = (Number(yCoordinate) *  7) + xCoordinate + 1;
			const screen = screensContainer.querySelector('#screen' + id);
			setTimeout(function() {
				screen.classList.add('flip');
			}, 10);
			setTimeout(function() {
				screen.classList.add('color');
			}, 15)
		}
	}
}

function clearScreens() {
	const allScreens = document.querySelectorAll('span');
	for (screen of allScreens) {
		if (screen.classList.contains('flip'));
		screen.classList.remove('flip', 'color');
	}
}

const pullUpMenu = document.getElementById('pull-up-menu');
const pullUpMenuBtn = document.getElementById('pull-up-menu-btn');

pullUpMenuBtn.addEventListener('click', function() {
	pullUpMenu.classList.toggle('move-menu');
	pullUpMenuBtn.classList.toggle('move-button');
});

getPairs(firstShape);