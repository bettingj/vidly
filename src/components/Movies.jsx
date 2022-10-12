import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import Like from "./Like";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";

//prints a table of movie data retrieved via fakeMovieService and provides a delete option for each of the movies
class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

  handleLike = (movie) => {
    movie.liked = !movie.liked;
    this.setState({ movies: this.state.movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    //print a table that details the list of movies
    const count = this.state.movies.length;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0)
      return <p className="mt-4">There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="container mt-4">
        <div className="row">
          <ul className="list-group col">
            <li className="list-group-item">All Genres</li>
            <li className="list-group-item">Comedy</li>
            <li className="list-group-item">Action</li>
            <li className="list-group-item">Romance</li>
          </ul>
          <div className="col">
            <p>Showing {this.state.movies.length} movies in the database</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Like</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        onLike={() => this.handleLike(movie)}
                        liked={movie.liked}
                      />
                    </td>
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
            </table>
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
