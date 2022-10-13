import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import Genres from "../components/Genres";
import Like from "./Like";

//prints a table of movie data retrieved via fakeMovieService and provides a delete option for each of the movies
class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    currentGenre: "All Genres",
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
  handleGenreChange = (currentGenre) => {
    this.setState({ currentGenre });
  };

  render() {
    //print a table that details the list of movies
    const totalMovieCount = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      currentGenre,
    } = this.state;

    //Check if there aren't movies in the database list
    if (totalMovieCount === 0)
      return <p className="mt-4">There are no movies in the database</p>;

    //Perform functions for genre filtering
    let movies = allMovies;
    if (currentGenre !== "All Genres") {
      movies = movies.filter((movie) => currentGenre === movie.genre.name);
    }
    const numOfGenreMovies = movies.length;

    //Perform functions for pagination
    movies = paginate(movies, currentPage, pageSize);

    return (
      <div className="container mt-4">
        <div className="row">
          <Genres
            genres={genres}
            currentGenre={currentGenre}
            onGenreChange={this.handleGenreChange}
          />
          <div className="col">
            <p>
              Showing {numOfGenreMovies} of {totalMovieCount} movies in the
              database
            </p>
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
              itemCount={numOfGenreMovies}
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
