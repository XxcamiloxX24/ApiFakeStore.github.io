document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); 

    let correo = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

 
    fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            json.map(function(users, i, elem){
                if(correo === json[i].email && pass === json[i].password){
                    localStorage.setItem("usuario", json[i].id)
                    window.location.href = "html/inicio.html"

                } else {
                    Swal.fire('Error', 'Correo o contraseña incorrectos', 'error');
                }
            })
        })
});