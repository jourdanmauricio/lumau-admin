const checkForm = (e) => {
  e.preventDefault();
  const fieldsToValidate = document
    .getElementById(e.target.id)
    .querySelectorAll('[required], [pattern]');

  let error = false;
  for (let i = 0; i < fieldsToValidate.length; i++) {
    if (!fieldsToValidate[i].checkValidity()) {
      fieldsToValidate[i].setAttribute(
        'error',
        fieldsToValidate[i].validationMessage
      );
      error = true;
    }
  }
  if (error) return error;

  // Accede al formulario a través de event.target
  const form = event.target;
  const elements = form.elements;

  let data = {};

  // Itera a través de los elementos del formulario
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.nodeName !== 'BUTTON' && element.nodeName !== 'SELECT') {
      data[element.name] = element.value;
    }

    // select Multiple
    if (element.nodeName === 'SELECT') {
      let options = [];
      for (let i = 0; i < element.length; i++) {
        if (element.options[i].selected) {
          options.push[element.options[i].value];
        }
      }
      data[element.name] = options;
    }
  }
  return { data };
};
export default checkForm;
