import React, { Component } from "react";

const Genres = (props) => {
  const { genres, currentGenre, onGenreChange } = props;

  return (
    <ul className="list-group col">
      <li
        onClick={() => onGenreChange("All Genres")}
        style={{ cursor: "pointer" }}
        className={
          currentGenre === "All Genres"
            ? "list-group-item active"
            : "list-group-item"
        }
      >
        All Genres
      </li>
      {genres.map((genre) => (
        <li
          key={genre._id}
          onClick={() => onGenreChange(genre.name)}
          style={{ cursor: "pointer" }}
          className={
            currentGenre === genre.name
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          <a>{genre.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default Genres;
