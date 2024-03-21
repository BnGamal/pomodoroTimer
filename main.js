



const userPattern = { // click
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
let data = [];

let IdCounter = -1;
const digitsLength = [24, 60, 60];

const screensContainer = document.getElementById('screens-container');
const pullUpMenu = document.getElementById('pull-up-menu');
const pullUpMenuBtn = document.getElementById('pull-up-menu-btn');
const menuItemsContainer = document.querySelector('.menu-items-container');
const menuItems = document.querySelector('.menu-items')
const prompt = document.querySelector('.prompt');
const addTimerButton = document.querySelector('#add-timer');
const daysInputEle = document.getElementById('days');
const hoursInputEle = document.getElementById('hours');
const minutesInputEle = document.getElementById('minutes');
const secondsInputEle = document.getElementById('seconds');

pullUpMenuBtn.addEventListener('click', () => {
	pullUpMenu.classList.toggle('move-menu');
	pullUpMenuBtn.classList.toggle('move-button');
});
addTimerButton.addEventListener('click', () => {
	showPrompt(this);
	scrollTimers();
})
hoursInputEle.oninput = () => {
    validateInput(this, digitsLength[0]);
};
minutesInputEle.oninput = () => {
    validateInput(this, digitsLength[1]);
};
secondsInputEle.oninput = () => {
    validateInput(this, digitsLength[2]);
};

// getScree + add flip/highlight
function getScreen(obj) {
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
				screen.classList.add('screen-highlighted');
			}, 15)
		}
	}
}

function clearScreens() {
	const allScreens = document.querySelectorAll('span');
	for (screen of allScreens) {
		if (screen.classList.contains('flip'));
		screen.classList.remove('flip', 'screen-highlighted');
	}
}

function scrollTimers() {
	menuItemsContainer.scrollTop = menuItems.scrollHeight;
}

function showPrompt() {
	addTimerButton.style.display = 'none';
	prompt.style.display = 'block';
}

function hidePrompt() {
	addTimerButton.style.display = 'block';
	prompt.style.display = 'none';
}

function validateInput(element, limit) {
	value = element.value;
    if (value > limit) {
    	errorInputNotValid(element.id, limit);
    	element.value = '';	
    }
}

function errorInputNotValid(id, limit) {
	alert(`The Max # of ${id} is ${limit}`)
}

function storeInputsValues() {
	const daysValue = isNaN(parseInt(daysInputEle.value)) ? 0 : parseInt(daysInputEle.value);
	const hoursValue = isNaN(parseInt(hoursInputEle.value)) ? 0 : parseInt(hoursInputEle.value);
	const minutesValue = isNaN(parseInt(minutesInputEle.value)) ? 0 : parseInt(minutesInputEle.value);
	const secondsValue = isNaN(parseInt(secondsInputEle.value)) ? 0 : parseInt(secondsInputEle.value);

	return [daysValue, hoursValue, minutesValue, secondsValue];
}

function clearPromptValues() {
	const allInputs = prompt.querySelectorAll('input');
	for (let i = 0; i < allInputs.length; i++) {
		allInputs[i].value = '';
	}
}

function createBoilerplate(days, hours, minutes, seconds, id) {
    // Create timer element
    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.setAttribute('id', `timer${id}`);

    // Create days block
    const daysBlock = document.createElement('div');
    daysBlock.classList.add('time-block', 'days-block');

    const daysTitle = document.createElement('h2');
    daysTitle.classList.add('timer-title');
    daysTitle.textContent = 'days';

    const daysDigit = document.createElement('span');
    daysDigit.classList.add('timer-digit');
    daysDigit.textContent = days;

    daysBlock.appendChild(daysTitle);
    daysBlock.appendChild(daysDigit);

    // Create hours block
    const hoursBlock = document.createElement('div');
    hoursBlock.classList.add('time-block');

    const hoursTitle = document.createElement('h2');
    hoursTitle.classList.add('timer-title');
    hoursTitle.textContent = 'hr';

    const hoursDigit = document.createElement('span');
    hoursDigit.classList.add('timer-digit');
    hoursDigit.textContent = hours;

    hoursBlock.appendChild(hoursTitle);
    hoursBlock.appendChild(hoursDigit);

    // Create minutes block
    const minutesBlock = document.createElement('div');
    minutesBlock.classList.add('time-block');

    const minutesTitle = document.createElement('h2');
    minutesTitle.classList.add('timer-title');
    minutesTitle.textContent = 'min';

    const minutesDigit = document.createElement('span');
    minutesDigit.classList.add('timer-digit');
    minutesDigit.textContent = minutes;

    minutesBlock.appendChild(minutesTitle);
    minutesBlock.appendChild(minutesDigit);

    // Create seconds block
    const secondsBlock = document.createElement('div');
    secondsBlock.classList.add('time-block');

    const secondsTitle = document.createElement('h2');
    secondsTitle.classList.add('timer-title');
    secondsTitle.textContent = 'sec';

    const secondsDigit = document.createElement('span');
    secondsDigit.classList.add('timer-digit');
    secondsDigit.textContent = seconds;

    secondsBlock.appendChild(secondsTitle);
    secondsBlock.appendChild(secondsDigit);

    // Append blocks to timer
    timer.appendChild(daysBlock);
    timer.appendChild(hoursBlock);
    timer.appendChild(minutesBlock);
    timer.appendChild(secondsBlock);

    return timer;
}

function appendBoilerPlate(element) {
	menuItems.insertBefore(element, prompt);
}

function addTimerToData(id, days, hours, minutes, seconds) {
	data[id] = {};
	data[id].counters = [days, hours, minutes, seconds];
	data[id].finished = false;
}

function confirmPrompt() {
	IdCounter ++;
	const [days, hours, minutes, seconds] = storeInputsValues();
	clearPromptValues();
	const element = createBoilerplate(days, hours, minutes, seconds, IdCounter);
	appendBoilerPlate(element);
	addTimerToData(IdCounter, days, hours, minutes, seconds);
	hidePrompt();
	scrollTimers();
}

function rejectPrompt() {
	hidePrompt();
	clearPromptValues();
}

function updateTimers() {
	for (let i = 0; i < data.length; i++) {
		const timer = data[i];
		if (!timer.finished) {
			const seconds = timer.counters[digitsLength.length];
			if (seconds === 0) {
				borrowTime(timer, digitsLength.length);
			} else {
				timer.counters[3]--;
			}
		}
	}
}

function borrowTime(timer, currentDigitIndex) {
	const biggerDigitIndex = currentDigitIndex - 1;
	if (biggerDigitIndex === 0 && timer.counters[0] === 0) {
		timerFinished(timer);
	}
	else if (timer.counters[biggerDigitIndex] > 0) {
		timer.counters[biggerDigitIndex]--;
		for (let i = biggerDigitIndex + 1; i <= digitsLength.length; i++) {
			timer.counters[i] = digitsLength[i - 1] - 1;
		}
	} else {
		borrowTime(timer, biggerDigitIndex);
	}

}

function timerFinished(timer) {
	timer.finished = true;
	console.log(timer);
}

function redisplayTimers() {
	deleteTimers();
	displayTimers();
}

function deleteTimers() {
	Array.from(menuItems.children).forEach(child => {
	    if (child.id.match(/^timer\d+$/)) {
	        menuItems.removeChild(child);
	    	// console.log(child);
	    }
	});
}

function displayTimers() {
	for (let i = 0; i < data.length; i++) {
		const days = data[i].counters[0];
		const hours = data[i].counters[1];
		const minutes = data[i].counters[2];
		const seconds = data[i].counters[3];
		const element = createBoilerplate(days, hours, minutes, seconds, i);
		appendBoilerPlate(element);
	}
}

// run when the script is loaded
getScreen(userPattern);

// second by second change
setInterval(function() {
	updateTimers();
	redisplayTimers();
}, 1000);