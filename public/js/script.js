document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signin-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Select input fields
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Select corresponding labels
        const emailLabel = document.getElementById('email-label');
        const passwordLabel = document.getElementById('password-label');

        // Store current values
        let emailValue = emailInput.value.trim();
        let passwordValue = passwordInput.value.trim();

        // Regex patterns
        const emailRegex = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+\.([a-z]+)(\.[a-z]+)?$/;

        // Validation
        let isValid = true;

        // Email validation
        if (!emailValue) {
            showError(emailInput, emailLabel, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, emailLabel, 'Invalid Email');
            isValid = false;
        } else {
            clearError(emailInput, emailLabel, 'Email');
        }

        // Password validation
        if (!passwordValue) {
            showError(passwordInput, passwordLabel, 'Password is required', 'red');
            isValid = false;
        } else {
            clearError(passwordInput, passwordLabel, 'Password');
        }


        if (isValid) {
            const data = {
                email: emailValue,
                password: passwordValue
            };
            signin(data);
        }
    });

    function signin(data) {
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    var notyf = new Notyf();
                    notyf.success(res.message, 1000);
                } else {
                    handleGlobalError(res.message);
                }
            })
            .catch((error) => {
                handleGlobalError(error.message);
            });
    }


    function showError(input, label, message) {
        input.classList.add('error');
        label.textContent = message;
        label.classList.add('error-message');
    }

    function clearError(input, label, defaultMessage) {
        input.classList.remove('error');
        label.textContent = defaultMessage;
        label.classList.remove('error-message');
    }

    function handleGlobalError(message) {
        let errorLabel = document.getElementById('global-label');
        if (errorLabel) {
            errorLabel.textContent = message;
        }
    }
});