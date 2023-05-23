const form = document.getElementById('contact-form');
const messageContainer = document.getElementById('message-container');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (!isValidForm()) {
    return false;
  }

  form.submit();
  showMessage('A mensagem foi enviada com sucesso!', 'success');
});

function isValidForm() {
  const nameInput = document.querySelector('input[name="txtName"]');
  const nameValue = nameInput.value.trim();

  if (nameValue === '') {
    showMessage('Por favor, insira seu nome', 'error');
    nameInput.focus();
    return false;
  }

  const emailInput = document.querySelector('input[name="txtEmail"]');
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    showMessage('Por favor, insira seu e-mail', 'error');
    emailInput.focus();
    return false;
  } else if (!isValidEmail(emailValue)) {
    showMessage('Por favor, insira um e-mail válido', 'error');
    emailInput.focus();
    return false;
  }

  const phoneInput = document.querySelector('input[name="txtPhone"]');
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === '') {
    showMessage('Por favor, insira seu número de telefone', 'error');
    phoneInput.focus();
    return false;
  } else if (!isValidPhone(phoneValue)) {
    showMessage('Por favor, insira um número de telefone válido', 'error');
    phoneInput.focus();
    return false;
  }

  const messageInput = document.querySelector('textarea[name="txtMsg"]');
  const messageValue = messageInput.value.trim();

  if (messageValue === '') {
    showMessage('Por favor, insira sua mensagem', 'error');
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
      alert('Obrigado por enviar a mensagem!');
      window.location.href = '#';
    }
  }
