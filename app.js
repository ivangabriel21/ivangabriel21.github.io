const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

document.querySelector('.sign-up-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('.sign-up-form input[name="username"]').value;
    const email = document.querySelector('.sign-up-form input[name="email"]').value;
    const password = document.querySelector('.sign-up-form input[name="password"]').value;

    try {
        const response = await fetch('https://ivandos.loca.lt/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        if (response.ok) {
            alert('Usuario creado exitosamente');
            window.location.href = 'https://quickm.net'; // Redirige al usuario a la página principal
        } else {
            alert('Error al crear el usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.querySelector('.sign-in-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('.sign-in-form input[name="username"]').value;
    const password = document.querySelector('.sign-in-form input[name="password"]').value;

    try {
        const response = await fetch('https://ivandos.loca.lt/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            alert('Inicio de sesión exitoso');
            window.location.href = '/dashboard.html'; // Redirige al usuario al dashboard
        } else {
            alert('Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
