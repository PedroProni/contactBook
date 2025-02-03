import validator from 'validator';

export default class Contact {
    constructor (formClass) {
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
            const name = el.querySelector('input[name="customer_name"]');
            const email = el.querySelector('input[name="customer_email"]');
            const phone = el.querySelector('input[name="customer_phone"]');
            let error = false;
    
            const existingErrors = el.querySelectorAll('.error-message');
            existingErrors.forEach(error => error.remove());

            if (!name.value) {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Name is required.';
                errorMessage.style.color = 'red';
                errorMessage.classList.add('error-message');
                name.insertAdjacentElement('afterend', errorMessage);
                error = true;
            }

            if (!email.value && !phone.value) {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'At least one of these must be filled.';
                errorMessage.style.color = 'red';
                errorMessage.classList.add('error-message');
                email.insertAdjacentElement('afterend', errorMessage);

                const phoneErrorMessage = document.createElement('div');
                phoneErrorMessage.textContent = 'At least one of these must be filled.';
                phoneErrorMessage.style.color = 'red';
                phoneErrorMessage.classList.add('error-message');
                phone.insertAdjacentElement('afterend', phoneErrorMessage);

                error = true;
            }

            if (!validator.isEmail(email.value)) {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Invalid email.';
                errorMessage.style.color = 'red';
                errorMessage.classList.add('error-message');
                email.insertAdjacentElement('afterend', errorMessage);
                error = true;
            }
    
            if (!error) el.submit();
        }
}