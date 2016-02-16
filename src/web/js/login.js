'use strict';

var submit = document.getElementById('submit');
submit.onclick = login;

var spinner = document.getElementById('spinner');
spinner.style.visibility = 'hidden';

// Submit on enter key
document.onkeydown = function(event) {
  if (event.keyCode == 13) {
    login();
  }
};

function login() {
  removeError();
  spinner.style.visibility = 'visible';

  let emailOrUsername = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let keybase = new KeybaseAPI(window.location.origin);

  keybase.login(emailOrUsername, password).then(function(response) {
    localStorage.setItem('keybase', JSON.stringify(response.me));
    localStorage.setItem('keybasePassphrase', password);
    window.location.href = '/auth/google';
  }).catch(function(error) {
    console.log(error);
    spinner.style.visibility = 'hidden';
    addError('An error occurred when logging in<br/>' + error.status.name + ": " + error.status.desc);
  });
}

function addError(message) {
  let error = document.getElementById('error');
  error.innerHTML = message;
  error.style.visibility = 'visible';
}

function removeError() {
  var error = document.getElementById('error');
  error.style.visibility = 'hidden';
}
