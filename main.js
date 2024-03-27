


// landing related
const userPattern = { // click
	"2": [1,3,5],
	"3": [2,3,4],
	"4": [1,2,4,5],
	"5": [2,3,4],
	"6": [1,3,5]
};
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
}
];

let firstChange = true;
let currentChosenTimer = null;

const landingPage = document.querySelector('.landing')
const screensContainer = document.getElementById('screens-container');
const landingReminder = document.querySelector('.landing-reminder');
const totalSecondsContainer = document.querySelector('.total-seconds-container');
const tensSecondsContainer = document.querySelector('#tens-seconds');
const onesSecondsContainer = document.querySelector('#ones-seconds');
const landingTimer = document.getElementById('landing-timer');
const landingText = document.querySelector('.text');


function getScreen(obj, screensContainer) {
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
function clearScreens(container) {
	const allScreens = container.querySelectorAll('span');
	for (screen of allScreens) {
		if (screen.classList.contains('flip'));
		screen.classList.remove('flip', 'screen-highlighted');
	}
}
function changeLandingOpacity() {
	landingPage.classList.toggle('half-opacity')
}
function changeLandingLayout() {
	landingReminder.style.display = 'block';
	screensContainer.style.display = 'none';
	totalSecondsContainer.style.display = 'grid';
	landingTimer.style.display = 'grid';
	landingText.style.display = 'none';
}
function selectTimerForLanding() {
	// landingPage.appendChild(currentChosenTimer);
}

// pull up menu related
let data = [];
let backUp = []; // counters only

const digitsLength = [24, 60, 60];

let timerId = -1;
let updating = false;
let currentPrompt = null;
let currentEditedTimer = null;

const pullUpMenu = document.getElementById('pull-up-menu');
const pullUpMenuBtn = document.getElementById('pull-up-menu-btn');
const menuItemsContainer = document.querySelector('.menu-items-container');
const menuItems = document.querySelector('.menu-items')
const addTimerButton = document.querySelector('#add-timer');

pullUpMenuBtn.addEventListener('click', () => {
	changeLandingOpacity();
	pullUpMenu.classList.toggle('move-menu');
	pullUpMenuBtn.classList.toggle('move-button');
});
addTimerButton.addEventListener('click', () => {
	const prompt = generatePrompt();
	currentPrompt = prompt;
	insertPrompt(prompt);
})
// Elements generators
function generateTimer(id, days, hours, minutes, seconds, paused) {
    // Create timer element
    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.setAttribute('id', `timer${id}`);
	// new code
	timer.setAttribute('onclick', 'checkClick(event, this)');

    // Create days block
    const daysBlock = document.createElement('div');
    daysBlock.classList.add('time-block', 'days-block');

    const daysTitle = document.createElement('h2');
    daysTitle.classList.add('timer-title');
    daysTitle.textContent = 'days';

    const daysDigit = document.createElement('span');
    daysDigit.classList.add('timer-digit', 'days-digit');
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
    hoursDigit.classList.add('timer-digit', 'hours-digit');
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
    minutesDigit.classList.add('timer-digit', 'minutes-digit');
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
    secondsDigit.classList.add('timer-digit', 'seconds-digit');
    secondsDigit.textContent = seconds;

    secondsBlock.appendChild(secondsTitle);
    secondsBlock.appendChild(secondsDigit);

    //create buttons block
    const buttons = document.createElement('div');
    buttons.classList.add('timer-buttons');

	// Create buttons
	const restartButton = document.createElement('button');
	const pauseContinueButton = document.createElement('button');
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	// set event attributes
	restartButton.setAttribute('onclick', "restartTimer(this.closest('div.timer'))");
	if (paused) {
		pauseContinueButton.setAttribute('onclick', "continueTimer(this.closest('div.timer'))");
	} else {
		pauseContinueButton.setAttribute('onclick', "pauseTimer(this.closest('div.timer'))");
	}
	editButton.setAttribute('onclick', "editTimer(this.closest('div.timer'))")
	deleteButton.setAttribute('onclick', "deleteTimer(this.closest('div.timer'))");

	restartButton.id = 'restart-button';
	pauseContinueButton.id = 'pause-continue-button';
	editButton.id = 'edit-button';
	deleteButton.id = 'delete-button';

	// Create spans for icon text
	const restartIcon = document.createElement('span');
	restartIcon.classList.add('material-symbols-outlined');
	restartIcon.textContent = 'restart_alt';

	const pauseContinueIcon = document.createElement('span');
	pauseContinueIcon.classList.add('material-symbols-outlined');

	if (paused) {
		pauseContinueIcon.textContent = 'play_arrow';
	} else {
		pauseContinueIcon.textContent = 'pause';
	}

	const editIcon = document.createElement('span');
	editIcon.classList.add('material-symbols-outlined');
	editIcon.textContent = 'edit';

	const deleteIcon = document.createElement('span');
	deleteIcon.classList.add('material-symbols-outlined');
	deleteIcon.textContent = 'delete';

	// Append icons to buttons
	restartButton.appendChild(restartIcon);
	pauseContinueButton.appendChild(pauseContinueIcon);
	editButton.appendChild(editIcon);
	deleteButton.appendChild(deleteIcon);


    buttons.appendChild(restartButton);
    buttons.appendChild(pauseContinueButton);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    // Append blocks to timer
    timer.appendChild(daysBlock);
    timer.appendChild(hoursBlock);
    timer.appendChild(minutesBlock);
    timer.appendChild(secondsBlock);
    timer.appendChild(buttons);

    return timer;
}
// function generateLandingTimer() {
	// let outerDiv = document.createElement('div');
	// outerDiv.classList.add('timer', 'landing-timer', 'chosen-timer');
	// outerDiv.id = 'timer0';

	// // Create and append the days time block
	// let daysBlock = document.createElement('div');
	// daysBlock.classList.add('time-block', 'days-block');
	// let daysTitle = document.createElement('h2');
	// daysTitle.classList.add('timer-title');
	// daysTitle.textContent = 'days';
	// let daysDigit = document.createElement('span');
	// daysDigit.classList.add('timer-digit', 'days-digit');
	// daysDigit.textContent = '0';
	// daysBlock.appendChild(daysTitle);
	// daysBlock.appendChild(daysDigit);
	// outerDiv.appendChild(daysBlock);

	// // Create and append the hours time block
	// let hoursBlock = document.createElement('div');
	// hoursBlock.classList.add('time-block');
	// let hoursTitle = document.createElement('h2');
	// hoursTitle.classList.add('timer-title');
	// hoursTitle.textContent = 'hr';
	// let hoursDigit = document.createElement('span');
	// hoursDigit.classList.add('timer-digit', 'hours-digit');
	// hoursDigit.textContent = '0';
	// hoursBlock.appendChild(hoursTitle);
	// hoursBlock.appendChild(hoursDigit);
	// outerDiv.appendChild(hoursBlock);

	// // Create and append the minutes time block
	// let minutesBlock = document.createElement('div');
	// minutesBlock.classList.add('time-block');
	// let minutesTitle = document.createElement('h2');
	// minutesTitle.classList.add('timer-title');
	// minutesTitle.textContent = 'min';
	// let minutesDigit = document.createElement('span');
	// minutesDigit.classList.add('timer-digit', 'minutes-digit');
	// minutesDigit.textContent = '0';
	// minutesBlock.appendChild(minutesTitle);
	// minutesBlock.appendChild(minutesDigit);
	// outerDiv.appendChild(minutesBlock);

	// return outerDiv;
// }
function generatePrompt(days, hours, minutes, seconds) {
	days = days === undefined ? '' : days;
	hours = hours === undefined ? '' : hours;
	minutes = minutes === undefined ? '' : minutes;
	seconds = seconds === undefined ? '' : seconds;

	// Create main container div with class "prompt" and append it to the document body
	let promptDiv = document.createElement("div");
	promptDiv.classList.add("prompt");

	// Create inputs container div with class "inputs" and append it to the main container
	let inputsDiv = document.createElement("div");
	inputsDiv.classList.add("inputs");
	promptDiv.appendChild(inputsDiv);

	// Create days input container with class "input-container days-input" and append it to the inputs container
	let daysInputContainer = document.createElement("div");
	daysInputContainer.classList.add("input-container", "days-input");
	inputsDiv.appendChild(daysInputContainer);

	// Create days input title with class "input-title" and text content "days" and append it to the days input container
	let daysInputTitle = document.createElement("h2");
	daysInputTitle.classList.add("input-title");
	daysInputTitle.textContent = "days";
	daysInputContainer.appendChild(daysInputTitle);

	// Create days input element with id "days", type "number", and append it to the days input container
	let daysInput = document.createElement("input");
	daysInput.setAttribute("placeholder", "0");
	daysInput.setAttribute("id", "days");
	daysInput.setAttribute("type", "number");
	daysInput.value = days;
	daysInputContainer.appendChild(daysInput);

	// Create hr input container with class "input-container" and append it to the inputs container
	let hrInputContainer = document.createElement("div");
	hrInputContainer.classList.add("input-container");
	inputsDiv.appendChild(hrInputContainer);

	// Create hr input title with class "input-title" and text content "hr" and append it to the hr input container
	let hrInputTitle = document.createElement("h2");
	hrInputTitle.classList.add("input-title");
	hrInputTitle.textContent = "hr";
	hrInputContainer.appendChild(hrInputTitle);

	// Create hr input element with id "hours", type "number", max value "24", and append it to the hr input container
	let hrInput = document.createElement("input");
	hrInput.setAttribute("placeholder", "0");
	hrInput.setAttribute("id", "hours");
	hrInput.setAttribute("type", "number");
	hrInput.setAttribute("max", "24");
	hrInput.setAttribute('oninput', 'validateInput(this, digitsLength[0])');
	hrInput.value = hours;
	hrInputContainer.appendChild(hrInput);

	// Create min input container (similar process to days and hr inputs)
	let minInputContainer = document.createElement("div");
	minInputContainer.classList.add("input-container");
	inputsDiv.appendChild(minInputContainer);

	// Create min input title with class "input-title" and text content "min" and append it to the min input container
	let minInputTitle = document.createElement("h2");
	minInputTitle.classList.add("input-title");
	minInputTitle.textContent = "min";
	minInputContainer.appendChild(minInputTitle);

	// Create sec input element with id "hours", type "number", max value "24", and append it to the sec input container
	let minInput = document.createElement("input");
	minInput.setAttribute("placeholder", "0");
	minInput.setAttribute("id", "minutes");
	minInput.setAttribute("type", "number");
	minInput.setAttribute("max", "60");
	minInput.setAttribute('oninput', 'validateInput(this, digitsLength[1])');
	minInput.value = minutes;
	minInputContainer.appendChild(minInput);
	// Create sec input container (similar process to days, hr, and sec inputs)
	let secInputContainer = document.createElement("div");
	secInputContainer.classList.add("input-container");
	inputsDiv.appendChild(secInputContainer);

	// Create sec input title with class "input-title" and text content "sec" and append it to the sec input container
	let secInputTitle = document.createElement("h2");
	secInputTitle.classList.add("input-title");
	secInputTitle.textContent = "sec";
	secInputContainer.appendChild(secInputTitle);

	// Create sec input element with id "hours", type "number", max value "24", and append it to the sec input container
	let secInput = document.createElement("input");
	secInput.setAttribute("placeholder", "0");
	secInput.setAttribute("id", "seconds");
	secInput.setAttribute("type", "number");
	secInput.setAttribute("max", "60");
	secInput.setAttribute('oninput', 'validateInput(this, digitsLength[2])');
	secInput.value = seconds;
	secInputContainer.appendChild(secInput);

	// Create buttons container div with class "buttons" and append it to the main container
	let buttonsDiv = document.createElement("div");
	buttonsDiv.classList.add("buttons");
	promptDiv.appendChild(buttonsDiv);

	// Create "done" button with onclick attribute set to "confirmPrompt()" and append it to the buttons container
	let doneButton = document.createElement("button");
	doneButton.setAttribute("onclick", "confirmPrompt(this)");
	buttonsDiv.appendChild(doneButton);

	// Create "done" button span with class "material-symbols-outlined" and text content "done" and append it to the "done" button
	let doneButtonSpan = document.createElement("span");
	doneButtonSpan.classList.add("material-symbols-outlined");
	doneButtonSpan.textContent = "done";
	doneButton.appendChild(doneButtonSpan);

	// Create "close" button (similar process to "done" button) and append it to the buttons container
	let closeButton = document.createElement("button");
	closeButton.setAttribute("onclick", "rejectPrompt(this)");
	buttonsDiv.appendChild(closeButton);

	// Create "close" button span (similar process to "done" button span) and append it to the "close" button
	let closeButtonSpan = document.createElement("span");
	closeButtonSpan.classList.add("material-symbols-outlined");
	closeButtonSpan.textContent = "close";
	closeButton.appendChild(closeButtonSpan);

	return promptDiv;
}
// Timer
function getTimerIndex(timer) {
	return timer.id.match(/\d+/)[0];
}
function updateTimer(timer, days, hours, minutes, seconds) {
	timer.querySelector('.days-digit').innerText = days;
	timer.querySelector('.hours-digit').innerText = hours;
	timer.querySelector('.minutes-digit').innerText = minutes;
	timer.querySelector('.seconds-digit').innerText = seconds;
}
function checkClick(event, timer) {
	if (event.target.tagName !== 'BUTTON' && event.target.parentElement.tagName !== 'BUTTON') {
		selectChosentimer(timer); // passed as `this`
	}
}
function selectChosentimer(timer) {
	const previouslyChosenTimer = menuItems.querySelector('.chosen-timer');
	if (previouslyChosenTimer) {
		previouslyChosenTimer.classList.remove('chosen-timer');
	}
	timer.classList.add('chosen-timer');
	currentChosenTimer = timer.cloneNode(true);
	selectTimerForLanding();
}
// Prompt
function validateInput(inputEle, limit) {
	value = inputEle.value;
    if (value > limit) {
    	errorInputNotValid(inputEle.id, limit);
    	inputEle.value = '';	
    }
}
function errorInputNotValid(id, limit) {
	alert(`The Max # of ${id} is ${limit}`)
}
function getInputsValues(prompt) {
	const daysInputEle = prompt.querySelector('#days');
	const hoursInputEle = prompt.querySelector('#hours');
	const minutesInputEle = prompt.querySelector('#minutes');
	const secondsInputEle = prompt.querySelector('#seconds');

	const daysValue = isNaN(parseInt(daysInputEle.value)) ? 0 : parseInt(daysInputEle.value);
	const hoursValue = isNaN(parseInt(hoursInputEle.value)) ? 0 : parseInt(hoursInputEle.value);
	const minutesValue = isNaN(parseInt(minutesInputEle.value)) ? 0 : parseInt(minutesInputEle.value);
	const secondsValue = isNaN(parseInt(secondsInputEle.value)) ? 0 : parseInt(secondsInputEle.value);

	return [daysValue, hoursValue, minutesValue, secondsValue];
}
function confirmPrompt(button) {
	const prompt = button.closest('div.prompt');
	const [days, hours, minutes, seconds] = getInputsValues(prompt);
	let currentId = null;
	if (updating) {
		currentId = getTimerIndex(currentEditedTimer);
		deleteElement(currentEditedTimer);
	} else {
		timerId++;
		currentId = timerId;
	}
	const timer = generateTimer(currentId, days, hours, minutes, seconds, false); // paused
	addTimerToData(currentId, days, hours, minutes, seconds);
	addTimerToBackUp(currentId, days, hours, minutes, seconds);
	insertTimer(timer, currentPrompt);
	deleteElement(prompt);
	if (firstChange) {
		changeLandingLayout();
		selectChosentimer(timer);
		firstChange = false;
	}
	updating = false;
}
function rejectPrompt(button) {
	const prompt = button.closest('div.prompt');
	if (updating) {
		currentEditedTimer.style.display = 'grid'
		const currentTimerIndex = getTimerIndex(currentEditedTimer);
		data[currentTimerIndex].paused = false;
	}
	deleteElement(prompt);
	updating = false;
}
// Data and BackUP
function addTimerToData(id, days, hours, minutes, seconds) {
	data[id] = {};
	data[id].id = id;
	data[id].counters = [days, hours, minutes, seconds];
	data[id].finished = false;
	data[id].paused = false;
}
function updateTimersData(timerIndex, days, hours, minutes, seconds) {
	data[timerIndex].counters[0] = days;
	data[timerIndex].counters[1] = hours;
	data[timerIndex].counters[2] = minutes;
	data[timerIndex].counters[3] = seconds;
}
function addTimerToBackUp(id, days, hours, minutes, seconds) {
	backUp[id] = {};
	backUp[id].counters = [days, hours, minutes, seconds];
}
// adding/removing to/from DOM
function insertTimer(timer, prompt=null) {
	if (updating) {
		menuItems.insertBefore(timer, prompt);
	} else {
		menuItems.insertBefore(timer, addTimerButton);
	}
}
function insertPrompt(prompt, timer=null) {
	if (updating) {
		menuItems.insertBefore(prompt, timer)
	} else {
		menuItems.insertBefore(prompt, addTimerButton);
	}
}
function deleteElement(element) {
	menuItems.removeChild(element);
}
// Timer's Four Buttons
function restartTimer(timer) {
	const timerIndex = getTimerIndex(timer);
	pauseTimer(timer);
	const [days, hours, minutes, seconds] = backUp[timerIndex].counters;
	updateTimersData(timerIndex, days, hours, minutes, seconds);
	updateTimer(timer, days, hours, minutes, seconds);
}
function pauseTimer(timer) {
	const timerIndex = getTimerIndex(timer);
	data[timerIndex].paused = true;
	timer.querySelector('#pause-continue-button span').innerText = 'play_arrow';
	timer.querySelector('#pause-continue-button').setAttribute('onclick', "continueTimer(this.closest('div.timer'))");
}
function continueTimer(timer) {
	const timerIndex = getTimerIndex(timer);
	data[timerIndex].paused = false;
	timer.querySelector('#pause-continue-button span').innerText = 'pause';
	timer.querySelector('#pause-continue-button').setAttribute('onclick', "pauseTimer(this.closest('div.timer'))");
}
function editTimer(timer) {
	updating = true;
	currentEditedTimer = timer;
	const timerIndex = getTimerIndex(timer);
	data[timerIndex].paused = true;
	const prompt = generatePrompt(data[timerIndex].counters[0], data[timerIndex].counters[1], data[timerIndex].counters[2], data[timerIndex].counters[3]);
	currentPrompt = prompt;
	insertPrompt(prompt, timer);
	timer.style.display = 'none';
}
function deleteTimer(timer) {
	deleteElement(timer);
	const timerIndex = getTimerIndex(timer);
	if (timerIndex === '0' && timerId > 0) {
		selectChosentimer(document.querySelector('#timer1'));
	}
	data.splice(timerIndex, 1);
	backUp.splice(timerIndex, 1);
	timerId--;
	for (let i = timerIndex; i < data.length; i++) {
		data[i].id -= 1;
	}
	const allTimers = document.querySelectorAll('div.timer');
	for (let i = timerIndex; i < allTimers.length; i++) {
		const timer = allTimers[i];
		const timerId = getTimerIndex(timer);
		allTimers[i].id = `timer${timerId - 1}`;
	}
}
// Updating loop functions
function updateTimers() {
	for (let i = 0; i < data.length; i++) {
		const timer = data[i];
		const timerIndex = timer.id;
		// const timerIndex = getTimerIndex(timer);
		if (!timer.finished && !timer.paused) {
			const seconds = timer.counters[digitsLength.length];
			if (seconds === 0) {
				borrowTime(timer, digitsLength.length);
				redisplayAllCounters(timerIndex);
			} else {
				timer.counters[3]--;
				redisplaySecondsCounter(timerIndex);
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
function redisplaySecondsCounter(timerId) {
	const timer = menuItems.querySelector(`div#timer${timerId}`);
	const secondsEle = timer.querySelector('span.seconds-digit');
	secondsEle.innerText = data[timerId].counters[3];
}
function redisplayAllCounters(timerId) {
	const timer = menuItems.querySelector(`div#timer${timerId}`);
	const daysEle = timer.querySelector('span.days-digit');
	const hoursEle = timer.querySelector('span.hours-digit');
	const minutesEle = timer.querySelector('span.minutes-digit');
	const secondsEle = timer.querySelector('span.seconds-digit');
	daysEle.innerText = data[timerId].counters[0];
	hoursEle.innerText = data[timerId].counters[1];
	minutesEle.innerText = data[timerId].counters[2];
	secondsEle.innerText = data[timerId].counters[3];
}
function timerFinished(timer) {
	timer.finished = true;
}
// Updating loop
setInterval(function() {
	updateTimers();
	if (currentChosenTimer !== null) {
		landingTimerId = getTimerIndex(currentChosenTimer);
		const days = data[landingTimerId].counters[0];
		const hours = data[landingTimerId].counters[1];
		const minutes = data[landingTimerId].counters[2];
		const seconds = data[landingTimerId].counters[3];
		landingTimer.querySelector('.days-digit').innerText = days;
		landingTimer.querySelector('.hours-digit').innerText = hours;
		landingTimer.querySelector('.minutes-digit').innerText = minutes;
		let secondsSplitted = `${seconds}`.split("");
		if (secondsSplitted.length < 2) {
			secondsSplitted = '0' + secondsSplitted;
		}
		getScreen(bluePrints[secondsSplitted[1]],onesSecondsContainer);
		getScreen(bluePrints[secondsSplitted[0]],tensSecondsContainer);
		clearScreens(onesSecondsContainer);
		if (secondsSplitted[1] === '9') {
			clearScreens(tensSecondsContainer);
		}
	}
}, 1000);
// Run First
document.onload = () => {
	getScreen(userPattern, screensContainer);
}