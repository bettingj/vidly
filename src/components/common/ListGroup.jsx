import React, { Component } from "react";

const ListGroup = ({
  items,
  currentItem,
  textProperty,
  valueProperty,
  onItemChange,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemChange(item[textProperty])}
          style={{ cursor: "pointer" }}
          className={
            currentItem === item[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
