import React, { Component } from "react";
import { useParams, useHistory } from "react-router-dom";

const MovieForm = () => {
  let { id } = useParams();
  let history = useHistory();

  return (
    <div>
      <h1>Movie Form {id} </h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
