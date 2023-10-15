import React, { Component } from 'react';
import './SearchBar.css';
import CreateForm from './CreateForm';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
  } 

  handleSearch = () => {
    this.props.onSearch(this.state.searchText);
  };

  render() {
    return (
      <div className="container">
      <div className="search-bar">
      <div className="create-button"><CreateForm/></div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchText}
          onChange={(e) => this.setState({ searchText: e.target.value })}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
      </div>
    );
  }
}

export default SearchBar;
