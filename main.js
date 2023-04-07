const { PythonShell } = require('python-shell');
const engineBtnContainer = document.querySelector('.engine-btn-container');
const historyLogContainer = engineBtnContainer.querySelector('.history-log-container');

// Step 1: create the popup-container element
const popupContainer = document.createElement('div');
popupContainer.classList.add('popup-container');

// Step 2: create the contents of the popup-container, including the Deploy Test button
const popupContent = `
  <h1>This is the content of the popup container.</h1>
  <button class="deploy-test-btn">Deploy Test</button>
  <button class="cancel-btn">Cancel</button>
`;
popupContainer.innerHTML = popupContent;

// Step 3: hide the popup-container by default
popupContainer.style.display = 'none';

// Step 4: add event listeners to the test buttons to toggle the visibility of the popup-container
const testButtons = document.querySelectorAll('.engine-test-btn');
testButtons.forEach(testButton => {
    testButton.addEventListener('click', () => {
        console.log('Test button clicked'); // <-- add this line
        popupContainer.style.display = 'block';
        // set the test name as a data attribute on the popup container
        popupContainer.setAttribute('data-test-name', testButton.textContent);
    });
});

// Step 5: add an event listener to the Deploy Test button to close the popup container and add a new history log to the container
const deployTestButton = popupContainer.querySelector('.deploy-test-btn');
deployTestButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    const testName = popupContainer.getAttribute('data-test-name');
    const testButton = document.querySelector(`.engine-test-btn[data-test-name="${testName}"]`);
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    // create a new history log element
    const historyLog = document.createElement('div');
    historyLog.textContent = `Test "${testName}" was deployed at ${new Date().toLocaleString()}`;

    // create a new history log object
    const historyLogObj = {
        test: testName,
        timestamp: new Date().toLocaleString()
    };

    // use PythonShell to append the history log object to the JSON file
    PythonShell.run('log_data.py', null, (err) => {
        if (err) throw err;
        console.log('History log added to JSON file');
    });

    // add the history log element to the container
    historyLogContainer.appendChild(historyLog);
});


// Step 6: add an event listener to the Cancel button to close the popup container
const cancelButton = popupContainer.querySelector('.cancel-btn');
cancelButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
});

// Step 5: add the popup-container to the document
document.body.appendChild(popupContainer);
