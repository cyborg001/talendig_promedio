
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

const getHabilidades = (pockemon)=>{
    ol = document.createElement('ol')
    Object.keys(pockemon.abilities).forEach((key)=>{
        li = document.createElement('li')
        li.innerHTML=`<h3>${pockemon.abilities[key].ability.name}</h3>`
        ol.appendChild(li)
    })
    divCar.appendChild(ol)
}
const getTypes = (pockemon) =>{
    div = document.getElementById('types')
    ol = document.createElement('ol')
    Object.keys(pockemon.types).forEach((key)=>{
        li = document.createElement('li')
        li.innerHTML=`<h3>${pockemon.types[key].type.name}</h3>`
        ol.appendChild(li)
    })
    div.appendChild(ol)
}
const getCaracteristicas = (pockemon) =>{
    div = document.getElementById('caracteristicas')
    div.innerHTML+=`<p>Id: ${pockemon.id}</p>`
    div.innerHTML+=`<p>Estatura: ${pockemon.height}</p>`
    div.innerHTML+=`<p>Peso: ${pockemon.weigth}</p>`
    div.innerHTML+=`<p>Experiencia Base: ${pockemon.base_experience}</p>`
}
const getEstadisticas = (pockemon) =>{
    div = document.getElementById('statistics')
    ol = document.createElement('ol')
    datos = []
    Object.keys(pockemon.stats).forEach((key)=>{
        data = {}
        data['sta']=pockemon.stats[key].stat.name
        data['value']=pockemon.stats[key].base_stat
        datos.push(data)
    })
    console.log(datos)
    // Object.keys(pockemon.stats).forEach((key)=>{
    //     li = document.createElement('li')
    //     li.innerHTML=`<h3>${pockemon.stats[key].type.name}</h3>`
    //     ol.appendChild(li)
    // })
    // div.appendChild(ol)
}
async function buscar(nombrePokemon){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
    const pockemon = await response.json()
    h1Nombre.innerHTML = pockemon.name
    console.log(imagen)
    imagen.style.width='80%'
    imagen.src=(pockemon.sprites.other['official-artwork'].front_default)//.front_default)
    getHabilidades(pockemon)
    getCaracteristicas(pockemon)
    getTypes(pockemon)
    getEstadisticas(pockemon)
}

window.onload = () =>{
    
    let myform = document.forms[0]
    let h1Nombre = document.getElementById('h1Nombre')
    imagen = document.getElementsByTagName('img')[0]
    divCar = document.getElementById('habilidades')
    myform.addEventListener('submit',(ev)=>{
        ev.preventDefault();
        let nombre = myform.textNombre.value.toLowerCase()
        
        buscar(nombre)
    })

}