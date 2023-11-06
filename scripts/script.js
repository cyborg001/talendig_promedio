var id = 0
var datos=[]
var id_actual
const capturarDatos = (form) =>{
    let nombre = form['textNombre'].value
    let apellido = form['textApellido'].value
    let matricula= form['textMatricula'].value
    let nota = form['textNota'].value
    registro = {nombre:nombre, apellido: apellido, matricula: matricula, nota: nota}
    
    return registro
}
const limpiarDatos = (form) =>{ 
    form['textNombre'].value = ''
    form['textApellido'].value = ''
    form['textMatricula'].value =''
    form['textNota'].value = ''
}
const guardarDatos = (registro) =>{
    registro.id = id
    datos.push(registro)
    // limpiarDatos(form)
}
const incrementarId = () =>{
    id += 1
}
const calcularPromedio = () =>{
    total = 0
    promedio = datos.forEach( (element) =>{
        total += new Number(element.nota)
    })
    promedio = total/datos.length
    console.log(total)
    console.log(datos.length)
    console.log(promedio)
    document.getElementById('promedio').innerHTML=`${promedio}`
}
const eliminarDatos = (ev) =>{
    datos.forEach( element => {
        console.log(element.id)
        console.log(ev.target.parentNode.parentNode)
        if (element.id == new Number(ev.target.id)){
            console.log(`borrado el registro con id ${id}`)
            datos.splice(datos.indexOf(element),1)
        }      
    });
    ev.target.parentNode.parentNode.remove()
    console.log(datos)
}


const editarDatos = (ev,body) =>{
    // console.log(ev.target.parentNode.parentNode.childNodes ) 
    console.log(ev.target.id)
    actualRow = {}        
    datos.forEach(element =>{
        if(element.id == ev.target.id){
            actualRow = element
        }
    })
    console.log(actualRow)
    if (ev.target.innerHTML == 'Editar'){
        form['textNombre'].value = actualRow.nombre
        form['textApellido'].value = actualRow.apellido
        form['textMatricula'].value = actualRow.matricula
        form['textNota'].value = actualRow.nota 
        ev.target.innerHTML = 'Salvar'
    } else{
        row = {}
        
        
        actualRow.nombre = form['textNombre'].value
        actualRow.apellido = form['textApellido'].value
        actualRow.matricula = form['textMatricula'].value
        actualRow.nota = form['textNota'].value 
       
        console.log(datos)
        tr = ev.target.parentNode.parentNode
        tr.innerHTML=`<td id='td_${actualRow.id}'>${actualRow.id}</td>
                            <td>${actualRow.nombre}</td>
                            <td>${actualRow.apellido}
                            <td>${actualRow.matricula}</td>
                            <td>${actualRow.nota}</td>
                            <td>
                                <button id='${actualRow.id}' onclick="eliminarDatos(event)" class='eliminar btn btn-outline-light side'>Eliminar</button>
                                <br>
                                <button id='${actualRow.id}' onclick="editarDatos(event)" class='remover btn btn-outline-light side'>Editar</button>
                    </td>`
        calcularPromedio()
        ev.target.innerHTML = 'Editar'
    }
    
}

const createRow= (body) =>{
    datos.forEach(element =>{
        if (element.id === id){
            // alert(`id: ${id} encontrado`)
            body.innerHTML +=`<tr id='tr${id}'>   
                                <td id='td_${id}'>${id}</td>
                                <td>${element.nombre}</td>
                                <td>${element.apellido}</td>
                                <td>${element.matricula}</td>
                                <td>${element.nota}</td>
                                <td>
                                    <button id='${id}' onclick="eliminarDatos(event)" class='eliminar btn btn-outline-light side'>Eliminar</button>
                                    <br>
                                    <button id='${id}' onclick="editarDatos(event)" class='remover btn btn-outline-light side'>Editar</button>
                                </td> 
                            </tr>`
        }
    })
}

window.onload = () =>{
    let mydiv = document.getElementById('mydiv')
    let tbody = document.getElementById('t_body')
    let boton = document.getElementById('btnlimpiar')
    form = document.forms[0]
    form.addEventListener('submit',(ev)=>{
        ev.preventDefault()
        registro =capturarDatos(form,datos);
        guardarDatos(registro,datos)
        createRow(tbody,datos)
        incrementarId()
        calcularPromedio()
    })
    boton.addEventListener('click',(ev)=>{
        limpiarDatos(form)
    })
   
     
}
