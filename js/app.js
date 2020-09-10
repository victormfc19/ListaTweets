// variables 
const formulario = document.querySelector('#formulario');
const listaTweets =  document.querySelector('#lista-tweets');

let tweets = []; 
// event listeners 

eventListeners();

function eventListeners(){
   formulario.addEventListener('submit', agregarTweet );

   document.addEventListener('DOMContentLoaded', () => {
     
       tweets = JSON.parse( localStorage.getItem('tweet') ) || [];
      
       crearHTML();
   });
}

// funciones

function agregarTweet(e){
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;
    if(tweet == ''){
        mostrarError('No puede ir vacio');
        return; 
    }
  
    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    };
    
    tweets = [...tweets, tweetObj];

    crearHTML();

    // Reiniciar el formulario

    formulario.reset();
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

// Mostrar los tweets

function crearHTML(){

    limpiarHTML()

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            // Agregar boton
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet; // recordar que tweet es un objeto que contiene id y el tweet.

            li.appendChild( btnEliminar );

            listaTweets.appendChild(li);
        });
    }

    sincronizarLocalStorage();
}

// Limpiar el html
function limpiarHTML(){
    while( listaTweets.firstChild ){
        listaTweets.removeChild( listaTweets.firstChild );   
    }
        
}


function sincronizarLocalStorage(){
    localStorage.setItem('tweet', JSON.stringify(tweets));
}

// Eliminar tweet

function borrarTweet( id ){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}