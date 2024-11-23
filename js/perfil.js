let i = localStorage.getItem("usuario")
fetch(`https://fakestoreapi.com/users/${i}`)
            .then(res=>res.json())
            .then(json=>{
                document.getElementById('name').innerHTML = json.name["firstname"] + " " + json.name["lastname"];

                document.getElementById('usuario').innerHTML = json.email;

                document.getElementById('ciudad').value = json.address["city"]
                document.getElementById('calle').value = json.address["street"]
                document.getElementById('numero').value = json.address["number"]
                document.getElementById('postal').value = json.address["zipcode"]
                document.getElementById('phone').value = json.phone;
                document.getElementById('usernamee').value = json.username;
                document.getElementById('ide').value = json.id;
            })
function Cerrar(){
    window.location.href = "../index.html";
    localStorage.clear()
}