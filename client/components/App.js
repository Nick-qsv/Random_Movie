import React from "react";
import Component from "react";
import { connect } from "react-redux";
import { _postMovie } from "../../store/store";

import MovieList from "./MovieList";
const faker = require("faker");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // async componentDidMount(){
  //     await this.props.loadMovies();
  // }

  handleSubmit(evt) {
    evt.preventDefault();
    let movie = {
      title: faker.company.catchPhrase(),
      rating: 3,
    };
    this.props.addMovie(movie);
  }
  addRating(evt){
      evt.preventDefault();
      
  }

  render() {
    const { movies } = this.props;

    return (
      <div>
        <div className="header-button--container">
          {movies.length !== 0 ? (
            <h1>
              The Average Rating is{" "}
               {Math.round(
                movies.reduce((totalRating, movie) => {
                  totalRating += movie.rating;
                  return totalRating;
                }, 0) / movies.length
              )}
              !
            </h1>
          ) : (
            <h1></h1>
          )}
          <button className="button--movie" onClick={this.handleSubmit}>
            Generate Random Movie
          </button>
        </div>
        <MovieList movies={movies} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addMovie: (movie) => dispatch(_postMovie(movie)),
    add: (id) => dispatch(add(id)),
  };
};

export default connect(mapState, mapDispatch)(App);
