let nUsu = localStorage.getItem("usuario");

fetch(`https://fakestoreapi.com/users/${nUsu}`)
    .then(res => res.json())
    .then(json => {
        document.getElementById('bienvenida').value = `Bienvenido/a ${json.name["firstname"]} ${json.name["lastname"]}`;
    });

let cartItems = [];

function comprar(i) {
    localStorage.setItem("productoSeleccionado", (i));
    window.location.href = "../html/mostrarProducto.html";
}


function cargarProductos(json) {
    document.getElementById("cuerpo").innerHTML = '';
    json.map(producto => {
        document.getElementById("cuerpo").innerHTML +=
            `<div class="producto" id="${producto.id}">
                <div class="contenedorImg">
                    <img src="${producto.image}" class="img" onclick="comprar(${producto.id});">
                </div>
                <div class="infoProductos">
                    <b class="categoria">${producto.category}</b>
                    <h6 class="codigo">Producto #${producto.id}</h6>
                    <b class="precio">$${producto.price}</b>
                    <br>
                    
                    </div>
                    <button class="btn btn-outline-success shop-item-button">AÑADIR AL CARRITO</button>
                </div>
            </div>`;
    });

    asignarEventosCarrito(json);
}

function asignarEventosCarrito(json) {
    document.querySelectorAll('.shop-item-button').forEach(button => {
        button.addEventListener('click', (event) => {
            let actualID = parseInt(event.target.closest('.producto').id);
            let actualProducto = json.find(item => item.id == actualID);

            if (actualProducto) {
                let carritoProducto = cartItems.find(item => item.id == actualID);
                if (carritoProducto) {
                    carritoProducto.quantity += 1;
                } else {
                    actualProducto.quantity = 1;
                    cartItems.push(actualProducto);
                }

                actualizarCarrito();
            } else {
                console.warn(`Producto con ID ${actualID} no encontrado.`);
            }
            alert("Se ha agregado el producto al carrito")
        });
    });
}

function actualizarCarrito() {
    let cartContainer = document.querySelector('.table-group-divider');
    cartContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
        cartContainer.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td><img class="imgCarrito" src="${item.image}" style="width: 50px; height: auto;"></td>
                <td>${item.title}</td>
                <td>$${item.price}</td>
                <td>
                    <input class="cart-quantity-input" type="number" value="${item.quantity}" min="1" onchange="actualizarCantidad(${item.id}, this.value)">
                    <button class="btn btn-danger" onclick="removerProducto(${item.id})">Remover</button>
                </td>
            </tr>`;
    });
    
    
    document.getElementById('cart-total-price').textContent = "$" + getTotal().toFixed(2);
}


function getTotal() {
    return cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
}


function actualizarCantidad(id, nuevaCantidad) {
    let producto = cartItems.find(item => item.id === id);
    if (producto) {
        producto.quantity = parseInt(nuevaCantidad);
        actualizarCarrito();
    }
}


function removerProducto(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    actualizarCarrito();
}


fetch(`https://fakestoreapi.com/products`)
    .then(res => res.json())
    .then(json => {
        cargarProductos(json); 
    });

// Función para limitar productos mostrados
function limitar() {
    let cantidad = document.getElementById('valor').value;
    fetch(`https://fakestoreapi.com/products?limit=${cantidad}`)
        .then(res => res.json())
        .then(json => {
            cargarProductos(json); 
        });
}
