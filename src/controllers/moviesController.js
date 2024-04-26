const path = require( 'path' );
// -------------------------------------------
const db = require('../database/models');
// ----------------------------------------
const Movies = db.Movie;
const Genres = db.Genre;
// ----------------------------------------------

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
        .then(movies => {
            res.render('moviesList', {movies})
        })
    },

    
    add:  (req, res) => {
        let promGenres =  Genres.findAll();
        Promise.all([promGenres])
        .then(([genres])=>{
            res.render('moviesAdd', { genres });
        })
        .catch(err => console.log(err));
    },

    create: function (req, res){
        Movies.create(
            {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length:  req.body.length,
            genre_id: req.body.genre_id
            }
        )
        .then(() => {
        return res.redirect('/movies')
    })
    .catch(err => console.log(err));
    }
}

module.exports = moviesController;