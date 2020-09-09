// variables 
const formulario = document.querySelector('#formulario');
const listaTweets =  document.querySelector('#lista-tweets');


// event listeners 

eventListeners();

function eventListeners(){
   formulario.addEventListener('submit', agregarTweet )
}

// funciones

function agregarTweet(e){
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;
    if(tweet == ''){
        mostrarError('No puede ir vacio');
        return; 
    }
    else
        console.log(tweet);
}


function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error'); // le agrego la clase error: declara en la hoja de estilos custom.css

    document.querySelector('#contenido').appendChild(mensajeError);

    setTimeout( () => {
        mensajeError.remove(); // Eliminar el letrero de error despues de 3 segundos
    }, 3000);
}