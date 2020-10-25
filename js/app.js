const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();
    // console.log('Buscando el clima.... ');
    const ciudad = document.querySelector('#ciudad').value; // .value
    const pais = document.querySelector('#pais').value;
    // console.log(ciudad);
    // console.log(pais);
    if(ciudad === '' || pais === ''){
        mostrarError('All fields are requiered!');
    }
    consultarAPI(ciudad, pais); // Consultar...
}

function mostrarError(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){ // Si no hay una alerta existente
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error</strong>
            <span class="block">${mensaje}</span>    
        `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2234);
    }
}

function consultarAPI(ciudad, pais){
    const appID = 'c26c24f7c4c1ac550e7c5e6a0e8810ae';

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    limpiarHTML();
    Spinner();

    setTimeout(() => { // Sólo para lucir el spinner. mua.ha.ha...mua.ha.ha...
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            console.log(datos);
            if(datos.cod == "404"){
                mostrarError('City not found')
                return;
            }
            mostrarClima(datos);
        })
        
    }, 3456);
    formulario.reset()
}

function mostrarClima(datos) {
    const {main: {temp, temp_max, temp_min}, name}= datos

    const act = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.classList.add('text-teal-400', 'font-bold', 'text-3xl', 'text-center')
    nombreCiudad.textContent = `Clima en ${name}`;

    const actual = document.createElement('p');
    actual.innerHTML = `${act} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('P');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

    console.log(temp);
}

// function kelvinACentigrados(grados){ // La normal...
//     return parseInt(grados-273.15);
// }

const kelvinACentigrados = (grados) => parseInt(grados - 273.15); // Helpers

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
        <div class="cube1"></div>
        <div class="cube2"></div>
    `;
    resultado.appendChild(divSpinner);
}




