import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";

//prints a table of movie data retrieved via fakeMovieService and provides a delete option for each of the movies
class Movie extends Component {
  state = {
    //only need the list of movies
    movies: getMovies(),
  };

  render() {
    //print a table that details the list of movies
    if (this.state.movies.length) {
      return (
        <React.Fragment>
          {this.printMovieStatement()}
          <table className="table">
            {this.printTableHead()}
            {this.printTableBody()}
          </table>
        </React.Fragment>
      );
    }
    return <p className="mt-3">There are no movies in the database</p>;
  }

  printMovieStatement() {
    return (
      <p className="mt-3">
        Showing {this.state.movies.length} movies in the database
      </p>
    );
  }
  printTableHead() {
    //the table head has the categories for movie info and an empty column for delete buttons
    return (
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col"></th>
        </tr>
      </thead>
    );
  }
  printTableBody() {
    //each movie is mapped to a row in the table and its properties are mapped to individual cells on its row
    return (
      <tbody>
        {this.state.movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              {/*the button deletes the movie from the list. It then tells react to update the page*/}
              <button
                onClick={() => {
                  deleteMovie(movie._id);
                  this.setState({ movies: this.state.movies });
                }}
                className="btn btn-danger btn-sm"
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default Movie;
