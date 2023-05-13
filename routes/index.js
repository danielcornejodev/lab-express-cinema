const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model");

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

/* GET movies hbs page */
router.get("/movies", (req, res)=>{
    Movie.find() 
    .then((allMovies)=>{
        res.render("movies", {movies: allMovies})
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.get("/movies/:theID", (req, res)=>{
    // when you have something with a : in the route
    // that means the route will never go to 
    //  /guitars/theID it will go to something like /guitars/14hfh253534
    // whatever value actually gets put into the URL, will be accessible
    // as req.params.theID
    Movie.findById(req.params.theID)
    .then((theMovie)=>{
        res.render("movieDetails", {theMovie: theMovie})
    })
    .catch((err)=>{
        console.log(err);
    });
});


module.exports = router;
