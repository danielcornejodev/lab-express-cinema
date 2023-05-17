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

router.get("/movies/new", (req, res, next)=>{
    res.render("new-movie");
 });

router.post("/movies/create", (req, res)=>{
    Movie.create({
        title: req.body.title,
        director: req.body.director,
        stars: req.body.stars,
        image: req.body.img,
        description: req.body.description,
        showtimes: req.body.showtimes
    }).then((response)=>{
        res.redirect("/movies")
    }).catch((err)=>{
        console.log(err);
    })
// on a post request, on the .then, you always redirect, never render
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

router.post("/movie/delete/:theID", (req, res)=>{
    Movie.findByIdAndRemove(req.params.theID)
    .then(()=>{
        res.redirect("/movies");
    });
});

router.get("/movies/:id/edit", (req, res)=>{
    Movie.findById(req.params.id)
    .then((theMovie)=>{
        res.render("movie-edit", {theMovie})
    })
});

router.post("/movies/:theID/update", (req, res)=>{
    Movie.findByIdAndUpdate(req.params.theID,{
        title: req.body.title,
        director: req.body.director,
        stars: req.body.stars,
        image: req.body.img,
        description: req.body.description,
        showtimes: req.body.showtimes
    }).then(()=>{
        res.redirect("/movies/"+req.params.theID)
    })

})


module.exports = router;
