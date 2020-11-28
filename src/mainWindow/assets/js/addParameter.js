function addParameter(parent, info, type, id, onclick, config) {
	// create parameter
	let parameter = document.createElement('div');
	parameter.setAttribute('class', 'settings-parameter');
	parameter.setAttribute('id', 'parameter-' + id);
	parent.appendChild(parameter);

	// create text parameter
	let parameterText = document.createElement('span');
	parameterText.setAttribute('class', 'parameter-text');
	parameterText.setAttribute('id', 'parameter-text-' + id);
	parameterText.textContent = info.text;
	parameter.appendChild(parameterText);

	if (type == 'switch') {
		// create switch
		let switchElement = document.createElement('div');
		switchElement.setAttribute('class', 'switch-housing');
		switchElement.setAttribute('id', 'switch-' + id);
		switchElement.setAttribute(
			'onclick',
			onclick + '; transformSwitch(document.querySelector(".switch-circle#switch-' + id + '"))'
		);
		parameter.appendChild(switchElement);

		// create circle
		let circle = document.createElement('div');
		circle.setAttribute('class', 'switch-circle');
		circle.setAttribute('id', 'switch-' + id);
    switchElement.appendChild(circle);
		if (config == info.on) transformSwitch(circle);
	} else if (type == 'slider') {
		let parameterContainer = document.createElement('div');
		parameterContainer.setAttribute('class', 'parameter-container');
		parameterContainer.setAttribute('id', 'parameter-container-' + id);
		parameter.appendChild(parameterContainer);
		// create slider
		let slider = document.createElement('input');
		slider.setAttribute('class', 'slider');
		slider.setAttribute('type', 'range');
		slider.setAttribute('min', info.slider.min);
		slider.setAttribute('max', info.slider.max);
		slider.setAttribute('value', info.slider.value);
		slider.setAttribute('id', 'slider-' + id);
		slider.addEventListener('input', onclick);
		parameterContainer.appendChild(slider);

		// create span
		let span = document.createElement('span');
		span.setAttribute('class', 'slider-span');
		span.setAttribute('id', 'span-' + id);
		span.textContent = Math.round(info.slider.value);
		parameterContainer.appendChild(span);
	} else if (type == 'button') {
		addElement('button', {class: 'parameter-button', id: 'parameter-button-' + id, onclick: onclick}, info.button.text, parameter);
	} else if (type == 'radio') {

		let radio = addElement('div', { id: id + '-radio', class: 'parameter-radio' }, 'habibi', parameter);
		let radioInput = addElement('input', { name: info.name, id: id + '-radio-input', class: 'radio-input', type: 'radio', value: info.value }, undefined, radio);
		addElement('span', { id: id + '-radio-checkmark', class: 'radio-checkmark' }, undefined, radio);
		radio.addEventListener('input', onclick);
		if(config == info.on) radioInput.checked = true;
		parameter.setAttribute('class', 'radio-parameter');
	}
	return parameter;
}
function transformSwitch(switchElement) {
	switchElement.classList.toggle('switch-on');
}


function updateSpan(id, text) {
	document.querySelector('#span-' + id).textContent = text;
}