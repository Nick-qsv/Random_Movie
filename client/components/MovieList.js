import React from "react"

export default function AllMovies(props){
    // console.log('THIS IS ALL MOVIES PROPS---->', props)
    return(
        props.movies.length !== 0 ?
        <div className="movieList--container">
            {props.movies.map((movie)=>{
                return (
                    <div className="movieList--movie" key={movie.id}>
                        <button onClick={()=>props.delete(movie.id)}>Delete</button>
                        <p className="movie--title">{movie.title}  ({movie.rating})</p>
                        <button onClick={()=>props.addRating(movie.id)}className="movie--add_delete">+</button>
                        <button onClick={()=>props.subRating(movie.id)}className="movie--add_delete">-</button>
                    </div>
                )
            })}
        </div>
        : <h1 className="whynowork">There are No Movies!</h1>
    )
}