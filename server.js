const express = require('express');
const app = express();
const path = require('path');
const { sync, Movie } = require('./db');


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname,'client','index.html')));

app.post('/movies/add-movie', async (req, res, next)=>{
    try{
        const newMovie = req.body
        console.log('this is req.body!!!--->',newMovie)
        const movie = await Movie.create(newMovie)
        res.send(movie)
    } catch(ex){
        next(ex)
    }
})

app.delete('/movies/delete-movie/:id', async (req, res, next)=>{
    try{
        const oneMovie = await Movie.findByPk(req.params.id)
        oneMovie.destroy();
        res.send(await Movie.findAll())
    }catch(ex){
        next(ex)
    }
})


const init = async()=>{
    try{
        await sync();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }catch(ex){
        console.log(ex)
    }
}

init();

module.exports = app