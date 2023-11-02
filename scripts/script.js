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
    form['textMatricula'].val =''
    form['textNota'].value = ''
}
const guardarDatos = (registro) =>{
    registro.id = id
    datos.push(registro)
    limpiarDatos(form)
}
const incrementarId = () =>{
    id += 1
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
   
    
    if (ev.target.innerHTML == 'Editar'){
        datos.forEach(element =>{
            if(element.id == new Number(ev.target.id)){
                console.log(element)
                form['textNombre'].value = element.nombre
                form['textApellido'].value = element.apellido
                form['textMatricula'].value = element.matricula
                form['textNota'].value = element.nota  
            }
        })

        
        ev.target.innerHTML = 'Salvar'
    }else{
        row = {}
        
        ev.target.innerHTML = 'Editar'
        row.nombre = form['textNombre'].value
        row.apellido = form['textApellido'].value
        row.matricula = form['textMatricula'].value
        row.nota = form['textNota'].value 
        console.log(`este es ${Object.values(row)}`)
        datos.forEach(element =>{
            if(element.id == new Number(ev.target.id)){
                row.id=element.id
                element = row   
            }
        })
        tr = ev.target.parentNode.parentNode
        console.log(tr)
        console.log(row)
        tr.innerHTML=`<td id='td_${row.id}'>${row.id}</td>
                            <td>${row.nombre}</td>
                            <td>${row.apellido}
                            <td>${row.matricula}</td>
                            <td>${row.nota}</td>
                            <td>
                                <button id='${row.id}' onclick="eliminarDatos(event)" class='eliminar'>Eliminar</button>
                                <br>
                                <button id='${row.id}' onclick="editarDatos(event)" class='remover'>Editar</button>
                    </td>`
           
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
                                    <button id='${id}' onclick="eliminarDatos(event)" class='eliminar'>Eliminar</button>
                                    <br>
                                    <button id='${id}' onclick="editarDatos(event)" class='remover'>Editar</button>
                                </td>
                            </tr>`
        }
    })
}
window.onload = () =>{
    // let datos = []
    let mydiv = document.getElementById('mydiv')
    let tbody = document.getElementById('t_body')
    mydiv.innerHTML='Hola mundo'
    console.log(document.forms['myform']['textApellido'])
    form = document.forms[0]
    form.addEventListener('submit',(ev)=>{
        ev.preventDefault()
        registro =capturarDatos(form,datos);
        guardarDatos(registro,datos)
        createRow(tbody,datos)
        incrementarId()
    })
}
