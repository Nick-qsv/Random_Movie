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

//ACTION CREATOR
const postMovie = (movie)=>{
    return {
        type: POST_MOVIE,
        movie
    }
}

const deleteMovie = (movie)=>{
    return {
        type:DELETE_MOVIE,
        movie
    }
}

const loadMovies = (movies)=>{
    return{
        type:LOAD_MOVIES,
        movies
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
        (await axios.delete(''))
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
        default:
            return state
    }
}


//STORE
const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store;
