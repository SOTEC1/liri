require("dotenv").config();

// importing required npms
var keys = require("./keys.js");
const axios = require("axios");
const spotify = require('node-spotify-api');
const moment = require('moment');

// input variables
const command = process.argv[2]
const input = process.argv.splice(3,process.argv.length).join("+");

//bands in town api search 
function getConcert() {

axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log("\nLocation: \n" + response.data[0].venue.city);
    console.log("\nName of concert: \n" + response.data[0].venue.name);
    const timeConverted = moment(response.data[0].datetime).format("MM DD YYYY [at] hh:mm:ss a");
    console.log("\nDate: \n" + timeConverted);
  }
);
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

// // OMDB search
function getMovie() {

  axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("\nTitle: \n" + response.data.Title);
    console.log("\nYear of Release: \n" + response.data.Year);
    console.log("\nIMDB Rating: \n" + response.data.imdbRating);
    console.log("\nRotten Tomatoes Rating: \n" + response.data.Ratings[1].Value);
    console.log("\nCountry of Origin: \n" + response.data.Country);
    console.log("\nLanguage: \n" + response.data.Language);
    console.log("\nPlot: \n" + response.data.Plot);
    console.log("\nCast: \n" + response.data.Actors);
  }
);
}

// switch case for each command
switch(command) {
  case "concert-this":
  getConcert();
  break;

  case "movie-this":
  getMovie();
  break;
}