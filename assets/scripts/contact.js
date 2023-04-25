const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (!isValidForm()) {
    return false;
  }

  form.submit();
  alert('El mensaje fue enviado con exito!');  
});

function isValidForm() {
  const nameInput = document.querySelector('input[name="txtName"]');
  const nameValue = nameInput.value.trim();

  if (nameValue === '') {
    alert('Por favor, ingrese su nombre');
    nameInput.focus();
    return false;
  }

  const emailInput = document.querySelector('input[name="txtEmail"]');
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    alert('Por favor, ingrese su correo electrónico');
    emailInput.focus();
    return false;
  } else if (!isValidEmail(emailValue)) {
    alert('Por favor, ingrese un correo electrónico válido');
    emailInput.focus();
    return false;
  }

  const phoneInput = document.querySelector('input[name="txtPhone"]');
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === '') {
    alert('Por favor, ingrese su número de teléfono');
    phoneInput.focus();
    return false;
  } else if (!isValidPhone(phoneValue)) {
    alert('Por favor, ingrese un número de teléfono válido');
    phoneInput.focus();
    return false;
  }

  const messageInput = document.querySelector('textarea[name="txtMsg"]');
  const messageValue = messageInput.value.trim();

  if (messageValue === '') {
    alert('Por favor, ingrese su mensaje');
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

function handleSubmit() {
    if (isValidForm()) {
      alert('¡Gracias por enviar el mensaje!');
      window.location.href = './index.html';
    }
  }
  