const checkForm = (e) => {
  e.preventDefault();

  console.log('e.target.id', e, document.getElementById(e.target.id));

  // const fieldsToValidate = document
  //   .getElementById(e.target.id)
  //   .querySelectorAll('[required], [pattern]');

  const fieldsToValidate = document.forms[0].querySelectorAll(
    '[required], [pattern]'
  );

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

  console.log('ERROR', error);
  if (error) return error;

  // Accede al formulario a través de event.target
  const form = event.target;
  const elements = form.elements;

  let data = {};

  // Itera a través de los elementos del formulario
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.name === '') continue;
    if (element.nodeName === 'BUTTON') continue;

    if (element.nodeName !== 'SELECT' && element.value) {
      data[element.name] = element.value;
    }

    // select Multiple
    if (element.nodeName === 'SELECT') {
      if (element.type === 'select-one') {
        data[element.name] = element.value;
      } else {
        let options = [];

        for (let i = 0; i < element.length; i++) {
          if (element.options[i].selected) {
            options.push(element.options[i].value);
          }
        }

        data[element.name] = options;
      }
    }

    if (element.id === 'attributes') {
      data[element.name] = element.getAttribute('data-custom').split(',');
    }
  }
  return { data };
};
export default checkForm;
