import { createStore } from 'redux'
import logger from 'redux-logger'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import { DELETE } from 'sequelize/dist/lib/query-types'


//ACTION TYPES
const POST_MOVIE = "POST_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"
const LOAD_MOVIES = "LOAD_MOVIES"
const ADD = "ADD"
const SUBTRACT = "SUBTRACT"
//ACTION CREATOR
const postMovie = (movie)=>{
    return {
        type: POST_MOVIE,
        movie
    }
}

const deleteMovie = (id)=>{
    return {
        type:DELETE_MOVIE,
        id
    }
}

const loadMovies = (movies)=>{
    return{
        type:LOAD_MOVIES,
        movies
    }
}

export const add = (id)=>{
    return{
        type: ADD,
        id
    }
}

export const subtract = (id)=>{
    return{
        type: SUBTRACT,
        id
    }
}
//THUNKS
export const _postMovie = (movie) =>{
    return async (dispatch)=>{
        const addMovie = (await axios.post('/movies/add-movie', movie)).data
        dispatch(postMovie(addMovie))
    }
}

export const _deleteMovie = (id)=>{
    return async (dispatch)=>{
        (await axios.delete(`/movies/delete-movie/${id}`))
        dispatch(deleteMovie(id))
    }
}

export const _loadMovies = ()=>{
    return async (dispatch)=>{
        const movies = (await axios.get('/movies')).data
        dispatch(loadMovies(movies))
    }
}

const initialState = {
    movies: []
}

//REDUCER
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case POST_MOVIE:
            return{
                movies: [...state.movies, action.movie]
            }
        case DELETE_MOVIE:
                const filter = state.movies.filter((movie)=>movie.id !== action.id)
                return{
                movies:filter
            }
        case LOAD_MOVIES:
            return{
                movies: action.movies
            }
        case ADD:
            const addMovies = [...state.movies]
            addMovies.forEach((movie)=>{if(movie.id === action.id && movie.rating !== 5){
                movie.rating +=1;
            }});
            return{
                movies: addMovies
            }
        case SUBTRACT:
            const subMovies = [...state.movies]
            subMovies.forEach((movie)=>{if(movie.id === action.id && movie.rating !== 1){
                movie.rating -=1;
            }})
            subMovies.sort((a,b)=>{a.rating - b.rating})
            return{
                movies: subMovies
            }
        default:
            return state
    }
}


//STORE
const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store;
