async function loginScreen(event) {
    event.preventDefault();

    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (username && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log(`${username} is logged in`);
            // document.location.replace(Add 'homepage' here)
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginScreen);