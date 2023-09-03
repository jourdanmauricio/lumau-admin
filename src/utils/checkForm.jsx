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

  const data = Object.fromEntries(new FormData(e.target));
  // const loading = document.getElementById('lumau-spinner');

  return { data };
};
export default checkForm;
