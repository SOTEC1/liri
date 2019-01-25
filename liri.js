require("dotenv").config();

// importing required npms
var keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const moment = require('moment');
const spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

// input variables
const command = process.argv[2]
const input = process.argv.splice(3,process.argv.length).join("+");

//bands in town api search 
function getConcert() {

axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(response);
    console.log("\nLocation: \n" + response.data[0].venue.city);
    console.log("\nName of concert: \n" + response.data[0].venue.name);
    const timeConverted = moment(response.data[0].datetime).format("MM DD YYYY [at] hh:mm:ss a");
    console.log("\nDate: \n" + timeConverted);
    console.log("\n---------------\n")
  }
);
}

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
    console.log("\n---------------\n")
  }
);
}

// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// spotify search
function spotifyThis() {

  spotify
  .request(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=1`)
  .then(function(data) {
    console.log("\n Artist: \n" + data.tracks.items[0].artists[0].name);
    console.log("\n Title: \n" + data.tracks.items[0].name);
    console.log("\n Preview link: \n" + data.tracks.items[0].preview_url);
    console.log("\n Album Name: \n" + data.tracks.items[0].album.name);
    console.log("\n----------\n") 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
}

// switch case for each command
switch(command) {
  case "concert-this":
  getConcert();
  break;

  case "movie-this":
  getMovie();
  break;

  case "spotify-this-song":
  spotifyThis();
  break;
}