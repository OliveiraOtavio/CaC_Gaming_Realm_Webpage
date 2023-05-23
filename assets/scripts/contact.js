const form = document.getElementById('contact-form');
const messageContainer = document.getElementById('message-container');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (!isValidForm()) {
    return false;
  }

  form.submit();
  showMessage('El mensaje fue enviado con éxito!', 'success');
});

function isValidForm() {
  const nameInput = document.querySelector('input[name="txtName"]');
  const nameValue = nameInput.value.trim();

  if (nameValue === '') {
    showMessage('Por favor, ingrese su nombre', 'error');
    nameInput.focus();
    return false;
  }

  const emailInput = document.querySelector('input[name="txtEmail"]');
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    showMessage('Por favor, ingrese su correo electrónico', 'error');
    emailInput.focus();
    return false;
  } else if (!isValidEmail(emailValue)) {
    showMessage('Por favor, ingrese un correo electrónico válido', 'error');
    emailInput.focus();
    return false;
  }

  const phoneInput = document.querySelector('input[name="txtPhone"]');
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === '') {
    showMessage('Por favor, ingrese su número de teléfono', 'error');
    phoneInput.focus();
    return false;
  } else if (!isValidPhone(phoneValue)) {
    showMessage('Por favor, ingrese un número de teléfono válido', 'error');
    phoneInput.focus();
    return false;
  }

  const messageInput = document.querySelector('textarea[name="txtMsg"]');
  const messageValue = messageInput.value.trim();

  if (messageValue === '') {
    showMessage('*Por favor, ingrese su mensaje', 'error');
    messageInput.focus();
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function showMessage(message, type) {
  messageContainer.textContent = message;
  messageContainer.className = type;
}

function handleSubmit() {
    if (isValidForm()) {
      alert('¡Gracias por enviar el mensaje!');
      window.location.href = '#';
    }
  }
  