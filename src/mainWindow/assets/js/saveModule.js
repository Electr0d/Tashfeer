const fs = require('fs')
const path = require('path');


const parentPath = path.join(__dirname, 'save');
const paths = {
  data: path.join(parentPath, '/data.json'),
  config: path.join(parentPath, '/config.json')
};



let data = {};
let config = {
  input: {
    input: '',
    parameters: {},
    128: {
      key: undefined,
      iv: undefined
    },
    192: {
      key: undefined,
      iv: undefined
    },
    256: {
      key: undefined,
      iv: undefined
    },
    seaKey: ''
  },
  parameters: {
    log: false
  },
  index: 0
};






if(!fs.existsSync(parentPath)) fs.mkdirSync(parentPath);
if(!fs.existsSync(paths.data)) fs.writeFileSync(paths.data, JSON.stringify(data));
if(!fs.existsSync(paths.config)) fs.writeFileSync(paths.config, JSON.stringify(config));



function pack(object, path) {
	fs.writeFile(path, JSON.stringify(object), (err) => {
		if (err) throw err;
		console.log('Object has been saved!');
	});
}
function unpack(path, object) {
	try {
		return JSON.parse(fs.readFileSync(path));
	} catch (err) {
		console.log('ERROR: object doesn\'t exist.')
		pack(data, paths.data);
		pack(config, paths.config );
		return object;
	}
}

config = unpack(paths.config, config);
data = unpack(paths.data, data);



let saveOn = false;

// check if either of the two object is changed paramters changed, new generated numbers, etc.
function autoSave() {
	var currentData = JSON.stringify(data)
  var savedData = fs.readFileSync(paths.data)
  
	var currentConfig = JSON.stringify(config);
	var savedConfig = fs.readFileSync(paths.config);

	if (currentData != savedData || currentConfig != savedConfig) {
		if (!saveOn) {
			saveOn = true;
			save('show');
		}
	} else {
		if (saveOn) {
			save('hide');
			saveOn = false;
		}
	}
}

// trigger the auto save every two seconds
setTimeout(function() {
	setInterval(autoSave, 400);
}, 1000);


/** Save output and parameters to an external file **/
function save(action, object, path) {
	switch (action) {
		case 'show':
			// show save button
      // create save button
      addElement('button', { class: 'save', onclick: 'save("all")' }, 'Save', document.body);
			break;
		case 'hide':
			// hide save button
			let button = document.querySelector('.save');
			button.classList.add('save-out');

			setTimeout(()=> {
				document.body.removeChild(button);
			}, 310);

			break;
		case 'save':
			// save file
			pack(object, path);
			break;
		case 'all':
			// hide save button
			save('hide');
			save('save', data, paths.data);
			save('save', config, paths.config);
			saveOn = false;
			break;
	}
}



