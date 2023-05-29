const contentAros = document.querySelector("#contentAros");
const verCarrito = document.querySelector("#verCarrito");
const contentModal = document.querySelector("#contentModal");

//Array//
const productos = [
  {
    id: 1,
    nombre: "Aros Corazon",
    precio: 1000,
    img: (src = "image/aros/corazon_inflado250.jpg"),
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Aros Criollitos",
    precio: 1000,
    img: (src = "image/aros/criollitos250.jpg"),
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Aros Labrados",
    precio: 1000,
    img: (src = "image/aros/inflado_chiquito_labrado250.jpg"),
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "Aros Chiquitos",
    precio: 1000,
    img: (src = "image/aros/inflado_chiquito250.jpg"),
    cantidad: 1,
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((producto) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p class="price">$${producto.precio}</p>
        
    `;

  contentAros.append(content);

  let agregar = document.createElement("button");
  agregar.innerText = "Agregar";
  agregar.className = "agregar";

  content.append(agregar);

  agregar.addEventListener("click", () => {
    carrito.push({
      id: producto.id,
      img: producto.img,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
    });
    localGuardar();
  });
});

const funcionCarrito = () => {
  contentModal.innerHTML = "";
  contentModal.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
        <h1 class="modal-header-titulo">Carrito</h1>
    `;
  contentModal.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerHTML = "X";
  modalbutton.className = "modal.-header-button";

  modalbutton.addEventListener("click", () => {
    contentModal.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        `;

    contentModal.append(carritoContent);

    let eliminar = document.createElement("spam");
    eliminar.innerHTML = "❌";
    eliminar.className = "eliminar-producto";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio, 0);

  const totalCompra = document.createElement("div");
  totalCompra.className = "total-content";
  totalCompra.innerHTML = `Total a Pagar: ${total} $`;
  contentModal.append(totalCompra);
};

verCarrito.addEventListener("click", funcionCarrito);

const eliminarProducto = () => {
  const buscarId = carrito.find((element) => element.id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== buscarId;
  });

  funcionCarrito();
  localGuardar();
};

const localGuardar = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));
