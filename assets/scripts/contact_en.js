const form = document.getElementById('contact-form');
const messageContainer = document.getElementById('message-container');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (!isValidForm()) {
    return false;
  }

  form.submit();
  showMessage('The message was sent successfully!', 'success');
});

function isValidForm() {
  const nameInput = document.querySelector('input[name="txtName"]');
  const nameValue = nameInput.value.trim();

  if (nameValue === '') {
    showMessage('Please enter your name', 'error');
    nameInput.focus();
    return false;
  }

  const emailInput = document.querySelector('input[name="txtEmail"]');
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    showMessage('Please enter your email', 'error');
    emailInput.focus();
    return false;
  } else if (!isValidEmail(emailValue)) {
    showMessage('Please enter a valid email', 'error');
    emailInput.focus();
    return false;
  }

  const phoneInput = document.querySelector('input[name="txtPhone"]');
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === '') {
    showMessage('Please enter your phone number', 'error');
    phoneInput.focus();
    return false;
  } else if (!isValidPhone(phoneValue)) {
    showMessage('Please enter a valid phone number', 'error');
    phoneInput.focus();
    return false;
  }

  const messageInput = document.querySelector('textarea[name="txtMsg"]');
  const messageValue = messageInput.value.trim();

  if (messageValue === '') {
    showMessage('Please enter your message', 'error');
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
    alert('Thank you for sending the message!');
    window.location.href = '#';
  }
}
