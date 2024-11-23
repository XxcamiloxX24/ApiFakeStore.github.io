let i = localStorage.getItem("productoSeleccionado")
fetch(`https://fakestoreapi.com/products/${i}`)
                                            .then(res=>res.json())
                                            .then(json=> {
                                                
                                                document.getElementById("productoCuerpo").innerHTML = 
                                                `<div class="producto">
                                                    <div class="contImagen">
                                                        <img src="${json.image}" id="imagen" class="imagen">
                                                    </div>
                                                    <div class="informacion">
                                                        <h1 class="titulo" id="titulo">${json.title}</h1>
                                                        <div class="info">
                                                            <h5 class="codigo" id="codigo">Producto #${json.id}</h5>
                                                            <small id="categoria">${json.category}</small>
                                                        </div>
                                                        <h4 class="descripcion" id="descripcion">${json.description}</h4>
                                                        <br>
                                                        <br>
                                                        
                                                        <center><b class="precio">$${json.price}</b></center>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <div class="info">
                                                            <h5 class="rate">Calificación: ${json.rating["rate"]}</h5>
                                                            <h5 class="rate">Cantidad: ${json.rating["count"]}</h5>
                                                        </div>
                                                    </div>
                                                </div>`;
                                            })
function volver(){
    window.location.href = "../html/inicio.html"
}
