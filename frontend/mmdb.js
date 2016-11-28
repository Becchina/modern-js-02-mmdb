// Globali
var ENDPOINT = 'http://localhost:3000/api/movies';
var results = document.querySelector('#list');

// Utility per selezione nel DOM
function $(selector){
  return document.querySelector(selector);
}

// Funzione render copiata e sistemata da lezione 6 corso 1
function render(collection){
  var tmpl = document.querySelector('template');
  results.innerHTML = '';
  collection.forEach(function(e,i){
    results.innerHTML += tmpl.innerHTML
                              .replace('{{poster}}', e.poster)
                              .replace('{{title}}', e.title)
                              .replace('{{id}}', e.id)
                              .replace('{{year}}', e.year);
  });
}

// Ottengo lista film dal server
function getMovies(){
  fetch(ENDPOINT)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      render(json);
    })
}

// Aggiungo un film nel backend
function postMovie(){
  // Oggetto con i dati del film
  var movie = {
    title: $('#title').value,
    year: $('#year').value,
    poster: $('#poster').value
  }
  console.log(movie);

  // Fetch
  // 1° argomento: url da chiamare
  // 2° argomento: oggetto di configurazione
  fetch(ENDPOINT,{
    // tipo di richiesta: GET (default), POST, PUT, DELETE
    method: 'POST',
    // dati che passo al server
    body: JSON.stringify(movie),
    // il tipo di formato di dati che sto per mandare al server
    headers: new Headers({
    	'Content-Type': 'application/json'
    })
  })
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    getMovies();      // Ricarico (e ridiseno) la lista dei film
  }, function(data){
    console.error(data);
  });
}

// Elimina un elemento dal backend
function deleteMovie(evt){
  // Leggo l'ID stampato nell'attributo data-id
  var id = evt.currentTarget.dataset.id;
  // Chiamo l'endpoint in modalità DELETE passando
  // l'ID nell'url
  fetch(ENDPOINT + '/' + id ,{
    method: 'DELETE'
  })
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    getMovies();      // Ricarico (e ridiseno) la lista dei film
  }, function(data){
    console.error(data);
  });
}

// Al submit della form mando i dati al backend
$('form').addEventListener('submit', function(evt){
  evt.preventDefault();
  postMovie();
});

// Primo caricamento
getMovies();
