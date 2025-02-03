import validator from 'validator';

export default class User {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    execute() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        const existingErrors = el.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        if (!validator.isEmail(emailInput.value)) {
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Invalid email.';
            errorMessage.style.color = 'red';
            errorMessage.classList.add('error-message');
            emailInput.insertAdjacentElement('afterend', errorMessage);
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            console.log(passwordInput.value.length);
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'The password must be between 3 and 50 characters.';
            errorMessage.style.color = 'red';
            errorMessage.classList.add('error-message');
            passwordInput.insertAdjacentElement('afterend', errorMessage);
            error = true;
        }

        if (!error) el.submit();
    }
}