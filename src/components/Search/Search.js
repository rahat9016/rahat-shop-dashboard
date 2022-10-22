import React from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
const Search = (props) => {
  return (
    <div className="search" style={{ ...props.style }}>
      <input
        type="text"
        placeholder={`Search ${props.placeholder}`}
        onChange={(e) => props.setSearch(e.target.value)}
      />
      <FiSearch onClick={props.handleSearchProduct} />
    </div>
  );
};

export default Search;
