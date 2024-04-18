


// landing related
const userPattern = { // click
	"2": [1,3,5],
	"3": [2,3,4],
	"4": [1,2,4,5],
	"5": [2,3,4],
	"6": [1,3,5]
};
const digitsBluePrints = [
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
let currentLandingTimer = null;

const landingPage = document.querySelector('.landing')
const screensContainer = document.getElementById('screens-container');
const landingReminder = document.querySelector('.landing-reminder');
const totalSecondsContainer = document.querySelector('.total-seconds-container');
const tensSecondsContainer = document.querySelector('#tens-seconds');
const onesSecondsContainer = document.querySelector('#ones-seconds');
const landingTimer = document.getElementById('landing-timer');
const landingText = document.querySelector('.text');

function getScreen(pattern, screensContainer) {
	keys = Object.keys(pattern);
	for (const yCoordinate of keys) {
		xCoordinates = pattern[yCoordinate];
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
function toggleLandingOpacity() {
	landingPage.classList.toggle('half-opacity')
}
const wholeTimer = document.getElementById('whole-timer');
function toggleLandingLayout() {
	wholeTimer.classList.toggle('display-block-element');
	screensContainer.classList.toggle('hide-element');
	landingText.classList.toggle('hide-element');
}

// pull up menu related
let data = [];
let backUp = []; // counters only

const digitsLength = [23, 59, 59];

let timerId = -1;
let updating = false;
let currentPrompt = null;
let currentEditedTimer = null;

const pullUpMenu = document.getElementById('pull-up-menu');
const pullUpMenuBtn = document.getElementById('pull-up-menu-btn');
const menuItemsContainer = document.querySelector('.menu-items-container');
const menuItems = document.querySelector('.menu-items');
const addTimerButton = document.querySelector('#add-timer');

pullUpMenuBtn.addEventListener('click', () => {
	toggleLandingOpacity();
	pullUpMenu.classList.toggle('move-menu');
	pullUpMenuBtn.classList.toggle('move-button');
});
addTimerButton.addEventListener('click', () => {
	if (!promptExists()) {
		const prompt = generatePrompt();
		const titleInput = prompt.querySelector('#title');
		currentPrompt = prompt;
		insertPrompt(prompt);
		titleInput.focus();
		scrollToBottom();
	} else {
		showError('confirm OR reject the current prompt first!');
	}
});
window.addEventListener('resize', function() {
    checkElementWidth('menu-items', 500);
});
function checkElementWidth(elementId, minWidth) {
    let element = document.getElementById(elementId);
	if (element.clientWidth > minWidth) {
		if (!element.classList.contains('splitted-menu-items')) {
			element.classList.add('splitted-menu-items');
		}
	} else {
		if (element.classList.contains('splitted-menu-items')) {
			element.classList.remove('splitted-menu-items');
		}
	}
}
function generateTimer(id, title, days, hours, minutes, seconds, paused) {
    // Create timer element
    const timer = document.createElement('div');
    timer.classList.add('timer');
    // timer.classList.add('finished-timer');
	
    timer.setAttribute('id', `timer${id}`);
	// new code
	timer.setAttribute('onclick', 'checkClick(event, this)');

    // Create title/days block
    const daysBlock = document.createElement('div');
    daysBlock.classList.add('time-block', 'days-block');

	const carouselContainer = document.createElement('div');
	carouselContainer.classList.add('carousel-container', 'timer-title');

	const titleContainer = document.createElement('div');
	titleContainer.classList.add('title-container');
	
	const headerTitle = document.createElement('h2');
	headerTitle.classList.add('title');
	headerTitle.textContent = '(days) ' + title;

	const headerTitleClone = document.createElement('h2');
	headerTitleClone.classList.add('title');
	headerTitleClone.textContent = '(days) ' + title;

	titleContainer.appendChild(headerTitle);
	titleContainer.appendChild(headerTitleClone);

	carouselContainer.appendChild(titleContainer);

    const daysDigit = document.createElement('span');
    daysDigit.classList.add('timer-digit', 'days-digit');
    daysDigit.textContent = days;

    daysBlock.appendChild(carouselContainer);
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
		console.log('adding finished');
		timer.classList.add('finished-timer');
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
function generatePrompt(title, days, hours, minutes, seconds) {
	title = title === undefined ? '' : title;
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


	// <div class="input-container title-input">
		// <h2 class="input-title">title</h2>
		// <input placeholder=title id=title type="text">
	// </div>
	// Create title input container with class "input-container title-input" and append it to the inputs container
	let titleInputContainer = document.createElement("div");
	titleInputContainer.classList.add("input-container", "title-input");
	inputsDiv.appendChild(titleInputContainer);

	// Create title input title with class "input-title" and text content "title" and append it to the title input container
	let titleInputTitle = document.createElement("h2");
	titleInputTitle.classList.add("input-title", "title-title");
	titleInputTitle.textContent = "title";
	titleInputContainer.appendChild(titleInputTitle);

	// Create title input element with id "title", type "number", and append it to the title input container
	let titleInput = document.createElement("input");
	titleInput.setAttribute("placeholder", "title");
	titleInput.setAttribute("id", "title");
	titleInput.setAttribute("type", "text");
	titleInput.value = title;
	titleInputContainer.appendChild(titleInput);

	// Create days input container with class "input-container days-input" and append it to the inputs container
	let daysInputContainer = document.createElement("div");
	daysInputContainer.classList.add("input-container", "days-input");
	inputsDiv.appendChild(daysInputContainer);

	// Create days input title with class "input-title" and text content "days" and append it to the days input container
	let daysInputTitle = document.createElement("h2");
	daysInputTitle.classList.add("input-title", "days-title");
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
function generateTitleTooltip(title) {
	const container = document.createElement('div');
	container.classList.add('title-tooltip');
	container.textContent = title;
	return container;
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
		if (currentLandingTimer === null) {
			toggleLandingLayout();
		}
		selectChosentimer(timer); // passed as `this`
	}
}
function selectChosentimer(timer) {
	const timerIndex = getTimerIndex(timer);
	data[timerIndex].chosen = true;
	clearScreens(onesSecondsContainer);
	clearScreens(tensSecondsContainer);
	const previouslyChosenTimer = menuItems.querySelector('.chosen-timer');
	if (previouslyChosenTimer) {
		const timerIndex = getTimerIndex(previouslyChosenTimer);
		data[timerIndex].chosen = false;
		previouslyChosenTimer.classList.remove('chosen-timer');
	}
	timer.classList.add('chosen-timer');
	currentLandingTimer = timer.cloneNode(true);
	updateLandingCounters();
}
// Prompt
function scrollToBottom() {
	menuItemsContainer.scrollTop = menuItemsContainer.scrollHeight;
}
function validateInput(inputEle, limit) {
	value = inputEle.value;
    if (value > limit) {
    	showError('The maximum value for ' + inputEle.id + ' is ' + limit + '!');
    	inputEle.value = '';	
    } else if (value < 0) {
		showError("you can't enter a value less than zero!")
    	inputEle.value = '';	
	}
}
function getInputsValues(prompt) {
	const titleInputEle = prompt.querySelector('#title');
	const daysInputEle = prompt.querySelector('#days');
	const hoursInputEle = prompt.querySelector('#hours');
	const minutesInputEle = prompt.querySelector('#minutes');
	const secondsInputEle = prompt.querySelector('#seconds');

	const titleValue = titleInputEle.value;
	const daysValue = isNaN(parseInt(daysInputEle.value)) ? 0 : parseInt(daysInputEle.value);
	const hoursValue = isNaN(parseInt(hoursInputEle.value)) ? 0 : parseInt(hoursInputEle.value);
	const minutesValue = isNaN(parseInt(minutesInputEle.value)) ? 0 : parseInt(minutesInputEle.value);
	const secondsValue = isNaN(parseInt(secondsInputEle.value)) ? 0 : parseInt(secondsInputEle.value);
	let empty = false;
	if (daysValue === 0 && hoursValue === 0 && minutesValue === 0 && secondsValue === 0) {
		empty = true;
	}
	return [titleValue, daysValue, hoursValue, minutesValue, secondsValue, empty];
}
function confirmPrompt(button) {
	// const prompt = button.closest('div.prompt');
	const [title, days, hours, minutes, seconds, empty] = getInputsValues(currentPrompt);
	let currentId = null;
	let chosen = null;
	if (updating) {
		// change the total seconds in landing when the timer is edited to prevent tens overflow
		const timerIndex = getTimerIndex(currentEditedTimer);
		currentId = timerIndex;
		if (data[timerIndex].chosen === true) {
			chosen = true;
			clearScreens(onesSecondsContainer);
			clearScreens(tensSecondsContainer);
		}
		deleteElement(menuItems, currentEditedTimer);
	} else {
		timerId++;
		currentId = timerId;
	}
	const timer = generateTimer(currentId, title, days, hours, minutes, seconds, empty); // empty or paused
	addTimerToData(currentId, title, days, hours, minutes, seconds, empty);
	addTimerToBackUp(currentId, days, hours, minutes, seconds);
	insertTimer(timer, currentPrompt);
	deleteElement(menuItems, currentPrompt);
	if (chosen !== null) {
		selectChosentimer(timer);
	}
	if (firstChange) {
		toggleLandingLayout();
		selectChosentimer(timer);
		firstChange = false;
	}
	updating = false;
	let titleContainer = timer.querySelector('.title-container');
	let firstTitle = timer.querySelector('.title-container .title');
	let titles = timer.querySelectorAll('.title-container .title');
	let appropriateDuration = 7;
	if (firstTitle.offsetWidth > titleContainer.offsetWidth) {
		appropriateDuration = firstTitle.offsetWidth / titleContainer.offsetWidth;
	} 
	for (let i = 0; i < titles.length; i++) {
		titles[i].style.animation = `carousel ${appropriateDuration}s infinite linear`;
	}
	const timerTitle = timer.querySelector('.carousel-container.timer-title')
	timerTitle.addEventListener('mouseenter', function() {
		const tooltip = generateTitleTooltip(firstTitle.innerText);
		timerTitle.appendChild(tooltip);
	});
	timerTitle.addEventListener('mouseleave', function() {
		const tooltip = timerTitle.querySelector('.title-tooltip');
		deleteElement(timerTitle, tooltip);
	});
	scrollToBottom();
	// to check if something is being edited or created
	currentPrompt = null;
}
function rejectPrompt(button) {
	// const prompt = button.closest('div.prompt');
	if (updating) {
		currentEditedTimer.style.display = 'grid'
		const currentTimerIndex = getTimerIndex(currentEditedTimer);
		data[currentTimerIndex].paused = false;
	}
	deleteElement(menuItems, currentPrompt);
	updating = false;
	currentPrompt = null;
}
// Data and BackUP
function addTimerToData(id, title, days, hours, minutes, seconds, empty) {
	data[id] = {};
	data[id].id = id;
	data[id].title = title;
	data[id].counters = [days, hours, minutes, seconds];
	data[id].finished = false;
	if (empty) {
		data[id].finished = true;
		data[id].paused = true;
	} else {
		data[id].finished = false;
		data[id].paused = false;
	}
	data[id].chosen = false;
}
function addTimerToBackUp(id, days, hours, minutes, seconds) {
	backUp[id] = {};
	backUp[id].counters = [days, hours, minutes, seconds];
}
function removeTimerFromData(timerIndex) {
	data.splice(timerIndex, 1);
}
function removeTimerFromBackUp(timerIndex) {
	backUp.splice(timerIndex, 1);
}
function updateTimersData(timerIndex, days, hours, minutes, seconds) {
	data[timerIndex].counters[0] = days;
	data[timerIndex].counters[1] = hours;
	data[timerIndex].counters[2] = minutes;
	data[timerIndex].counters[3] = seconds;
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
function deleteElement(parent, element) {
	parent.removeChild(element);
}
// Timer's Four Buttons
function restartTimer(timer) {
	const timerIndex = getTimerIndex(timer);
	pauseTimer(timer);
	const [days, hours, minutes, seconds] = backUp[timerIndex].counters;
	updateTimersData(timerIndex, days, hours, minutes, seconds);
	updateTimer(timer, days, hours, minutes, seconds);
	// to display the new changes on the landing page
	if (data[timerIndex].chosen === true) {
		clearScreens(tensSecondsContainer);
		clearScreens(onesSecondsContainer);
		updateLandingCounters();
	}
}
function pauseTimer(timer) {
	const timerIndex = getTimerIndex(timer);
	data[timerIndex].paused = true;
	timer.querySelector('#pause-continue-button span').innerText = 'play_arrow';
	timer.querySelector('#pause-continue-button').setAttribute('onclick', "continueTimer(this.closest('div.timer'))");
}
function continueTimer(timer) {
	const timerIndex = getTimerIndex(timer);
	if (data[timerIndex].finished !== true) {
		data[timerIndex].paused = false;
		timer.querySelector('#pause-continue-button span').innerText = 'pause';
		timer.querySelector('#pause-continue-button').setAttribute('onclick', "pauseTimer(this.closest('div.timer'))");
	} else {
		showError('This timer is finished! Edit or Remove it!')
	}
}
function editTimer(timer) {
	if (!promptExists()) {
		updating = true;
		currentEditedTimer = timer;
		const timerIndex = getTimerIndex(timer);
		data[timerIndex].paused = true;
		const prompt = generatePrompt(data[timerIndex].title, data[timerIndex].counters[0], data[timerIndex].counters[1], data[timerIndex].counters[2], data[timerIndex].counters[3]);
		currentPrompt = prompt;
		insertPrompt(prompt, timer);
		timer.style.display = 'none';
	} else {
		showError('confirm OR reject the current prompt first!');
	}
}
function deleteTimer(timer) {
	deleteElement(menuItems, timer);
	const timerIndex = getTimerIndex(timer);
	removeTimerFromData(timerIndex);
	removeTimerFromBackUp(timerIndex);
	// change the id's in the data
	for (let i = timerIndex; i < data.length; i++) {
		data[i].id -= 1;
	}
	// change the id's of the timers on screen
	const allTimers = menuItems.querySelectorAll('div.timer');
	for (let i = timerIndex; i < data.length; i++) {
		allTimers[i].setAttribute('id', `timer${i}`);
	}
	timerId--;
	// select chosen timer if possible
	// I don't know why (timer === currenLandingTimer) = 'false'
	console.log('the timer id is:', timer.id, 'and the landing timer is:', currentLandingTimer.id);
	console.log('timerid > currentlandingtimer', timer.id > currentLandingTimer.id);
	if (timerId === -1) { // no timers left
		firstChange = true;
		currentLandingTimer = null;
		toggleLandingLayout();
	} else if (timer.id === currentLandingTimer.id && timerId === 0) { // delete chosen and one timer left
		selectChosentimer(document.querySelector('#timer0'))
	} else if (timer.id === currentLandingTimer.id && timerId > 0) { // delete chosen and there are multiple
		currentLandingTimer = null;
		toggleLandingLayout();
	} else if (timer.id < currentLandingTimer.id) { // delete the unchosen one and there is one timer left (before)
		currentLandingTimer = menuItems.querySelector(`#timer${getTimerIndex(currentLandingTimer) - 1}`)
	} else { // delete the unchosen one and there is one timer left (after)
	}
}
// errors
function promptExists() {
	if (currentPrompt !== null) {
		return true;
	}
	return false;
}
const errorContainer = document.querySelector('.error-message');
function showError(message) {
	errorContainer.classList.remove('error-animation');
	errorContainer.innerHTML = "<span style='color: var(--brown); font-weight: 600;'>Error: </span>"+ message;
	setTimeout(() => {
		errorContainer.classList.add('error-animation');
	}, 10)
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
function updateLandingCounters() {
	const landingTimerId = getTimerIndex(currentLandingTimer);
	const days = data[landingTimerId].counters[0];
	const hours = data[landingTimerId].counters[1];
	const minutes = data[landingTimerId].counters[2];
	const seconds = data[landingTimerId].counters[3];
	landingTimer.querySelector('.days-digit').innerText = days;
	landingTimer.querySelector('.hours-digit').innerText = hours;
	landingTimer.querySelector('.minutes-digit').innerText = minutes;
	let secondsArr = `${seconds}`.split("");
	if (secondsArr.length < 2) {
		secondsArr.unshift('0');
	}
	updateTotalSecondsContainer(secondsArr);
}
function updateTotalSecondsContainer(seconds) {
	getScreen(digitsBluePrints[seconds[0]],tensSecondsContainer);
	getScreen(digitsBluePrints[seconds[1]],onesSecondsContainer);
	clearScreens(onesSecondsContainer);
	if (seconds[1] === '9') {
		clearScreens(tensSecondsContainer);
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
			timer.counters[i] = digitsLength[i - 1];
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
	const timerEle = getTimerFromIndex(timer.id);
	timerEle.classList.add('finished-timer');
	pauseTimer(timerEle)
	// timer.paused = true;
}
function getTimerFromIndex(index) {
	return menuItems.querySelector(`#timer${data[index].id}`)
}
// Updating loop
setInterval(function() {
	updateTimers();
	// finished timers are paused anyways
	if (currentLandingTimer !== null && data[getTimerIndex(currentLandingTimer)].paused !== true) {
		updateLandingCounters();
	}
}, 1000);
// Run First
checkElementWidth('menu-items', 500);
getScreen(userPattern, screensContainer);

