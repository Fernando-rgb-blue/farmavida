console.log(localStorage.getItem('message-display'));

// Recibe el estado del mensaje de error, que cambia entre "block" y "none".
document.getElementById('message-wrong').style.display = localStorage.getItem('message-display');
// Y reinicia el valor.
localStorage.setItem('message-display', 'none');

document.getElementById('login-form').addEventListener('submit', function(event) {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('email:', email);
    console.log('password:', password);

    if (email && password) {
        localStorage.setItem('message-display', 'block');
    }
})

function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
}