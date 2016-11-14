
var ENDPOINT = 'http://localhost:3000/api/movies';

function getMovies(){
  fetch(ENDPOINT)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log(json);
    })
}

getMovies();
