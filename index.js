document.addEventListener('DOMContentLoaded', function () {
  const roles = Array.from(document.querySelectorAll('.role'));
  let selectedRole = null;

  roles.forEach(r => {
    r.addEventListener('click', () => {
      roles.forEach(x => x.classList.remove('selected'));
      r.classList.add('selected');
      selectedRole = r.textContent.trim();
    });
  });

  const signupBtn = document.querySelector('.signup-btn');
  const username = document.querySelector('input[name="username"]');
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');
  const password2 = document.querySelector('input[name="password2"]');
  const agreementCheckboxes = Array.from(document.querySelectorAll('.agreements input[type="checkbox"]'));

  function clearInvalid() {
    [username, email, password, password2].forEach(i => i.classList.remove('invalid'));
  }

  function showToast(text, type) {
    let t = document.querySelector('.site-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'site-toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.className = 'site-toast ' + (type || '');
    // ensure visible
    setTimeout(() => {
      t.classList.add(type);
    }, 10);
    setTimeout(() => {
      t.className = 'site-toast';
    }, 3000);
  }

  function validate() {
    clearInvalid();
    const errors = [];

    if (!username.value.trim()) {
      username.classList.add('invalid');
      errors.push('Username is required');
    }

    const emailValue = email.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      email.classList.add('invalid');
      errors.push('Please provide a valid email');
    }

    if (password.value.length < 6) {
      password.classList.add('invalid');
      errors.push('Password must be at least 6 characters');
    }

    if (password.value !== password2.value) {
      password2.classList.add('invalid');
      errors.push('Passwords do not match');
    }

    const agreed = agreementCheckboxes.every(cb => cb.checked);
    if (!agreed) {
      errors.push('You must accept Terms and Privacy');
    }

    if (!selectedRole) {
      errors.push('Please select a role (Student or Guardian)');
    }

    return errors;
  }

  signupBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) {
      showToast(errors[0], 'error');
      return;
    }

    // Simulate signup
    showToast('Account created (' + selectedRole + '). Redirecting...', 'success');
    setTimeout(() => {
      // In a real app you'd POST to server and redirect on success.
      // For demo, clear the form and unselect role.
      username.value = '';
      email.value = '';
      password.value = '';
      password2.value = '';
      agreementCheckboxes.forEach(cb => cb.checked = false);
      roles.forEach(r => r.classList.remove('selected'));
      selectedRole = null;
    }, 1200);
  });

});
