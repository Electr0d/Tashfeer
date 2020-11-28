/*
* Name: Hamza Alsarakbi
* Teacher: Mr. Schwartz
* Assignment: Encryption Algorithms "Tashfeer"
* Date: November 27th, 2020
*/
const crypto = require('crypto');
const elements = {
  output: {
    output: document.querySelector('.output'),
    parameters: document.querySelector('.parameters#output-parameters')
  },
  input: {
    input: document.querySelector('input.string'),
    crypto: document.querySelector('input#crypto'),
    sea: {
      sea: document.querySelector('input.sea#sea'),
      key: document.querySelector('input.key#sea')
    }
  }
}
elements.input.input.addEventListener('input', e => {config.input.input = e.target.value});

function initalize() {
  // set the parameters to checked or unchecked
  if(!config.input.parameters.crypto) document.querySelector('.sub-parameters#crypto').classList.toggle('disabled')
  elements.input.crypto.checked = config.input.parameters.crypto;
  
  // set the parameters to checked or unchecked

  if(!config.input.parameters.sea) document.querySelector('.sub-parameters#sea').classList.toggle('disabled')
  elements.input.sea.sea.checked = config.input.parameters.sea;

  // get all the ciphers
  let ciphers = crypto.getCiphers();
  
  // create a checkbox for ever cipher
  let column1 = document.querySelector('.sub-parameters#crypto');
  for (let i = 0; i < ciphers.length; i++) {

    // throw out some algorithms
    if(ciphers[i].includes('cbc') && ciphers[i].includes('aes')) {

      // add a sub parameter
      let container = addElement('label', { class: 'checkbox-container' }, removedashes(ciphers[i]).toUpperCase(), column1);
      let checkbox = addElement('input', { type: 'checkbox', onclick: 'parameterEdit(this)', ['data-algorithm']: 'crypto', id: ciphers[i] }, '', container);
      checkbox.checked = config.input.parameters[ciphers[i]];
      addElement('span', { class: 'checkmark' }, '', container);
    }
  }

  // add generate key buttons
  addElement('button', { class: 'generate', id: 'crypto-1-generate-key', onclick: 'algorithms.crypto.generateKey(128, 16)' }, 'Generate Key for Base 128', column1);
  addElement('button', { class: 'generate', id: 'crypto-1-generate-key', onclick: 'algorithms.crypto.generateKey(192, 24)' }, 'Generate Key for Base 192', column1);
  addElement('button', { class: 'generate', id: 'crypto-1-generate-key', onclick: 'algorithms.crypto.generateKey(256, 32)' }, 'Generate Key for Base 256', column1);

  
  // add output parameters
	addParameter(elements.output.parameters, { text: 'Preserve Log', on: true }, 'switch', 'log', 'toggleLog()', config.parameters.log);
	addElement('button', { id: 'clear-log', onclick: 'clearLog()' }, 'Clear Log', elements.output.parameters);
}
initalize();
appendConfig();

function appendConfig() {
  // append values to config
  let params = document.querySelectorAll('.checkbox-container input');
  for(let i = 0; i < params.length; i++) {
    config.input.parameters[params[i].id] = params[i].checked;
  }
  // append ciphers
  for(item in config.input.parameters) {
    // add it if its a sub parameter and active
    if(item.includes('aes') && config.input.parameters[item]) algorithms.crypto.ciphers[item] = item;
  }

  // append inputs
  elements.input.input.value = config.input.input;
  elements.input.sea.key.value = config.input.seaKey;

  // append output
  for(let item in data) {
    addRow(data[item].prefix, data[item].operator, data[item].result, item);
  }
}

function removedashes(text) {
  // split the text into arrays
  let texts = text.split('-');
  let final = '';

  // reassemble the string with spaces intsead of dashes
  for (let i = 0; i < texts.length; i++) {
    final += ' ' + texts[i];
  }
  // remove first space
  return final.replace(final.substring(0, 1), '');
}


function parameterEdit(e, type) {
  // if it is an algorithm
  if (type == 'algorithm') {
    document.querySelector('.sub-parameters#' + e.id).classList.toggle('disabled');
  } else {
    if (e.checked) {
      // add to object
      algorithms[e.dataset.algorithm].ciphers[e.id] = e.id;
    } else {
      // remove from object
      delete algorithms[e.dataset.algorithm].ciphers[e.id];
    }
  }
  config.input.parameters[e.id] = !config.input.parameters[e.id];
}
function generate(action) {
  // clear output if preseve log is false
  if(!config.parameters.log) clearLog();
  
  let text = elements.input.input.value;
  // check if crypto's active
  if(elements.input.crypto.checked) { 
    
    // grab all ciphers
    let ciphers = algorithms.crypto.ciphers;
    
    // iterate through all ciphers
    for(let cipher in ciphers) {
      // make sure the key is already generated
        if(config.input[cipher.split('-')[1]].key != undefined) {
        let generated = algorithms.crypto[action](text, cipher);
        addRow(text, cipher, generated, cipher + '-' + config.index);

        // append new row to data object
        data[cipher + '-' + config.index] = {
          prefix: text,
          operator: cipher,
          result: generated,
          id: cipher + '-' + config.index,
          index: config.index
        }

        // increment pointer
        config.index++;
      }
    }
  }
  
  // check if SEA's active
  if(elements.input.sea.sea.checked) {
    let cipher = Number(elements.input.sea.key.value);
    let generated = algorithms.sea[action](text, cipher);
    let operator = 'SEA-' + cipher;
    addRow(text, operator, generated, operator + '-' + config.index);
    
    // append new row to data object
    data[operator + '-' + config.index] = {
      prefix: text,
      operator: operator,
      result: generated,
      id: operator + '-' + config.index,
      index: config.index
    }

    // increment pointer
    config.index++;
  }
}


function addRow(prefix, operator, result, id) {
	// add row
	let row = addElement('div', { class: 'row', id: id, onclick: 'copy(this)' }, undefined, elements.output.output);
	row.addEventListener('contextmenu', highlight);
	let cell = addElement('div', {class: 'cell', id: id }, undefined, row);
	addElement('div', { class: 'cell-child prefix', id: id }, prefix + ' 🡒 ', cell);
	addElement('div', { class: 'cell-child operator', id: id }, operator + ' 🡒 ', cell);
	addElement('div', { class: 'cell-child result', id: id }, result, cell);
}

function copy(e) {
	// get row
	let row = document.querySelector('.row#' + e.id);
	let cell = document.querySelector('.cell#' + e.id);
	// get the result
	let result = document.querySelector('#' + e.id + ' .result').textContent;

	// make an invisible input element and set the result as its value
	let input = addElement('input', { style: 'opacity: 0; height: 0; padding: 0; margin: 0;' }, result, document.body);

	// select input and copy value
	input.select();
	document.execCommand('copy');
	// copied animation
	toast(e.id, 'Copied to clipboard!');
	
	row.classList.add('highlight');
	cell.classList.add('highlight');
	
	
	
	// delete elements
	document.body.removeChild(input);
	setTimeout(() => {
		row.classList.remove('highlight');
		cell.classList.remove('highlight');
	}, 1275);

}

function highlight(e) {
	let id = e.target.id;
	console.log(e.target);
	let rows = document.querySelectorAll('.row');
	let cells = document.querySelectorAll('.row .cell');
	for (let i = 0; i < rows.length; i++) {
		rows[i].classList.remove('highlight');
		cells[i].classList.remove('highlight');
	}
	document.querySelector('.row#' + id).classList.add('highlight');
	document.querySelector('.cell#' + id).classList.add('highlight');
}

elements.input.sea.key.addEventListener('input', e => {
  let value = e.target.value;
  // if not a number (achieved by converting value to a integer. If it is not an integer, it will be a NaN)
  if(isNaN(Number(value))) {
    e.target.value = value.replace(value.substring(value.length - 1, value.length), '');
  }
  // save to config
  config.input.seaKey = e.target.value;
});

function toast(id, message) {
	let toast = addElement('span', { class: 'toast', id: id + '-toast' }, message, document.body);
	setTimeout(() => { document.body.removeChild(toast) }, 1500);
}

function clearLog() {
	elements.output.output.innerHTML = '';
  data = {};
  // reset pointer
  config.index = 0;
}

function toggleLog() {
	config.parameters.log = !config.parameters.log;
}

