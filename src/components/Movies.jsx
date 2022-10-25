import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

//prints a table of movie data retrieved via fakeMovieService and provides a delete option for each of the movies
class Movies extends Component {
  state = {
    movies: [],
    genres: getGenres(),
    currentGenre: "All Genres",
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    movie.liked = !movie.liked;
    this.setState({ movies: this.state.movies });
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreChange = (currentGenre) => {
    this.setState({ currentGenre, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
    } = this.state;

    //Perform functions for genre filtering, sorting, and pagination
    const filtered =
      currentGenre === "All Genres"
        ? allMovies
        : allMovies.filter((movie) => currentGenre === movie.genre.name);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { movies, itemCount: filtered.length };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      currentGenre,
      sortColumn,
    } = this.state;

    //Check if there aren't movies in the database list
    if (allMovies.length === 0)
      return <p className="mt-4">There are no movies in the database</p>;

    const { movies, itemCount } = this.getPagedData();

    //print list of movie details and sorting/filtering options
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              currentItem={currentGenre}
              onItemChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <p>Showing {allMovies.length} movies the database</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemCount={itemCount}
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
