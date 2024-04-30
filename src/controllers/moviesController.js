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

    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
        {
            include: ['genre']
        })
        .then(movie => {
            res.render('moviesDetail', {movie})
        })
    },

    add:  (req, res) => {
        let promGenres =  Genres.findAll();
        Promise.all([promGenres])
        .then(([genres])=>{
            return res.render(path.resolve(__dirname, '..', 'views', 'moviesAdd'), { genres });
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
    },

    edit: function(req,res) {
        let id = req.params.id;
        let promMovies = Movies.findByPk(id,{include: ['genre']});
        let promGenres = Genres.findAll();
        Promise
        .all([promMovies, promGenres])
        .then(([Movie, genres]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesEdit'), {Movie, genres})})
        .catch(error => res.send(error))
    }, 

    update: function (req,res) {
        let movieId = req.params.id;
        Movies.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    }, 

    delete:  function(req,res){
        let movieId = req.params.id;
        Movies.findByPk(movieId)
        .then( Movie => {
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesDelete'), {Movie})
        })
            .catch(error => res.send(error))
        }, 

    destroy: function(req,res){
        let movieId= req.params.id;
        Movies.destroy({where:{id: movieId}})
        .then(()=>{return res.redirect('/movies')})
        .catch( error => res.send(error))
    }
}


module.exports = moviesController;