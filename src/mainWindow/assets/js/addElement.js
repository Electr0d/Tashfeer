function addElement(element, attributes, text, parent, textType) {
  let type = textType != undefined ? textType: element == 'input' ? 'value': 'textContent';
  let e = document.createElement(element);
  for(attribute in attributes) {
    e.setAttribute(attribute, attributes[attribute]);
  }
  e[type] = text;
  parent.appendChild(e);
  return e;
}