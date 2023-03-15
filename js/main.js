const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosSeleccionados) {
  contenedorProductos.innerHTML = "";

  productosSeleccionados.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <div class="card p-4 m-4 col-12 col-md-6" style="width: 20rem ; object-fit: cover;">
    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
    <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.nombre}</h3>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
    </div>
`;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));

    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "todos") {
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(
  localStorage.getItem("productos-en-carrito")
);

if (productosEnCarritoLS) {
  productosEnCarrito = productosEnCarritoLS;
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}
