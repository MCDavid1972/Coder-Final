///PRODUCTOS

productos = []
const productoFetch = async () => {
    const response = await fetch('/Proyectos/ProyectoFinal/productos.json')
    const productos = await response.json()
    renderizarProductos(productos)
}
productoFetch()

let contenedorProductos = document.getElementById("contenedorProductos")
renderizarProductos()

function renderizarProductos(filtradosP){
   let renderizarP = productos
    if (filtradosP){
        renderizarP = filtradosP 
    } 
    contenedorProductos.innerHTML = ""
    renderizarP.forEach(producto => {
        let tarjetaProducto = document.createElement('div')
        tarjetaProducto.className = "producto"
        tarjetaProducto.innerHTML = `
            <img src= ${producto.img}>
                <h3>${producto.nombre} $ ${producto.precio}</h3>
                <p> Quedan ${producto.cupo}</p>
            <button class="boton-carr" id="sel${producto.id}">Agregar al Carrito</button>
        `
        contenedorProductos.append(tarjetaProducto)
        const carr_btn = document.querySelector(`#sel${producto.id}`)
        carr_btn.addEventListener('click', ()=>{
            AgregarCarrito(producto)
        })
    })
}


/// BUSCAR
 let inputBuscar = document.getElementById("buscar")
 
inputBuscar.oninput = () => {
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(inputBuscar.value))
    renderizarProductos(productosFiltrados)
}

 ///CARRITO
//let botones =document.getElementsByClassName("boton-carr")
let carrito = document.getElementById("carrito")

//JSON Carrito
let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || []

 
 

///renderizar el Carrito
 function renderCarrito(){
    carrito.innerHTML = ""
    carritoGuardado.forEach(producto =>{
        const cardCarrito = document.createElement('div')
        cardCarrito.innerHTML += `
            <div class = "itemCarrito">
                <p class= "productoC">${producto.nombre}</p>
                <p class= "productoC">  $ ${producto.precio}</p>
            </div>
            `
        carrito.append(cardCarrito)
    })
 }



  function AgregarCarrito(prod){
       carritoGuardado.push({id: prod.id, nombre: prod.nombre, precio: prod.precio})
       localStorage.setItem('carrito', JSON.stringify(carritoGuardado))
       renderCarrito() 
    }


//Borrar carrito//
let borrarCarr_btn = document.getElementById("borr-carr")
borrarCarr_btn.onclick = () => {
    borracarr()
    carrito.innerHTML = ''
    Swal.fire(
        "Carrito Borrado",  
    )
}

function borracarr(){
    localStorage.removeItem("carrito")
    
}


//        Calculadoras            //

//Ritmo//
let distanciaIng = document.getElementById("distancia")
let horasIng = document.getElementById("hs")
let minutosIng = document.getElementById("min")
let segundosIng = document.getElementById("seg")
let boton = document.getElementById("calc_ritmo")
let resultadoRit = document.getElementById("ritmo")

boton.onclick = () => {
    resultadoRit.innerText = ritmo(horasIng.value, minutosIng.value, segundosIng.value, distanciaIng.value)
}

function ritmo(hora, minutos, segundos, distancia){
    let minutosH = Number(hora) * 60  // Pasaje  de Hora a Minutos
    let minutoS = Number(segundos) / 60  //Pasaje de Segundo a Minutos
    let tiempoM = Number(minutos) + minutosH + minutoS
    let ritmoM = tiempoM / Number(distancia)
    let ritmoS =(ritmoM - Math.floor(ritmoM)) * 60
    return " Su Ritmo es : " + Math.floor(ritmoM) +":"+ Math.floor(ritmoS) + "km/m"
}



//IMC///

let pesoIng = document.getElementById("peso") 
let alturaIng = document.getElementById("altura") 
let resultImc = document.getElementById("imc")
let botonimc = document.getElementById("calc_imc")

botonimc.onclick = () => {
    resultImc.innerText =  " Tu IMC es " + calculoImc(pesoIng.value , alturaIng.value)
    Swal.fire(
        resultImc,  
    )
}
///Calculo de IMC Funcion
function calculoImc(peso, altura){
    let imc = peso / (altura **=2)
    imc = imc.toFixed(2)
    return imc
} 


/// Estimar tiempo de carrera///

let distanciaIng2 = document.getElementById("distanciaConocida")
let horasIng2 = document.getElementById("hsConocida")
let minutosIng2 = document.getElementById("minConocida")
let segundosIng2 = document.getElementById("segConocida")
let distanciaEstim = document.getElementById("distEst") // diastancia a estimar tiempo
let resultEst = document.getElementById("ResulEstm")
let botonEst = document.getElementById("EstimarCarr")

botonEst.onclick = () => {
    resultEst.innerText =  predicciondeCarrera(horasIng2.value, minutosIng2.value, segundosIng2.value, distanciaIng2.value, distanciaEstim.value)
}

///Funcion de estimacion de carrera
function predicciondeCarrera(hora, minutos, segundos, nombre, distancia2) {
    let minutosH = parseInt(hora) * 60  // Pasaje  de Hora a Minutos
    let minutoS = parseInt(segundos) / 60  //Pasaje de Segundo a Minutos
    let tiempoM = parseInt(minutos) + minutosH + minutoS
    
    // se aplocan dos formulas dependiendo si la nombre a estimar es  < 21k o >21k
    if ( distancia2 <= 21 ){
        let tiempoEstimado = tiempoM * ((parseInt(distancia2)/parseInt(nombre)) ** 1.06)
        let tiempoEstimadoH = Math.floor(tiempoEstimado/60)
        let tiempoEstimadoM = Math.floor(tiempoEstimado % 60)
        let tiempoEstimadoS = Math.floor(((tiempoEstimado % 60) - tiempoEstimadoM) * 60)
          
        return "Tiempo Estimado en " + distancia2 + "Km  es "+ tiempoEstimadoH + ":" + tiempoEstimadoM + ":" +tiempoEstimadoS
    }else if( distancia2 > 21 ){
        let tiempoEstimado = tiempoM * ((distancia2/nombre) ** 1.06)// Formula de estimacion de tiempo de carrera
        let tiempoEstimadoH = Math.floor(tiempoEstimado /60)
        let tiempoEstimadoM = Math.floor(tiempoEstimado % 60)
        let tiempoEstimadoS = Math.floor(((tiempoEstimado % 60) - tiempoEstimadoM) * 60)
          
        return "Tiempo Estimado en " + distancia2 + "Km  es " + tiempoEstimadoH + ":" + tiempoEstimadoM + ":" +tiempoEstimadoS
    }else{
  
        return "Distancia No Valida" 
    } 
  
  }// fin Estimacion de carrera */

///Zonas de Entrenamiento///
let sexo = document.getElementById("sexo") 
let edad = document.getElementById("edad") 
let fcRep = document.getElementById("fcar_rep")
let resultZonas = document.getElementById("res_zonas")
let botonZonas = document.getElementById("calc_Zonas")
///Zonas de Entrenamiento
botonZonas.onclick = () => {
    let mostrarzona = zonas(sexo.value, edad.value, fcRep.value)
    for (i = 1; i <= 5; i+= 1){
        let porcentajeZona = (i+4)*10
        if (porcentajeZona <= 50 && porcentajeZona < 60){
            resultZonas.innerHTML += `<p class= "zona gris"> Zona  ${porcentajeZona}   %  Frec. Cardiaca =  ${mostrarzona[i]} ppm </p>`
        }else if (porcentajeZona >= 60 && porcentajeZona < 70){
            resultZonas.innerHTML += `<p class= "zona celeste"> Zona  ${porcentajeZona}   %  Frec. Cardiaca =  ${mostrarzona[i]} ppm </p>`
        }else if (porcentajeZona >= 70 && porcentajeZona < 80 ){
            resultZonas.innerHTML += `<p class= "zona verde"> Zona  ${porcentajeZona}   %  Frec. Cardiaca =  ${mostrarzona[i]} ppm </p>` 
        }else if (porcentajeZona >= 80 && porcentajeZona < 90 ){ 
            resultZonas.innerHTML += `<p class= "zona naranja"> Zona  ${porcentajeZona}   %  Frec. Cardiaca =  ${mostrarzona[i]} ppm </p>`
        }else { 
            resultZonas.innerHTML += `<p class= "zona rojo"> Zona  ${porcentajeZona}   %  Frec. Cardiaca =  ${mostrarzona[i]} ppm </p>`
        }
    
    }
}
function zonas(sexo, edad, fcRep){
    zonascalc = []
    if ( sexo = "m"){
        let fcMax = (208 - ( 0.7 * parseInt(edad)))
        for (i = 50; i <= 100; i+= 10){
            let fzona = ((fcMax - parseInt(fcRep)) * (i / 100)) + parseInt(fcRep)
            zonascalc.push(fzona.toFixed(2))
        }
    
    }else if( sexo = "f"){
        let fcMax = (208 - ( 0.8 * Number(edad)))
        for (i = 50; i <= 100; i+= 10){
            let fzona = ((fcMax - parseInt(fcRep)) * (i / 100)) + parseInt(fcRep)
            zonascalc.push(fzona.toFixed(2))
        }
    }
    return zonascalc
}








