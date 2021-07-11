const request = require("request");
const wondering = require("inquirer");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const fs = require("fs");
require("dotenv").config();
var spotId = new Spotify({
  id: process.env.API_KEY,
  secret: process.env.API_SECRECT,
});

const name = process.argv[2];


  var movie = function(){
  wondering
    .prompt([
      {
        type: "input",
        message: "Please type in your movie name",
        name: "movie",
      },
    ])

    .then(function (res) {
      let movieName = res.movie;

      if (res === undefined) {
        movieName === "Avengers";
      } else {
        movieName === res.movie;
      }

      let queryUrl =
        //`http://www.omdbapi.com/s=${movieName}&apikey=85d44994`;
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=short&apikey=85d44994";

      request(queryUrl, function (error, response, body) {
        if (error && response.statusCode !== 200) {
          //console.log(body)
          queryUrl =
            "http://www.omdbapi.com/?t=Avengers&y=&plot=short&apikey=85d44994";
          console.log("The movie's Title is: " + JSON.parse(body).Title);
        }
      });
      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body)
          console.log("The movie's Title is: " + JSON.parse(body).Title);
        }
      });

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body);
          console.log("The movie's year is: " + JSON.parse(body).Year);
        }
      });

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body)
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
      });

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body)
          console.log("The movie was made in: " + JSON.parse(body).Country);
        }
      });

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body)
          console.log("The movie's language is: " + JSON.parse(body).Language);
        }
      });

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body)
          console.log("The movie's plot is: " + JSON.parse(body).Plot);
        }
      });

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body)
          console.log("The movie's actors are: " + JSON.parse(body).Actors);
        }
      });

      //console.log(queryUrl);
    });
  }
  

var concert = function () {
  wondering
    .prompt([
      {
        type: "input",
        message: "Please type in your artist name",
        name: "music",
      },
    ])

    .then(function (res) {
      let artist = res.music;

      //let queryUrl =

      let queryUrl =
        "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=bootcamp";
      //`http://www.omdbapi.com/s=${movieName}&apikey=85d44994`;
      //console.log("The concert location is at: " + )

      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var JS = JSON.parse(body);
          for (var i = 0; i < JS.length; i++) {
            var name = JS[0].venue.name;

            //console.log(body);
            //var str = JSON.stringify(body, null, 2);
            //var parsed = JSON.parse(str)
            //console.log(parsed)
            //console.log(body);
          }
          console.log("Venue name: " + name);
          //console.log(body);

          for (var i = 0; i < JS.length; i++) {
            var country = JS[0].venue.country;
            var city = JS[0].venue.city;
            var time = JS[0].datetime;

            //console.log(body);
            //var str = JSON.stringify(body, null, 2);
            //var parsed = JSON.parse(str)
            //console.log(parsed)
            //console.log(body);
          }
          const m = moment(time);
          console.log("Venue location: " + country + "," + city);
          console.log(m.format("L"));

          //console.log("The artist is performing at Title: " + JSON.parse(body).venue);
        }
      });

      //console.log(queryUrl);
    });
};

var streaming = function () {
  wondering
    .prompt([
      {
        type: "input",
        message: "Please type in your song name",
        name: "stream",
      },
    ])
    .then(function (res) {
      spotId.search({ type: "track", query: res.stream }, function (err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        } else {
          var song = data.tracks.items[0];
          var artist = song.artists[0].name;
          var name1 = song.name;
          var url = song.preview_url;
          var album = song.album.name;

          //console.log("Song name: " + song);
          //console.log(song);
          console.log("Artist name: " + artist);
          console.log("Song name: " + name1);
          console.log("Preview url: " + url);
          console.log("Album for which the song is from: " + album);
        }
      });

      //console.log(queryUrl);
    });
};

if (name === "spot") {
  streaming();
}

if (name === "concert-me") {
  concert();
}

if (name === "movie-me") {
  movie();
}

if(name === "surprise"){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    if(data === "spot"){
      streaming();
    }

    if(data === "concert-me"){
      concert();
    }

    if(data === "movie-me"){
      movie();
    }

    // Break down all the numbers inside
    
    // Loop through those numbers and add them together to get a sum.
    
  });
}
  


