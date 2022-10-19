import React, { Component } from "react";

const Like = (props) => {
  const { liked, onLike } = props;
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return (
    <i
      onClick={onLike}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};
export default Like;
