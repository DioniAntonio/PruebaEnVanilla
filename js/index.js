import datos from "../data/data.json" assert {type: "json"};
import { Gift } from "./clases.js";

const cuerpoTabla = document.querySelector("#cuerpo-tabla")
const myModal = new bootstrap.Modal(document.getElementById('modalGift'),)


let idGiftUpdate = null

window.mostrarModal =(id)=>{
    console.log(id)
    idGiftUpdate=id
    let index = datos.findIndex((item)=>item.id== idGiftUpdate)

    document.querySelector("#giftModal").value=datos[index].gift
    document.querySelector("#tipoModal").value=datos[index].tipo
    document.querySelector("#tiempoModal").value=datos[index].tiempo
    document.querySelector("#precioModal").value=datos[index].precio
    myModal.show()
}

const giftUdate=(e)=> {
    e.preventDefault()
    let index = datos.findIndex((item)=>item.id == idGiftUpdate);
    datos[index].gift=document.querySelector("#giftModal").value
    datos[index].tipo=document.querySelector("#tipoModal").value
    datos[index].tiempo=document.querySelector("#tiempoModal").value
    datos[index].precio=document.querySelector("#precioModal").value

    cargarTabla()
    myModal.hide()
} 



const cargarTabla =()=> {
    cuerpoTabla.innerHTML=""
    datos.map((item) => {
        const fila = document.createElement("tr");

        const celdas = `<th>${item.gift}</th>
        <td>${item.tipo}</td>
        <td>${item.tiempo}</td>
        <td>${item.precio}</td>
        <td>
        <div class="d-flex gap-2">
        <buttom class="btn btn-outline-warning" onclick="mostrarModal(${item.id})">
        <i class="fa fa-pencil" aria-hidden="true"></i>
        </buttom>
        <buttom class="btn btn-outline-danger" onclick="borrarGift(${item.id})">
        <i class="fa fa-times" aria-hidden="true"></i>
        </buttom>
        </div>
        </td>
        `;

        fila.innerHTML=celdas;
        cuerpoTabla.append(fila);

    })
}


const agregarGift = (event) => {
    event.preventDefault()
    console.log("hola")
    let id = datos.at(-1).id + 1
    let gift = document.querySelector("#gift").value
    let tipo = document.querySelector("#tipo").value
    let tiempo = document.querySelector("#tiempo").value
    let precio = document.querySelector("#precio").value

    datos.push(new Gift(id,gift,tipo,tiempo,precio))

    cargarTabla();

};  

window.borrarGift =(id) => {
    let index = datos.findIndex((item)=>item.id==id)

    let validar =confirm(`Está seguro que quiere eliminar la gift card ${datos[index].gift}?`)
    if(validar){
        datos.splice(index,1)
        cargarTabla()
    }
}


cargarTabla();

document.querySelector("#formGift").addEventListener("submit", agregarGift);
document.querySelector("#formModal").addEventListener("submit",giftUdate);